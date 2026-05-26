<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    type Props = {
        command?: string;
        path?: string;
        width?: number | string;
        height?: number | string;
        styles?: string;
        innerStyles?: string;
    };

    let {
        children,
        command = "neofetch",
        path = "~",
        width = 420,
        height = "auto",
        styles = "",
        innerStyles = "",
    }: Props & { children: any } = $props();

    let el: HTMLDivElement | null = $state(null);

    function px(v: number | string): string {
        return typeof v === "number" ? `${v}px` : v;
    }
</script>

<div
    bind:this={el}
    class="{styles} relative flex flex-col left-0 top-0 box-border overflow-visible border border-white/10 bg-zinc-950/90 text-white/90 backdrop-blur-[10px]"
    style:width={px(width)}
    style:height={px(height)}
    style:animation-delay={`${Math.random() * 1}s`}
    in:fly={{ y: 40, duration: 400, easing: cubicOut }}
>
    <div class="prompt">
        <span class="font-mono ml-1">[laura {path}]$ {command}</span>
    </div>

    <div
        class="{innerStyles} relative grow content p-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.16)_rgba(255,255,255,0.06)]"
    >
        {@render children()}
    </div>
</div>
