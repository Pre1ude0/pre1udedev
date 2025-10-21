<script lang="ts">
    import Discord from "./Discord.svelte";
    import Contact from "./Connections.svelte";
    import Webring from "./Webring.svelte";
    import Divider from "$lib/components/Divider.svelte";
    import Toolkit from "./Toolkit.svelte";
    import Friends from "./Friends.svelte";
    import Referrer from "./Referrer.svelte";

    let flags = ["trans", "demigirl", "aroace", "lesbian"];
    let theGay: boolean = $state(Math.random() < 1 / 50);
    let kindOfGay: string = $state(
        flags[Math.floor(Math.random() * flags.length)],
    );
</script>

<svelte:head>
    <meta property="og:title" content="Laura☾" />
    <meta property="og:url" content="https://pre1ude.dev" />
    <meta property="og:image" content="https://pre1ude.dev/pre1ude.jpeg" />
    <meta property="og:description" content="A memory leak in eyeliner" />
</svelte:head>

<div class="max-w-[700px] p-2 text-white">
    <h1 class="text-5xl">
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
    <p class="mt-4 text-lg text-zinc-300">
        Welcome to my page! I'm a full-stack freelance developer and student
        based in 🇧🇪 Belgium. You may know me from my other projects such as
        <span class="bg-(--bg) pl-2 pr-2 pb-1 pt-1 rounded-md">
            <a
                class="ringamajig"
                href="https://ring.pre1ude.dev"
                target="_blank"
                rel="noopener noreferrer">Ring-amajig</a
            >
        </span>
        and
        <span class="bg-white pl-1 pr-1 pb-0.5 pt-0.5">
            <a
                class="text-black underline"
                href="https://sampling.lv"
                target="_blank"
                rel="noopener noreferrer"
            >
                sampling.lv
            </a>
        </span>
    </p>
    <p class="mt-4 text-lg text-zinc-300">
        My hobbies include creating and enjoying art and music, gaming, chess
        and, of course, software development.
    </p>
    <Divider />
    <Contact />
    <Divider />
    <Toolkit />
    <Divider />
    <Friends />
    <Divider />
    <Referrer />
</div>

<style>
    :root {
        --link: #bb86fc;
        --overshoot: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        --bg: #121212;
    }

    .ringamajig {
        border-radius: 0.25em;
        text-indent: 0;
        position: relative;
        display: inline-block;
        text-decoration: none;
        color: var(--link);
        transition:
            transform 0.15s var(--overshoot),
            color 0.3s ease-out;
    }
    .ringamajig:hover {
        transform: translateY(-2px);
        &::after {
            opacity: 1;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .ringamajig:after {
        opacity: 0;
        content: "";
        position: absolute;
        bottom: 2px;
        right: 50%;
        left: 50%;
        height: 2px;
        background-color: var(--link);
        transition:
            opacity 0.15s ease-out,
            left 0.15s var(--overshoot),
            right 0.15s var(--overshoot),
            bottom 0.15s var(--overshoot);
    }
</style>
