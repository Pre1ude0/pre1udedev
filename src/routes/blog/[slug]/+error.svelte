<script>
    import { page } from "$app/state";
</script>

<div
    class="text-zinc-300 text-3xl flex flex-col justify-center items-center gap-2 py-30"
>
    <h1 class="text-[10rem] font-bold font-(family-name:--font-geist-mono)">
        {page.status}
    </h1>
    <p class="text-3xl max-w-3/4">
        unable to open file
        {page.url.pathname === "/" ? "home" : page.url.pathname.slice(1)}.md: no
        such file or directory
    </p>
</div>
