import FusionCollection from "fusionable/FusionCollection";
import { error } from "@sveltejs/kit";

export function load({ params }) {
    const collection = new FusionCollection().loadFromDir("src/lib/blogs");
    const post = collection.getOneBySlug(params.slug);
    const postsArray = collection.getMetadataArray();

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i].fields.slug === params.slug) {
            var prev = postsArray[i - 1] || null;
            var next = postsArray[i + 1] || null;
        }
    }

    console.log(next);
    console.log(prev);

    if (!post) {
        throw error(404);
    }

    return { post: post.getItem(), prev, next };
}
