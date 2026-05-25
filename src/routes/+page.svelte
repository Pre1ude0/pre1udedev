<script lang="ts">
    import Discord from "./Discord.svelte";
    import Links from "./Links.svelte";
    import Webring from "./Webring.svelte";
    import Friends from "./Friends.svelte";
    import Referrer from "./Referrer.svelte";
    import Window from "$lib/components/Window.svelte";
    import Folder from "$lib/icons/Folder.svelte";
    import { enhancedImages } from "$lib/assets/enhancedImage";

    const birthDate = new Date("2008-1-26");

    function age() {
        const now = new Date();
        const ageInMs = now.getTime() - birthDate.getTime();
        return ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    }

    let timeFromBirth = $state(age().toFixed(8));

    setInterval(() => {
        timeFromBirth = age().toFixed(8);
    }, 2000);

    let flags = ["trans", "demigirl", "aroace", "lesbian"];
    let theGay: boolean = $state(Math.random() < 1 / 50);
    let kindOfGay: string = $state(
        flags[Math.floor(Math.random() * flags.length)],
    );
</script>

<svelte:head>
    <meta property="og:title" content="Laura☾" />
    <meta property="og:url" content="https://pre1ude.dev" />

    <meta property="og:description" content="A memory leak in eyeliner" />
</svelte:head>

<div
    class="flex flex-row flex-wrap items-center justify-center gap-6 max-w-[1200px] p-10"
>
    <Window width={500} command="whoami" styles="mt-[80px]">
        <enhanced:img
            src={enhancedImages["peeking.png"]}
            alt="Cry0"
            class="absolute -top-[129px] -right-[7px] image-rendering-pixelated"
        >
        </enhanced:img>
        <h1 class="text-4xl text-white">
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
        <p class="my-4 text-lg text-zinc-100">
            I'm a{Math.floor(Number(timeFromBirth)) === 18 ? "n" : ""}
            <span class="font-mono">{timeFromBirth}</span>
            year old student, web dev and artist from Belgium.
        </p>
        <h1 class="text-2xl text-zinc-300 mt-6 mb-1">More by me</h1>
        <div class="flex flex-row items-start gap-1 flex-wrap">
            <a
                href="/art"
                class="border text-xl leading-0 border-gray-200 hover:bg-gray-200 hover:text-black inline-block p-1 font-mono"
                >art <Folder />
            </a>
            <a
                href="/dev"
                class="border text-xl leading-0 border-gray-200 hover:bg-gray-200 hover:text-black inline-block p-1 font-mono"
                >dev <Folder /></a
            >
            <a
                href="/blog"
                class="border text-xl leading-0 border-gray-200 hover:bg-gray-200 hover:text-black inline-block p-1 font-mono"
                >blogs <Folder /></a
            >
        </div>
        <h1 class="text-xl text-zinc-300 mt-6 mb-1">On the outer-web</h1>
        <Links />
    </Window>
    <Window width={500} command="dvm run stable">
        <Discord />
    </Window>
    <Window width={500} command="icat friends/*">
        <Friends />
    </Window>

    <Window width={350} command="curl ring.pre1ude.dev">
        <Webring />
    </Window>

    <!-- <span class="bg-(--bg) pl-2 pr-2 pb-1 pt-1 rounded-md">
    <a
        class="ringamajig"
        href="https://ring.pre1ude.dev"
        target="_blank"
        rel="noopener noreferrer">Ring-amajig</a
    >
    </span> -->
</div>

<Referrer />
