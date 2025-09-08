import type { Character, Image } from "$lib/types/character";

export function arrangeImages(character: Character) {
    if (character.htmlEl === undefined) return;

    const images = Array.from(character.media).filter(
        (a) => (a as Image).load === true,
    );

    let columnCount = Math.ceil(character.htmlEl.clientWidth / 500);

    const columns = Array(columnCount).fill(0);

    for (let i of images) {
        if (i.imgEl === undefined) continue;

        const currentColumn = columns.findIndex(
            (c) => c === Math.min(...columns),
        );

        i.imgEl.parentElement!.style.left =
            (currentColumn * 100) / columnCount + "%";
        i.imgEl.parentElement!.style.top = columns[currentColumn] + "px";
        i.imgEl.parentElement!.style.width = `calc(${100 / columnCount}% - 20px)`;

        const cardSize = i.imgEl.clientHeight;
        columns[currentColumn] += cardSize + 16;
        character.htmlEl.style.height = Math.max(...columns) + "px";
    }
}
