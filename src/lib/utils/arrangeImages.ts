export function arrangeImages(container: HTMLElement) {
    const cards = container.querySelectorAll("a");

    let columnCount = Math.ceil(container.clientWidth / 500);

    const columns = Array(columnCount);

    for (let i = 0; i < columnCount; i++) {
        columns[i] = 0;
    }

    for (let card of cards) {
        if (getComputedStyle(card).display !== "none") {
            const currentColumn = columns.findIndex(
                (c) => c === Math.min(...columns),
            );

            card.style.left = (currentColumn * 100) / columnCount + "%";
            card.style.top = columns[currentColumn] + "px";

            card.style.width = `calc(${100 / columnCount}% - 20px)`;

            const cardSize = card.getBoundingClientRect();
            columns[currentColumn] += cardSize.height + 16;
        }
        container.style.height = Math.max(...columns) + "px";
    }
}
