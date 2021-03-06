//@ts-nocheck
import {ITileImages, loadBackgroundImage, loadTileImages} from "../tile/utils";
import {mapTilesIdsToLinks} from './contants';
import background from '../../assets/backgrounds/2 Background/Background.png';
import woodRun from '../../assets/characters/1 Woodcutter/Woodcutter_run.png';

export class Resources {
    public tileImages?: ITileImages;
    public backgroundImage?: typeof Image;
    public dupa;

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

    private getCharacterImages = () => new Promise((response) => {

    });

    private testLoad = () => new Promise((response) => {
        const image = new Image();
        image.src = woodRun;

        image.onload = () => {
            response(image);
        };
    });

    public loadResources = () => Promise.all([
        this.getTileImages(),
        this.getBackgroundImage(),
        this.testLoad(),
    ]).then(([tileImages, bgImage, dupa]) => {
        this.tileImages = tileImages;
        this.backgroundImage = bgImage;
        this.dupa = dupa;
    });
}
