<script lang="ts">
    import Buttons from "./Buttons.svelte";
    const friends = [
        {
            href: "https://simpleduck.neocities.org/",
            src: "https://simpleduck.neocities.org/stupididiotthing.png",
            alt: "simpleduck.neocities.org",
            title: "Shrimple my beloved",
        },
        {
            href: "https://kyuqdev.pages.dev",
            src: "https://kyuqdev.pages.dev/referer/banner.png",
            alt: "kyuqdev.pages.dev",
            title: "Nyaboom :3",
        },
        {
            href: "https://nyatalie.fyi",
            src: "https://nyatalie.fyi/nat88x31.png",
            alt: "nyatalie.fyi",
            title: "Nyataliewiewiewie",
        },
        {
            href: "https://uwu.gal/about-us",
            src: "https://uwu.gal/button.png",
            alt: "uwu.gal",
            title: "Silly system",
        },
        {
            href: "https://vorlie.pl/",
            src: "https://vorlie.pl/images/vorlie.png",
            alt: "vorlie.pl",
            title: "iota",
        },
        {
            href: "https://byeoon.github.io",
            src: "https://byeoon.github.io/img/button.png",
            alt: "byeoon.github.io",
            title: "byeoomf",
        },
        {
            href: "https://specifix.dev",
            src: "https://specifix.dev/images/88x31.png",
            alt: "specifix.dev",
            title: "miku lovr",
        },

        {
            href: "https://lumap.xyz",
            src: "https://lumap.xyz/button.png",
            alt: "lumap.xyz",
            title: "kitty!!!",
        },
        {
            href: "https://mystie.dev",
            src: "https://mystie.dev/st/img/mystie_btn.png",
            alt: "mystie.dev",
            title: "gay fedi moot",
        },
        {
            href: "https://dvop.fyi",
            src: "https://dvop.fyi/images/frank.png",
            alt: "dvop.fyi",
            title: "Go tell him that his site is awesome",
        },
        {
            href: "https://5ee5.github.io/5ee5dev/",
            src: "https://5ee5.github.io/5ee5dev/assets/5ee5.png",
            alt: "5ee5.github.io",
            title: "error 505",
        },
    ];

    const coolButtons = [
        {
            href: "https://indieweb.org",
            src: "https://indieweb.org/images/4/42/indieweb88x31-flat.png",
            alt: "indieweb.org",
            title: "The indie web camp",
        },
        {
            href: "https://neocities.org",
            src: "/buttons/neocities.png",
            alt: "neocities.org",
            title: "neocities!! An awesome free web hosting service",
        },
        {
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            src: "/buttons/css.png",
            alt: "I (heart) CSS",
            title: "I (heart) CSS",
        },
        {
            href: "https://firefox.com",
            src: "/buttons/firefox.png",
            alt: "firefox.com",
            title: "Firefox!! A free open source non-chromium browser",
        },
        {
            href: "https://eightyeightthirty.one",
            src: "https://eightyeightthirty.one/88x31.png",
            alt: "eightyeightthirty.one",
            title: "A 88x31 button network visualizer",
        },
        {
            src: "/buttons/cloudfree.png",
            alt: "hosted on a computer",
            title: "Host your stuff locally!!",
        },
        {
            href: "https://svelte.dev",
            src: "/buttons/madewithsveltekit.gif",
            alt: "made with sveltekit",
            title: "Svelte is fucking amazing",
        },
    ];
</script>

<h2 class="text-3xl mt-5">Friends:</h2>
<Buttons buttons={friends} />
<h2 class="text-2xl mt-5">Other cool sites/buttons I've found on the web:</h2>
<Buttons buttons={coolButtons} />
