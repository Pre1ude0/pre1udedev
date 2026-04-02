<script lang="ts">
    import "../app.css";
    let { children } = $props();
    import { onMount } from "svelte";
    let screenWidth = $state(0);

    function updateScreenWidth() {
        screenWidth = window.innerWidth;
    }

    onMount(() => {
        updateScreenWidth();
        window.addEventListener("resize", updateScreenWidth);
        return () => {
            window.removeEventListener("resize", updateScreenWidth);
        };
    });
</script>

<div class="flex justify-center align-start pt-4 w-full">
    {@render children()}
</div>

<div class="flex flex-1"></div>

<!-- TODO: Redo this with canvas for performance -->
<div
    class="w-full bottom-0 left-0 relative flex flex-row justify-evenly items-end h-[200px] overflow-hidden"
>
    {#each Array(Math.floor(screenWidth / 50)) as _, i}
        <div class="w-0 relative">
            <div
                class="w-[60px] bg-linear-to-t from-stone-900 to-black absolute bottom-0 left-0 -translate-x-1/2 shadow-2xl shadow-black"
                style:height={`${Math.random() * 150 + 50}px`}
                style:z-index={Math.floor(Math.random() * 3) + 1}
            >
                <!-- style:animation={`riseAndFall ${Math.random() * 2 + 10}s ease-in-out ${Math.random() * -100}s infinite`} -->
                <div
                    class="grid grid-cols-3 grid-rows-4 items-start gap-[4px] pt-2 p-[5px] h-fit w-full"
                >
                    {#each Array(26) as _, j}
                        <div
                            class="box-border mix-blend-difference w-full aspect-square
                        {Math.random() < 0.3
                                ? 'bg-transparent'
                                : 'bg-white/90'}"
                        ></div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
    <div
        class="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t/longer from-black to-transparent pointer-events-none"
    ></div>
</div>

<div class="crt fixed inset-0 pointer-events-none z-10 opacity-80"></div>

<style>
    @keyframes scanline {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 0 -4px;
        }
    }

    @keyframes -global-riseAndFall {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(50%);
        }
        100% {
            transform: translateY(0);
        }
    }

    .crt {
        /*background: contain repeat
            linear-gradient(to top, #000000, #000000, #333333, #333333);
        background-size: 100% 2px;*/

        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            transparent 50%,
            transparent 100%
        );
        background-size: 100% 4px;
        animation: scanline 0.5s linear infinite;
    }
</style>
