<script lang="ts">
    import Window from "$lib/components/Window.svelte";
    import Gallery from "./Gallery.svelte";
    import Highlight from "./Highlight.svelte";
</script>

<svelte:head>
    <meta property="og:title" content="Art | Laura☾" />
    <meta property="og:url" content="https://pre1ude.dev/art" />
    <meta property="og:image" content="https://pre1ude.dev/og-image.png" />
    <meta
        property="og:description"
        content="An art gallery of art made by and for me"
    />
</svelte:head>

<div
    class="flex flex-col gap-5 max-w-[1600px] w-full py-5 md:py-0 px-5 box-border"
>
    <div class="h-fit md:h-screen p-0 md:p-5">
        <Window
            styles="w-full h-full"
            path="art"
            command="ls && icat *"
            innerStyles="overflow-hidden"
        >
            <Gallery />
        </Window>
    </div>
    <Highlight />
</div>
