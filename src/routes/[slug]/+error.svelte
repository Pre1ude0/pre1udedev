<script>
    import { page } from "$app/state";
    import Window from "$lib/components/Window.svelte";
</script>

<div class="flex flex-col justify-center items-center h-screen">
    <!-- <h1 class="text-[10rem] font-bold font-(family-name:--font-geist-mono)">
        {page.status}
    </h1>
    <p class="text-3xl max-w-3/4">
        unable to open file
        {page.url.pathname === "/" ? "home" : page.url.pathname.slice(1)}.md: no
        such file or directory
    </p> -->

    <Window
        styles="w-full md:w-[600px]"
        command={`cd ${page.url.pathname.slice(1)}`}
    >
        <div class="flex flex-col items-center justify-center pb-4">
            <h1 class="text-[10rem] font-bold font-geist-mono">
                {page.status}
            </h1>
            <p class="text-3xl text-center">
                cd: <strong>{page.url.pathname.slice(1)}</strong>: No such file
                or directory
            </p>
        </div>
    </Window>
</div>
