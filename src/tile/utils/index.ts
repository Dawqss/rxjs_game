//@ts-nocheck
import {mapTilesIdsToLinks} from "../contants";
import background from '../../../assets/backgrounds/2 Background/Background.png';

export type ITileImages = { [key in keyof typeof mapTilesIdsToLinks]: typeof Image };

export const loadTileImages = () => new Promise<ITileImages>((res) => {
    const mapTilesIdsToLinksEntries = Object.entries(mapTilesIdsToLinks);
    let count = mapTilesIdsToLinksEntries.length;

    let images = {};

    for (const [key, imageLink] of mapTilesIdsToLinksEntries) {
        const tileImage = new Image();
        tileImage.src = imageLink;

        images = {
            ...images,
            [key]: tileImage
        }

        tileImage.onload = (() => {
            count--;
            if (!count) {
                res(images);
            }
        });
    }
});

export const loadBackgroundImage = () => new Promise((res) => {
    const image = new Image();

    image.src = background;

    image.onload = () => res(image);
});

