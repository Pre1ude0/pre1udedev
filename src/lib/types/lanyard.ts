import { type Readable } from "svelte/store";

export interface LanyardTimestamps {
    start?: number;
    end?: number;
}

export interface LanyardAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export interface LanyardEmoji {
    id: string | null;
    name: string | null;
    animated: boolean;
}

export interface LanyardActivity {
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    created_at: number;
    application_id?: string;
    timestamps?: LanyardTimestamps;
    assets?: LanyardAssets;
    buttons?: string[];
    session_id?: string;
    flags?: number;
    emoji: LanyardEmoji | null;
}

export interface LanyardSpotify {
    track_id: string;
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
    timestamps: { start: number; end: number };
}

export interface AvatarDecoration {
    asset: string;
    sku_id: number;
}

export interface UserClan {
    tag: string;
    identity_guild_id: string;
    badge: string;
    identity_enabled: boolean;
}

export interface SpotifyData {
    track_id: string | null;
    timestamps: {
        start: number;
        end: number;
    } | null;
    song: string;
    artist: string;
    album_art_url: string | null;
    album: string;
}

export interface LanyardUser {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    public_flags: number;
    global_name?: string | null;
    display_name?: string | null;
    avatar_decoration_data?: AvatarDecoration | null;
    clan?: UserClan | null;
}

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardPresence {
    spotify: LanyardSpotify | null;
    listening_to_spotify: boolean;
    kv: Record<string, string>;
    discord_user: LanyardUser;
    activities: LanyardActivity[];
    discord_status: DiscordStatus;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_web: boolean;
}

export interface LanyardEventEnvelope {
    op: number;
    t?: "INIT_STATE" | "PRESENCE_UPDATE";
    d?: any;
}

export interface InternalState {
    ws?: WebSocket;
    heartbeatTimer?: number;
    lastHeartbeatAck?: number;
    reconnectAttempts: number;
    closedExplicitly: boolean;
}

export interface LanyardController {
    presence: Readable<LanyardPresence | null>;
    disconnect: () => void;
    isConnected: Readable<boolean>;
    raw: Readable<any>;
}
