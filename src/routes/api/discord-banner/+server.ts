import type { RequestHandler } from "./$types";

import { PUBLIC_DISCORD_USER_ID } from "$env/static/public";
import { DISCORD_BOT_TOKEN } from "$env/static/private";

async function fetchUserBanner(userId: string, botToken: string) {
    const headers = {
        Authorization: `Bot ${botToken}`,
    };
    const url = `https://discord.com/api/v10/users/${userId}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Discord API error: ${response.status} - ${errorText}`);
    }
    return (await response.json()).banner;
}

async function getBannerUrl(
    userId: string,
    bannerHash: string | null,
    imageFormat: string,
) {
    if (!bannerHash) {
        return "";
    }

    const size = 512; // You can adjust the size as needed (16, 32, 64, 128, 256, 512, 1024, 2048, 4096)
    return `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${imageFormat}?size=${size}`;
}

export async function GET() {
    if (!PUBLIC_DISCORD_USER_ID) {
        return new Response(JSON.stringify({ error: "Missing discordId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const bannerHash = await fetchUserBanner(
        PUBLIC_DISCORD_USER_ID,
        DISCORD_BOT_TOKEN,
    ).then((banner) => banner as string | null);

    let imageFormat = "png"; // Default to png

    if (bannerHash && bannerHash.startsWith("a_")) {
        imageFormat = "gif";
    }

    return new Response(
        JSON.stringify({
            bannerUrl: await getBannerUrl(
                PUBLIC_DISCORD_USER_ID,
                bannerHash,
                imageFormat,
            ),
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        },
    );
}
