<script lang="ts">
    import type { PageData } from "./$types";
    import Divider from "$lib/components/Divider.svelte";
    let { data }: { data: PageData } = $props();

    function timeAgo(dateString: string): string {
        // Parse d/m/y format
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const now = new Date();
        // Set the date to 00:00:00 local time
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        const days = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
        );

        const intervals: [number, string][] = [
            [30, "day"],
            [12, "month"],
            [Number.POSITIVE_INFINITY, "year"],
        ];

        let i = 0;
        let count = days;
        while (i < intervals.length && count >= intervals[i][0]) {
            count = Math.floor(count / intervals[i][0]);
            i++;
        }
        const unit = intervals[i][1];
        if (unit === "day" && count === 0) return "today";
        return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
</script>

<main>
    <h1 class="text-white text-6xl my-2">Blog</h1>
    <ul>
        {#each data.posts as post}
            <li class="w-full p-2 border-zinc-700 border-b-1 md:border-b-0">
                <a
                    href={`/blog/${post.fields.slug}`}
                    class="flex flex-col md:flex-row gap-2 items-start justify-end group"
                >
                    <h2
                        class="text-zinc-100 text-lg md:text-2xl group-hover:ml-2 transition-all duration-150
                        font-(family-name:--font-geist-mono) flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2"
                    >
                        {post.fields.title}
                        <span
                            class="text-zinc-500 hidden md:inline-block text-lg"
                            >/</span
                        >
                        <span class="text-zinc-300 text-md md:text-xl"
                            >{post.filename}</span
                        >
                    </h2>

                    <Divider />

                    <p
                        class="text-zinc-300 font-(family-name:--font-geist-mono) self-end"
                    >
                        {post.fields.date}
                        - {timeAgo(post.fields.date)}
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</main>
