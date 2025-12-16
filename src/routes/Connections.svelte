<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";

    const contacts = [
        {
            name: "Email (pref if I don't know you)",
            url: "mailto:laura@pre1ude.dev",
            icon: "nf-md-email",
        },
        {
            name: "Discord",
            url: "https://discord.com/users/737983831000350731",
            icon: "nf-fa-discord",
        },
        {
            name: "GitHub",
            url: "https://github.com/Pre1ude0",
            icon: "nf-fa-github",
        },
        {
            name: "Bsky",
            url: "https://bsky.app/profile/pre1ude0.at.fent.space",
            icon: "nf-fae-butterfly",
        },
        {
            name: "Mastodon",
            url: "https://catgirl.center/@pre1ude0",
            icon: "nf-md-cat",
        },
        {
            name: "Steam",
            url: "https://steamcommunity.com/id/Pre1ude0",
            icon: "nf-fa-steam",
        },
    ];
</script>

<h2 class="text-4xl mb-4">Socials:</h2>
<ul>
    {#each contacts as contact}
        <li
            class="text-lg text-zinc-300 flex flex-row gap-2 items-center group pl-5"
        >
            <i
                class="nf {contact.icon} translate-x-0 group-hover:-translate-x-1 transition-transform duration-150"
            ></i>
            <a
                href={contact.url}
                target="_blank"
                class="text-zinc-400 hover:text-zinc-200 transition-colors underline"
                >{contact.name}</a
            >
        </li>
    {/each}
</ul>
