<script lang="ts">
    import Discord from "./Discord.svelte";
    import Contact from "./Connections.svelte";
    import Webring from "./Webring.svelte";
    import Divider from "$lib/components/Divider.svelte";
    import Toolkit from "./Toolkit.svelte";
    import Friends from "./Friends.svelte";
    import Referrer from "./Referrer.svelte";
    import Window from "$lib/components/Window.svelte";

    import { enhancedImages } from "$lib/assets/enhancedImage";

    const birthDate = new Date("2008-1-26");

    let timeFromBirth = $state("");

    setInterval(() => {
        timeFromBirth = (
            (Date.now() - birthDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365.25)
        ).toFixed(8);
    }, 2000);

    let flags = ["trans", "demigirl", "aroace", "lesbian"];
    let theGay: boolean = $state(Math.random() < 1 / 50);
    let kindOfGay: string = $state(
        flags[Math.floor(Math.random() * flags.length)],
    );

    import { onMount } from "svelte";
</script>

<svelte:head>
    <meta property="og:title" content="Laura☾" />
    <meta property="og:url" content="https://pre1ude.dev" />
    <meta property="og:image" content="https://pre1ude.dev/pre1ude.jpeg" />
    <meta property="og:description" content="A memory leak in eyeliner" />
</svelte:head>

<!-- <div
    class="max-w-[800px] p-2 text-black min-h-[calc(100vh-200px)] flex flex-col justify-center items-center"
> -->
<!-- <div
    class="w-[300px] h-[200px] absolute border border-zinc-600 bg-stone-100"
    style:top={`${y}px`}
    style:left={`${x}px`}
>
    <div
        class="title-bar flex flex-row justify-end p-2 bg-stone-300"
        bind:this={titleBarElement}
    >
        <i class="nf nf-oct-dash"></i>
    </div>
    <div class="p-10">

    </div>
</div>
 -->
<Window>
    <h1 class="text-5xl text-white">
        Hi! I'm
        <span
            class="bg-clip-text text-transparent [-webkit-text-fill-color:transparent] bg-no-repeat inline-block font-bold"
            style:background-image={theGay
                ? `var(--${kindOfGay})`
                : "linear-gradient(to right, #f9a8d4, #db2777)"}
        >
            Laura
        </span>
        - a memory leak in eyeliner.
    </h1>
    <p class="mt-4 text-lg text-zinc-100">
        I'm a(n) <span class="font-mono">{timeFromBirth}</span>
        year old full-stack developer, artist and student based in Belgium. Thanks
        for visiting!
        <!-- You may know me from
        <span class="bg-(--bg) pl-2 pr-2 pb-1 pt-1 rounded-md">
            <a
                class="ringamajig"
                href="https://ring.pre1ude.dev"
                target="_blank"
                rel="noopener noreferrer">Ring-amajig</a
            >
        </span>
        -->
    </p>
    <img
        src={enhancedImages[`/src/lib/assets/doodle.png`]}
        alt="A doodle of me"
        class="absolute w-1/5 bottom-0 right-0"
    />
    <!-- <Contact />
    <Toolkit />
    <Friends />
    <Referrer />
    -->
</Window>
