<script lang="ts">
    import { createLanyardStore } from "$lib/utils/lanyard";
    import { onDestroy, onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { browser } from "$app/environment";
    import { PUBLIC_DISCORD_USER_ID } from "$env/static/public";
    import { getAvatarUrl, extractImageUrl } from "$lib/utils/helpers";
    import type { LanyardPresence } from "$lib/types/lanyard";

    let banner = $state<string | null>(null);

    onMount(async () => {
        try {
            const res = await fetch("/api/discord-banner", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Failed to fetch banner");
            const data = await res.json();
            banner = data.bannerUrl || null;
        } catch (e) {
            console.error("Failed to load banner", e);
            banner = null;
        }
    });

    const controller = browser
        ? createLanyardStore(PUBLIC_DISCORD_USER_ID)
        : null;

    let presence: LanyardPresence | null = $state(null);
    let connected: boolean = $state(false);

    const unsubscribePresence = controller?.presence.subscribe(
        (v) => (presence = v),
    );
    const unsubscribeConnected = controller?.isConnected.subscribe(
        (v) => (connected = v),
    );

    onDestroy(() => {
        unsubscribePresence && unsubscribePresence();
        unsubscribeConnected && unsubscribeConnected();
        controller?.disconnect();
    });

    let now = $state<number>(Date.now());

    function formatDuration(ms: number) {
        if (ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, "0")}:${s
                .toString()
                .padStart(2, "0")}`;
        }
        if (m > 0) {
            return `${m}:${s.toString().padStart(2, "0")}`;
        }
        return `0:${s.toString().padStart(2, "0")}`;
    }

    onMount(() => {
        const interval = setInterval(() => {
            now = Date.now();
        }, 1000);
        return () => clearInterval(interval);
    });

    $inspect({
        presence,
        connected,
        banner,
    });
</script>

<!-- Messy ass code T-T -->
<!-- Me from the future: Yeah you lowk right fuck you -->

<div class="w-full min-h-70">
    {#if browser && presence}
        <div
            in:slide={{ duration: 200 }}
            class="w-full relative flex items-center gap-2 flex-col justify-center p-2"
        >
            {#if banner}
                <img
                    src={banner}
                    class="absolute w-full top-0 left-0 -z-10"
                    alt="discord banner"
                />
            {/if}
            <div
                class="flex flex-row items-start justify-start gap-4 p-3 pt-[70px] rounded-sm w-full h-full"
            >
                <div
                    class="{presence.activities?.some(
                        (activity) => activity.type === 4,
                    )
                        ? 'flex-col items-start'
                        : 'flex-row items-center'} flex justify-start gap-3"
                >
                    <div
                        class="h-fit aspect-square flex } items-center justify-center relative"
                    >
                        <img
                            class="rounded-full h-[138px] aspect-square"
                            src={getAvatarUrl(
                                presence.discord_user.id || "",
                                presence.discord_user.avatar || "",
                            )}
                            alt={presence.discord_user.global_name + " avatar"}
                        />
                        {#if presence.discord_user.avatar_decoration_data}
                            <img
                                class="absolute -inset-2 h-[158px] max-w-max aspect-square"
                                src={"https://cdn.discordapp.com/avatar-decoration-presets/" +
                                    presence.discord_user.avatar_decoration_data
                                        .asset +
                                    ".png?size=128"}
                                alt="avatar decoration"
                            />
                        {/if}
                        {#if presence.discord_status}
                            {#if presence.discord_status === "online"}
                                <div
                                    class="absolute bottom-2 right-2 w-5 h-5 bg-green-600 border-2 border-zinc-900 rounded-full"
                                    title="Online"
                                ></div>
                            {:else if presence.discord_status === "idle"}
                                <div
                                    class="absolute bottom-2 right-2 w-5 h-5 bg-yellow-500 border-2 border-zinc-900 rounded-full overflow-hidden"
                                    title="Idle"
                                >
                                    <div
                                        class="w-3 h-3 bg-zinc-900 rounded-full absolute -top-0.4 -left-0.4"
                                    ></div>
                                </div>
                            {:else if presence.discord_status === "dnd"}
                                <div
                                    class="absolute bottom-2 right-2 w-5 h-5 bg-red-500 border-2 border-zinc-900 rounded-full flex items-center justify-center"
                                    title="Do Not Disturb"
                                >
                                    <div
                                        class="w-3 h-[4px] bg-zinc-900 rounded-sm"
                                    ></div>
                                </div>
                            {:else}
                                <div
                                    class="absolute bottom-2 right-2 w-5 h-5 bg-gray-500 border-2 border-zinc-900 rounded-full"
                                    title="Offline"
                                ></div>
                            {/if}
                        {/if}
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="flex flex-row items-center">
                            <span
                                class="text-3xl text-white font-bold text-shadow-md text-shadow-black"
                                >{presence.discord_user.global_name}</span
                            >
                            {#if presence.discord_user.primary_guild.identity_enabled}
                                <div
                                    class="ml-5 text-sm text-white bg-gray-400 flex items-center gap-0.5 outline-1 rounded-sm pl-1 pr-1"
                                >
                                    <img
                                        src={"https://cdn.discordapp.com/clan-badges/" +
                                            presence.discord_user.primary_guild
                                                .identity_guild_id +
                                            "/" +
                                            presence.discord_user.primary_guild
                                                .badge +
                                            ".png?size=16"}
                                        alt="Clan icon"
                                    />
                                    {presence.discord_user.primary_guild.tag}
                                </div>
                            {/if}
                        </div>
                        <p
                            class="text-gray-200 font-mono text-xl text-shadow-md text-shadow-black"
                        >
                            @{presence.discord_user.username}
                        </p>
                    </div>
                </div>

                {#if presence.activities}
                    {#each presence.activities as activity}
                        {#if activity.type === 4}
                            <div
                                class="flex flex-1 flex-col bg-zinc-800 mt-20 rounded-xl p-4 w-full border border-zinc-500"
                            >
                                <span class="truncate text-wrap flex-1">
                                    {#if activity.emoji}
                                        <img
                                            src={"https://cdn.discordapp.com/emojis/" +
                                                activity.emoji.id +
                                                "." +
                                                (activity.emoji.animated
                                                    ? "gif"
                                                    : "png") +
                                                "?size=32"}
                                            alt={(activity.emoji.name ||
                                                "emoji") + " emoji"}
                                            class="w-6 aspect-square inline-block"
                                        />
                                    {/if}
                                    {activity.state}
                                </span>
                            </div>
                        {/if}
                    {/each}
                {/if}
            </div>
            {#if presence.activities}
                {#each presence.activities as activity}
                    {#if activity.type === 0 || activity.type === 2}
                        <div
                            class="w-full backdrop-blur-xs p-3 from-bg-gray-100 to-zinc-800 bg-linear-to-b rounded-md pointer-events-none transition-opacity duration-150 flex flex-col items-start text-white"
                        >
                            {#if activity.type === 0}
                                <span class="text-sm text-zinc-400 mb-0.5"
                                    >Playing</span
                                >
                            {:else if activity.type === 2}
                                <span class="text-sm text-zinc-400 mb-0.5"
                                    >Listening to {activity.name}
                                    {#if activity.name == "Spotify"}
                                        <i class="nf nf-fa-spotify"></i>
                                    {/if}
                                </span>
                            {/if}
                            <div class="flex items-center gap-4 w-full">
                                {#if activity.assets?.large_image}
                                    <div class="h-full aspect-square relative">
                                        <img
                                            src={extractImageUrl(
                                                activity.assets?.large_image ||
                                                    "",
                                                activity.application_id,
                                            )}
                                            alt={activity.name + " icon"}
                                            class="w-20 aspect-square rounded-sm"
                                        />
                                        {#if activity.assets?.small_image}
                                            <img
                                                src={extractImageUrl(
                                                    activity.assets
                                                        ?.small_image || "",
                                                    activity.application_id,
                                                )}
                                                alt={activity.name + " icon"}
                                                class="absolute -bottom-2 -right-2 w-7 aspect-square rounded-full border-2 border-zinc-900 bg-zinc-900/50"
                                            />
                                        {/if}
                                    </div>
                                {/if}

                                <div
                                    class="flex flex-col justify-start items-start w-full"
                                >
                                    {#if activity.type !== 2}
                                        <span class="font-bold text-zinc-100"
                                            >{activity.name}</span
                                        >
                                    {/if}
                                    <span
                                        class="{activity.type !== 2
                                            ? 'text-zinc-300 text-sm'
                                            : 'text-zinc-100 font-bold'} trunicate line-clamp-1"
                                        >{activity.details}</span
                                    >
                                    {#if activity.state}
                                        <span
                                            class="text-sm text-gray-300 trunicate line-clamp-1"
                                            >{activity.state.replaceAll(
                                                ";",
                                                ", ",
                                            )}</span
                                        >
                                    {/if}

                                    {#if activity.timestamps && activity.timestamps.start && !activity.timestamps.end}
                                        <div
                                            class="flex justify-between w-full text-[10px] text-zinc-400 mt-1 font-mono tabular-nums"
                                        >
                                            <span
                                                >{formatDuration(
                                                    now -
                                                        activity.timestamps
                                                            .start,
                                                )}</span
                                            >
                                        </div>
                                    {/if}
                                    {#if activity.timestamps && activity.timestamps.start && activity.timestamps.end}
                                        <div
                                            class="mt-2 w-full h-1 bg-zinc-700/50 rounded overflow-hidden"
                                            aria-hidden="true"
                                        >
                                            <div
                                                class="h-full bg-zinc-100"
                                                style={`width: ${
                                                    activity.timestamps.end
                                                        ? Math.min(
                                                              100,
                                                              ((now -
                                                                  activity
                                                                      .timestamps
                                                                      .start) /
                                                                  (activity
                                                                      .timestamps
                                                                      .end -
                                                                      activity
                                                                          .timestamps
                                                                          .start)) *
                                                                  100,
                                                          )
                                                        : 100
                                                }%`}
                                            ></div>
                                        </div>
                                        <div
                                            class="flex justify-between w-full text-[10px] text-zinc-400 mt-1 font-mono tabular-nums"
                                        >
                                            <span
                                                >{formatDuration(
                                                    now -
                                                        activity.timestamps
                                                            .start,
                                                )}</span
                                            >
                                            {#if activity.timestamps.end}
                                                <span
                                                    >{formatDuration(
                                                        activity.timestamps
                                                            .end -
                                                            activity.timestamps
                                                                .start,
                                                    )}</span
                                                >
                                            {:else}
                                                <span
                                                    >{formatDuration(
                                                        now -
                                                            activity.timestamps
                                                                .start,
                                                    )}</span
                                                >
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    {/if}
</div>
