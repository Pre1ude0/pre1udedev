<script lang="ts">
    import Discord from "./Discord.svelte";
    import Webring from "./Webring.svelte";
    import { fly } from "svelte/transition";
    import { page } from "$app/state";
</script>

{#if page.url.pathname === "/"}
    <div
        class="flex flex-col gap-6 w-[400px]"
        out:fly={{ duration: 50, y: 50 }}
    >
        <Webring />
        <Discord />
    </div>
{/if}
