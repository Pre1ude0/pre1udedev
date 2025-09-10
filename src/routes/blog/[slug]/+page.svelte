<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import "$lib/styles/markdown.css";
    import Showdown from "showdown";
    import Divider from "$lib/components/Divider.svelte";
    let { data }: { data: PageData } = $props();
    const converter = new Showdown.Converter({
        openLinksInNewWindow: true,
    });
    const postContentHTML = converter.makeHtml(data.post.content);
</script>

<button
    class="mb-4 text-lg cursor-pointer text-zinc-400 rounded p-1 hover:bg-zinc-800 transition font-(family-name:--font-geist-mono) font-bold"
    onclick={() => goto("/blog")}
    title="Back to blog list"
>
    cd ..
</button>

<h1 class="text-4xl font-bold mb-2 text-zinc-100">
    {data.post.fields.title}
</h1>

<article class="markdown-body p-3 w-full box-border">
    {@html postContentHTML}
</article>

<div class="flex flex-row gap-2 items-center mt-6">
    <Divider />
    <p class="text-zinc-300 font-(family-name:--font-geist-mono)">
        Published on {data.post.fields.date}
    </p>
</div>
