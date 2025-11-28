<script>
    const videoIds = ["uYyio-6wBNg", "Ty9HFFSCJWM", "_y9TjiABLrE"];
</script>

<div class="flex flex-row gap-2 flex-wrap">
    {#each videoIds as id}
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    {/each}
</div>
