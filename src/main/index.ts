//@ts-nocheck
import {ITileImages, loadBackgroundImage, loadTileImages} from "../tile/utils";
import json from '../../assets/maps/levelAlpha.json';

export class Main {
    tileImages?: ITileImages;
    backgroundImage?: typeof Image;
    gameArea?: HTMLCanvasElement;

    ctx?: CanvasRenderingContext2D;

    public bootstrap = () => {
        Promise.all([
            loadTileImages(),
            loadBackgroundImage()
        ]).then(([tileImages, bgImage]) => {
            this.tileImages = tileImages;
            this.backgroundImage = bgImage;

            this.gameArea = document.getElementById('game') as HTMLCanvasElement;
            this.ctx = this.gameArea.getContext('2d')!;
            this.draw();
        });
    }

    private start = () => {

    };


    public draw() {
        // idea: layers??
        // bg first 1st
        // character + collision 2nd
        const size = json.tileSize;
        const tilesTable = json.tiles;

        console.log(this.backgroundImage);

        this.ctx?.drawImage(this.backgroundImage, 0, 0);

        for (let i = 0; i < tilesTable.length; i++) {
            console.log('run');
            for (let j = 0; j < tilesTable[i].length; j++) {
                const row = tilesTable[i];
                const tileId = row[j];
                const dx = j * size;
                const dy = i * size;


                if (tileId !== 'none') {
                    this.ctx.drawImage(this.tileImages[tileId], dx, dy);
                }
            }
        }
    }
}
