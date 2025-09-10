import FusionCollection from "fusionable/FusionCollection";

export function load() {
    const collection = new FusionCollection()
        .loadFromDir("src/lib/blogs")
        .orderBy("date", "desc");

    const posts = collection.getItemsArray();
    return { posts };
}
