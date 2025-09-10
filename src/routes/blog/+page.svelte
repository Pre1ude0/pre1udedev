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
            <li class="w-full p-2">
                <a
                    href={`/blog/${post.fields.slug}`}
                    class="flex flex-row gap-2 items-center"
                >
                    <h2
                        class="text-zinc-100 text-2xl
                        font-(family-name:--font-geist-mono)"
                    >
                        {post.fields.title}
                    </h2>
                    <span class="text-zinc-300 text-xl">/ {post.filename}</span>
                    <Divider />

                    <p
                        class="text-zinc-300 font-(family-name:--font-geist-mono)"
                    >
                        {post.fields.date}
                        - {timeAgo(post.fields.date)}
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</main>
