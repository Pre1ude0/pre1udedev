<script lang="ts">
    import Discord from "./Discord.svelte";
    import Webring from "./Webring.svelte";
    import { fly } from "svelte/transition";
    import { page } from "$app/state";
</script>

{#if page.url.pathname === "/"}
    <div
        class="flex flex-col gap-6 w-[400px] h-full"
        out:fly={{ duration: 50, y: 50 }}
    >
        <Webring />
        <Discord />
        <div class="rounded-2xl w-full">
            <h2 class="text-4xl ml-1 mb-4 text-white">Join my Discord!</h2>
            <iframe
                src="https://canary.discord.com/widget?id=974354202430169139&theme=dark"
                width="350"
                height="500"
                frameborder="0"
                title="Discord"
                class="w-full rounded-2xl"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
        </div>
    </div>
{/if}
