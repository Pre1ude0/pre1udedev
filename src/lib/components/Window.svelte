<script lang="ts">
    import { onMount } from "svelte";
    import Discord from "../../routes/Discord.svelte";
    let titleBarElement: HTMLElement;
    let isDragging = $state(false);
    let { children, initialX = 20, initialY = 20 } = $props();
    let x = $state(100);
    let y = $state(100);

    onMount(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                x = event.clientX - initialX;
                y = event.clientY - initialY;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        const handleMouseDown = (event) => {
            isDragging = true;
            initialX = event.clientX - x;
            initialY = event.clientY - y;
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        titleBarElement.addEventListener("mousedown", handleMouseDown);
    });
</script>

<div
    class="bg-zinc-950 h-100 w-[700px] absolute border border-zinc-700 flex flex-row justify-between items-start gap-4 p-3 pt-10
    {isDragging ? 'select-none' : ''}"
    style:top={`${y}px`}
    style:left={`${x}px`}
>
    <div
        class="absolute top-0 left-0 w-full bg-zinc-100 px-2 border-b border-zinc-300"
        bind:this={titleBarElement}
    >
        Pre1ude0
    </div>
    <div>
        {@render children()}
    </div>
</div>
