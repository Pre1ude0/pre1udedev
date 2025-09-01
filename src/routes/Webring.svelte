<script lang="ts">
    import { fly, blur } from "svelte/transition";
</script>

<div
    class="rounded-ms w-full h-fit flex items-center justify-center p-4 bg-zinc-900 rounded-2xl border-b border-zinc-800"
    in:fly={{ duration: 300, y: 100 }}
>
    <iframe
        src="https://ring.pre1ude.dev/ring?url=https://pre1ude.dev&bgcolor=18181b"
        width="230px"
        height="90px"
        class="outline-0"
        frameborder="0"
        scrolling="no"
        title="Ring-amajig widget"
    ></iframe>
</div>
