<script lang="ts">
    let { id, animName = "none", delay = "0" } = $props();
    let langs: any = $state({
        svelte: {
            text: "Svelte",
            icon: "nf-dev-svelte",
            styles: "bg-[#f96743] text-white",
        },

        html: {
            text: "HTML",
            icon: "nf-dev-html5",
            styles: "bg-[#e34f26] text-white",
        },

        css: {
            text: "CSS",
            icon: "nf-custom-css",
            styles: "bg-[rebeccapurple] text-white",
        },

        ts: {
            text: "TS",
            icon: "nf-dev-typescript",
            styles: "bg-[#3178c6] text-white",
        },

        git: {
            text: "Git",
            icon: "nf-dev-git",
            styles: "bg-[#e24329] text-white",
        },

        linux: {
            text: "Linux",
            icon: "nf-oct-command_palette",
            styles: "bg-black text-white",
        },

        python: {
            text: "Python",
            icon: "nf-dev-python",
            styles: "bg-[#ffde57] text-black",
        },

        docker: {
            text: "Docker",
            icon: "nf-dev-docker",
            styles: "bg-[#2496ed] text-white",
        },

        tailwindcss: {
            text: "tailwindcss",
            icon: "nf-dev-tailwindcss",
            styles: "bg-[#06b6d4] text-white",
        },

        js: {
            text: "JS",
            icon: "nf-fa-js",
            styles: "bg-[#f7df1e] text-black",
        },

        nodejs: {
            text: "NodeJS",
            icon: "nf-md-nodejs",
            styles: "bg-[#215732] text-white",
        },

        express: {
            text: "Express",
            icon: "nf-dev-express",
            styles: "bg-gray-800 text-white",
        },
    });
</script>

<div
    class="flex flex-row items-center gap-2 px-2 text-md font-(family-name:--font-geist-mono) h-7 {langs[
        id
    ].styles} {animName ? animName : ''}"
    style={delay ? `--delay:${delay}` : ""}
>
    <i class="nf {langs[id].icon}"></i>
    <span>{langs[id].text}</span>
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
