<script lang="ts">
    const contacts = [
        {
            name: "Email",
            url: "mailto:laura@pre1ude.dev",
            icon: "nf-md-email",
        },
        {
            name: "Discord",
            url: "https://discord.com/users/737983831000350731",
            icon: "nf-fa-discord",
            popup: "This should bring you to my profile. If it doesn't, we don't share any mutual servers. My username is pre1ude0",
        },
        {
            name: "GitHub",
            url: "https://github.com/Pre1ude0",
            icon: "nf-fa-github",
        },
        {
            name: "Tumblr",
            url: "https://www.tumblr.com/pre1ude0",
            icon: "nf-fa-square_tumblr",
        },
        {
            name: "Bsky",
            url: "https://bsky.app/profile/pre1ude.dev",
            icon: "nf-fae-butterfly",
            inactive: true,
            popup: "Used to be my go-to alternative for Twitter, but, due to it's current state of 'partially dead', I no longer use it",
        },
        {
            name: "Mastodon",
            url: "https://catgirl.center/@pre1ude0",
            icon: "nf-md-cat",
            inactive: true,
            popup: "Joined to disconnect from regular social media, left because it felt too disconnected",
        },
    ];
</script>

<div class="flex flex-row items-start gap-1 flex-wrap">
    {#each contacts as contact}
        <a
            class="relative border text-xl leading-0 {contact.inactive
                ? 'border-gray-400 hover:bg-gray-400 text-gray-400 hover:text-gray-950'
                : 'border-gray-200 hover:bg-gray-200 text-gray-200 hover:text-black'} inline-block p-1 font-mono group"
            href={contact.url}
            target="_blank"
        >
            {contact.name}
            <i class="nf {contact.icon} text-sm -ml-1"></i>
            {#if contact.popup}
                <span
                    class="absolute text-center left-1/2 -translate-x-1/2 -translate-y-full -top-2 bg-zinc-900 border-2 border-zinc-800 text-white text-sm p-1 hidden group-hover:inline-block pointer-events-none w-70 whitespace-normal"
                >
                    {contact.popup}
                </span>
            {/if}
        </a>
    {/each}
</div>
