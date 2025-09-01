<script lang="ts">
    let { text, icon, styles, animName, delay } = $props();
</script>

<div
    class="flex flex-row items-center gap-2 px-2 text-md font-(family-name:--font-geist-mono) h-7 {styles} {animName}"
    style="--delay:{delay}"
>
    <i class="nf {icon}"></i>
    <span>{text}</span>
</div>

<style>
    @keyframes jumpA {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-5px);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes jumpB {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-5px);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
        }
    }

    div {
        &.jumpA {
            animation: jumpA 0.5s ease-in-out both;
            animation-delay: var(--delay);
        }
        &.jumpB {
            animation: jumpB 0.5s ease-in-out both;
            animation-delay: var(--delay);
        }
    }
</style>
