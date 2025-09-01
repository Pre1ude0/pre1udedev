<script lang="ts">
    import { onMount } from "svelte";
    import { addCopyButtons } from "$lib/utils/copyButton";

    let codeSnippet: string = $state("");
    onMount(() => {
        fetch("/snippet.html")
            .then((res) => res.text())
            .then((text) => {
                codeSnippet = text;

                // @ts-ignore
                window.PR.prettyPrint();
                addCopyButtons(document.body);
            });
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/prettify.css" />
    <script
        src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
    ></script>
</svelte:head>

<div class="w-full h-fit flex flex-col items-start mt-4">
    <h3 class="text-2xl">My button</h3>
    <div class="outline outline-zinc-800 mt-4">
        <a href="https://pre1ude.dev" target="_blank">
            <img src="/blankie.png" alt="pre1ude.dev" width="88" height="31" />
        </a>
    </div>
    <pre class="prettyprint lang-html">{codeSnippet}</pre>
</div>
