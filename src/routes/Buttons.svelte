<script lang="ts">
    import { fly } from "svelte/transition";
    let { buttons } = $props();
</script>

<div class="w-full flex flex-wrap gap-2 mt-4">
    {#each buttons as button, i}
        <a
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            title={button.title}
            class="hover:-translate-y-1/10 transition-transform"
            style="animation-delay: {i * 100}ms"
        >
            <img
                src={button.src}
                alt={button.alt}
                width="88"
                height="31"
                class="border border-zinc-800"
            />
        </a>
    {/each}
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    a {
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out forwards;
    }
</style>
