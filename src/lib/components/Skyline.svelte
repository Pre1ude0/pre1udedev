<script lang="ts">
    import { onMount } from "svelte";

    type Props = {
        height?: number;
        class?: string;
    };

    let { height = 270, class: className = "" }: Props = $props();

    let canvasEl: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null = $state(null);

    type Building = {
        x: number;
        width: number;
        height: number;
        z: number;
        cols: number;
        rows: number;
        pad: number;
        gap: number;
        cellSize: number;
        windows: boolean[];
    };

    let buildings: Building[] = $state([]);
    let skylineHeight = $state(height);

    function makeBuildings(width: number) {
        const paddingPx = 30;
        const usableWidth = Math.max(1, width - paddingPx * 2);
        const count = Math.max(1, Math.floor(usableWidth / 50));
        const cell = usableWidth / count;

        buildings = Array.from({ length: count }, (_, i) => {
            const bWidth = 60;
            const bHeight = 50 + Math.random() * 150;
            const pad = 6;
            const gap = 4;
            const cols = 3;
            const cellSize = (bWidth - pad * 2 - gap * (cols - 1)) / cols;
            const rows = Math.max(
                4,
                Math.min(
                    10,
                    Math.floor((bHeight - pad * 2) / (cellSize + gap)),
                ),
            );
            const windows = Array.from(
                { length: rows * cols },
                () => Math.random() >= 0.3,
            );

            return {
                x: paddingPx + i * cell + cell / 2,
                width: bWidth,
                height: bHeight,
                z: 1 + Math.floor(Math.random() * 3),
                cols,
                rows,
                pad,
                gap,
                cellSize,
                windows,
            };
        });
    }

    function draw() {
        if (!canvasEl || !ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const width = canvasEl.clientWidth;
        const height = skylineHeight;

        canvasEl.width = Math.floor(width * dpr);
        canvasEl.height = Math.floor(height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "low";
        ctx.clearRect(0, 0, width, height);

        const sorted = [...buildings].sort((a, b) => a.z - b.z);

        for (const b of sorted) {
            const x = b.x - b.width / 2;
            const y = height - b.height;

            const grad = ctx.createLinearGradient(0, y, 0, height);
            grad.addColorStop(1, "#1c1917");
            grad.addColorStop(0, "#000000");

            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,0.6)";
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 6;
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, b.width, b.height);
            ctx.restore();

            ctx.fillStyle = "rgba(255,255,255, 1)";
            for (let row = 0; row < b.rows; row++) {
                for (let col = 0; col < b.cols; col++) {
                    const idx = row * b.cols + col;
                    if (!b.windows[idx]) continue;
                    const wx = x + b.pad + col * (b.cellSize + b.gap);
                    const wy = y + b.pad + row * (b.cellSize + b.gap);
                    ctx.fillRect(wx, wy, b.cellSize, b.cellSize);
                }
            }
        }
    }

    function resizeAndDraw() {
        if (!canvasEl) return;
        makeBuildings(canvasEl.clientWidth);
        draw();
    }

    onMount(() => {
        if (canvasEl) {
            ctx = canvasEl.getContext("2d");
        }

        resizeAndDraw();
        window.addEventListener("resize", resizeAndDraw);

        return () => {
            window.removeEventListener("resize", resizeAndDraw);
        };
    });
</script>

<div
    class={`w-full absolute bottom-0 left-0 overflow-hidden ${className}`}
    style:height={`${skylineHeight}px`}
>
    <div
        class="z-0 absolute bottom-0 left-0 w-full h-20 bg-linear-to-t/longer from-black to-transparent pointer-events-none"
    ></div>
    <canvas
        bind:this={canvasEl}
        class="relative w-full block z-10"
        style:height={`${skylineHeight}px`}
        aria-hidden="true"
    ></canvas>
</div>
