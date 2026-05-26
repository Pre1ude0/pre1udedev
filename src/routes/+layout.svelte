<script lang="ts">
    import favicon from "$lib/assets/favicon.ico";
    import favicon_png from "$lib/assets/favicon.png";
    import "../app.css";
    import Skyline from "$lib/components/Skyline.svelte";
    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="icon" type="image/png" href={favicon_png} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:image" content="https://pre1ude.dev/ogimg.png" />
</svelte:head>

<div class="flex flex-col w-screen min-h-screen items-center">
    {@render children()}
</div>

<Skyline />

<div class="crt fixed inset-0 pointer-events-none z-10 opacity-80"></div>

<style>
    @keyframes scanline {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 0 -4px;
        }
    }

    @keyframes -global-riseAndFall {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(50%);
        }
        100% {
            transform: translateY(0);
        }
    }

    .crt {
        /*background: contain repeat
            linear-gradient(to top, #000000, #000000, #333333, #333333);
        background-size: 100% 2px;*/

        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            transparent 50%,
            transparent 100%
        );
        background-size: 100% 4px;
        animation: scanline 0.5s linear infinite;
    }
</style>
