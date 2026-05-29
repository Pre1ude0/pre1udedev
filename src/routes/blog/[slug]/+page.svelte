<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import "$lib/styles/markdown.css";
    import Showdown from "showdown";
    import Divider from "$lib/components/Divider.svelte";
    import Window from "$lib/components/Window.svelte";
    let { data }: { data: PageData } = $props();
    const converter = new Showdown.Converter({
        openLinksInNewWindow: true,
    });
    const postContentHTML = converter.makeHtml(data.post.content);
    let command = $state("");
</script>

<svelte:head>
    <meta
        name="description"
        content={data.post.content.slice(0, 100) + "..."}
    />
    <meta
        property="og:title"
        content={data.post.fields.title + " - Pre1ude0"}
    />
    <title>{data.post.fields.slug}.md</title>
    <meta
        property="og:description"
        content={data.post.content.slice(0, 100) + "..."}
    />
    <meta property="og:type" content="article" />
    <meta
        property="og:url"
        content={"https://pre1ude.dev/blog/" + data.post.fields.slug}
    />
    <meta property="og:image" content={data.post.fields.thumbnail} />
</svelte:head>
<div class="flex flex-col items-center justify-center p-4 gap-6 max-w-[1200px]">
    <Window styles="w-full" command={`glow ${data.post.filename}`}>
        <div
            class="flex flex-col-reverse md:flex-row gap-2 items-center justify-between m-2"
        >
            <h1 class="text-4xl font-bold text-zinc-300 self-start">
                {data.post.fields.title}
            </h1>
        </div>
        <article class="markdown-body p-3 w-full box-border">
            {@html postContentHTML}
        </article>

        <div class="flex flex-row gap-2 items-end mt-6">
            <p class="text-zinc-300 font-(family-name:--font-geist-mono)">
                Published on {data.post.fields.date}
            </p>
        </div>
    </Window>
</div>
