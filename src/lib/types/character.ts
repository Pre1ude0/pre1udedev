export interface Mention {
    text: string;
    pos: [number, number];
}

export interface Image {
    name: string;
    file: string;
    description?: string;
    original?: string;
    mentions?: Mention[];
    imgEl?: HTMLImageElement;
    load?: boolean;
    loaded?: boolean;
}

export interface Character {
    name: string;
    description: string;
    media: Image[];
    htmlEl?: HTMLElement;
}
