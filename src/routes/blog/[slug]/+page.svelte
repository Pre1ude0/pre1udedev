<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import "$lib/styles/markdown.css";
    import Showdown from "showdown";
    import Divider from "$lib/components/Divider.svelte";
    let { data }: { data: PageData } = $props();
    const converter = new Showdown.Converter({
        openLinksInNewWindow: true,
    });
    const postContentHTML = converter.makeHtml(data.post.content);
    let command = $state("");
</script>

<svelte:head>
    <title>{data.post.fields.title} - Pre1ude0</title>
    <meta name="description" content={data.post.fields.description} />
    <meta
        property="og:title"
        content={data.post.fields.title + " - Pre1ude0"}
    />
    <meta property="og:description" content={data.post.fields.description} />
    <meta property="og:type" content="article" />
    <meta
        property="og:url"
        content={"https://pre1ude.dev/blog/" + data.post.fields.slug}
    />
    <meta property="og:image" content="https://pre1ude.dev/og-image.png" />
</svelte:head>

<div class="flex flex-row gap-2 items-center justify-between m-2">
    <h1 class="text-4xl font-bold text-zinc-300">
        {data.post.fields.title}
    </h1>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class=" flex flex-row gap-2 items-center justify-end text-lg text-zinc-400 rounded font-(family-name:--font-geist-mono) font-bold"
    >
        {#if command}
            <span
                class="text-zinc-500 font-normal pointer-events-none"
                transition:fly={{ duration: 150, x: -20 }}>{command}</span
            >
        {/if}

        {#if data.prev}
            <button
                class="hover:bg-zinc-800 transition peer p-1 cursor-pointer rounded-md"
                onclick={() => goto(`${data.prev.fields.slug}`)}
                title="Previous post"
                onmouseenter={() => (command = "glow")}
                onmouseleave={() => (command = "")}
            >
                {data.prev.filename}
            </button>
        {/if}
        <button
            class="hover:bg-zinc-800 transition peer p-1 cursor-pointer rounded-md"
            onclick={() => goto("/blog")}
            title="Back to blog list"
            onmouseenter={() => (command = "cd")}
            onmouseleave={() => (command = "")}
        >
            ..
        </button>
        {#if data.next}
            <button
                class="hover:bg-zinc-800 transition peer p-1 cursor-pointer rounded-md"
                onclick={() => goto(`${data.next.fields.slug}`)}
                title="Next post"
                onmouseenter={() => (command = `glow`)}
                onmouseleave={() => (command = "")}
            >
                {data.next.filename}
            </button>
        {/if}
    </div>
</div>

<article class="markdown-body p-3 w-full box-border">
    {@html postContentHTML}
</article>

<div class="flex flex-row gap-2 items-center mt-6">
    <Divider />
    <p class="text-zinc-300 font-(family-name:--font-geist-mono)">
        Published on {data.post.fields.date}
    </p>
</div>
