import { writable, type Writable, readable } from "svelte/store";
import { browser } from "$app/environment";
import { PUBLIC_DISCORD_USER_ID } from "$env/static/public";

import type {
    LanyardController,
    LanyardPresence,
    InternalState,
    LanyardEventEnvelope,
} from "$lib/interfaces/lanyard";

export function createLanyardStore(discordId: string): LanyardController {
    if (!discordId) {
        throw new Error("createLanyardStore requires a discordId");
    }
    if (!browser) {
        // SSR-safe no-op
        const empty = readable<LanyardPresence | null>(null);
        const boolFalse = readable(false);
        return {
            presence: empty,
            disconnect: () => {},
            isConnected: boolFalse,
            raw: readable(null),
        };
    }

    const presenceStore: Writable<LanyardPresence | null> = writable(null);
    const isConnected: Writable<boolean> = writable(false);
    const rawStore: Writable<any> = writable(null);

    const state: InternalState = {
        reconnectAttempts: 0,
        closedExplicitly: false,
    };

    function log(...args: any[]) {
        console.log("[lanyard]", ...args);
    }

    function cleanupSocket() {
        if (state.heartbeatTimer) {
            clearInterval(state.heartbeatTimer);
            state.heartbeatTimer = undefined;
        }
        if (state.ws) {
            state.ws.onopen = null;
            state.ws.onclose = null;
            state.ws.onmessage = null;
            state.ws.onerror = null;
            state.ws = undefined;
        }
    }

    function scheduleReconnect() {
        if (state.closedExplicitly) return;
        const attempt = state.reconnectAttempts++;
        const delay = Math.min(30000, Math.pow(2, attempt) * 1000); // exp backoff capped at 30s
        log(`Reconnecting in ${delay}ms (attempt ${attempt})`);
        setTimeout(connect, delay);
    }

    function send(json: any) {
        if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
        state.ws.send(JSON.stringify(json));
    }

    function startHeartbeat(intervalMs: number) {
        if (state.heartbeatTimer) clearInterval(state.heartbeatTimer);
        state.heartbeatTimer = window.setInterval(() => {
            send({ op: 3 });
            state.lastHeartbeatAck = performance.now();
        }, intervalMs);
    }

    function handleEvent(msg: LanyardEventEnvelope) {
        rawStore.set(msg);
        switch (msg.op) {
            case 1: {
                // Hello
                const heartbeatInterval = msg.d?.heartbeat_interval;
                if (heartbeatInterval) {
                    startHeartbeat(heartbeatInterval);
                    // Now subscribe
                    send({
                        op: 2,
                        d: {
                            subscribe_to_id: discordId,
                        },
                    });
                }
                break;
            }
            case 0: {
                // Actual event
                if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
                    presenceStore.set(msg.d as LanyardPresence);
                }
                break;
            }
            default:
                break;
        }
    }

    function connect() {
        cleanupSocket();
        isConnected.set(false);

        const ws = new WebSocket("wss://api.lanyard.rest/socket"); // v1 is default
        state.ws = ws;

        ws.onopen = () => {
            log("WebSocket open");
            state.reconnectAttempts = 0;
            isConnected.set(true);
        };
        ws.onmessage = (ev) => {
            try {
                const parsed: LanyardEventEnvelope = JSON.parse(ev.data);
                handleEvent(parsed);
            } catch (err) {
                log("Failed to parse message", err);
            }
        };
        ws.onclose = (ev) => {
            log("Socket closed", ev.code, ev.reason);
            isConnected.set(false);
            cleanupSocket();
            if (!state.closedExplicitly) {
                scheduleReconnect();
            }
        };
        ws.onerror = (err) => {
            log("Socket error", err);
        };
    }

    connect();

    function disconnect() {
        state.closedExplicitly = true;
        cleanupSocket();
        state.ws?.close();
        isConnected.set(false);
    }

    return {
        presence: { subscribe: presenceStore.subscribe },
        disconnect,
        isConnected: { subscribe: isConnected.subscribe },
        raw: { subscribe: rawStore.subscribe },
    };
}
