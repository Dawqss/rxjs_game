//@ts-nocheck
import {ITileImages, loadBackgroundImage, loadTileImages} from "../tile/utils";
import {mapTilesIdsToLinks} from '../tile/contants';
import background from '../../assets/backgrounds/2 Background/Background.png';

export class Resources {
    public tileImages?: ITileImages;
    public backgroundImage?: typeof Image;

    private getTileImages = () => new Promise<ITileImages>((response) => {
        const mapTilesIdsToLinksEntries = Object.entries(mapTilesIdsToLinks);
        let count = mapTilesIdsToLinksEntries.length;

        let images = <ITileImages>{};

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
                    response(images);
                }
            });
        }
    });

    private getBackgroundImage = () => new Promise<typeof Image>((response) => {
        const image = new Image();

        image.src = background;

        image.onload = () => {
            response(image);
        };
    });

    public loadResources = () => Promise.all([
        this.getTileImages(),
        this.getBackgroundImage()
    ]).then(([tileImages, bgImage]) => {
        this.tileImages = tileImages;
        this.backgroundImage = bgImage;
    });
}
