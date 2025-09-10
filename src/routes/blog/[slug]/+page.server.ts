import FusionCollection from "fusionable/FusionCollection";

import { error } from "@sveltejs/kit";

export function load({ params }) {
    const collection = new FusionCollection().loadFromDir("src/lib/blogs");
    const post = collection.getOneBySlug(params.slug);

    if (!post) {
        throw error(404);
    }

    return { post: post.getItem() };
}
