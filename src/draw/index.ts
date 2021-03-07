//@ts-nocheck
import json from "../../assets/maps/levelAlpha.json";
import {Resources} from "../resources";
import {ITileImages} from "../resources/types";
import {CharacterFrame} from "../character";

export class Draw {
    backgroundImage: typeof Image;
    gameArea: HTMLCanvasElement;
    tileImages: ITileImages;
    ctx: CanvasRenderingContext2D;

    constructor(private resources: Resources) {
        this.gameArea = document.getElementById('game') as HTMLCanvasElement;
        this.ctx = this.gameArea.getContext('2d')!;
        this.ctx.scale(2, 2);
    }

    public drawBackground() {
        // idea: layers??
        // bg first 1st
        // character + collision 2nd

        const size = json.tileSize;
        const tilesTable = json.tiles;

        const {backgroundImage, tileImages} = this.resources;

        this.ctx.drawImage(backgroundImage, 0, 0, this.gameArea?.width, this.gameArea?.height - size);

        for (let i = 0; i < tilesTable.length; i++) {
            for (let j = 0; j < tilesTable[i].length; j++) {
                const row = tilesTable[i];
                const tileId = row[j];
                const dx = j * size;
                const dy = i * size;


                if (tileId !== 'none') {
                    this.ctx.drawImage(tileImages[tileId], dx, dy);
                }
            }
        }
    }

    public drawBySpriteFrame = ({spriteImage, drawOptions}: CharacterFrame) => {
        const {
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            destinationX,
            destinationY,
            destinationWidth,
            destinationHeight,
        } = drawOptions;

        this.ctx.drawImage(spriteImage, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
        this.ctx.font = '12px serif';
    }
}
