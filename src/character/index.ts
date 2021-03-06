//@ts-nocheck
import {Resources} from "../resources";

interface DrawOptions {
    sourceX: number;
    sourceY: number;
    sourceWidth: number;
    sourceHeight: number;
    destinationX: number;
    destinationY: number;
    destinationWidth: number;
    destinationHeight: number;
}

interface CharacterFrame {
    spriteImage: typeof Image;
    drawOptions: DrawOptions;
}

export class Character {
    drawOptions: DrawOptions;


    constructor(private resources: Resources) {
    }

    public update = () => {
        // animationFrames.image, 0, 0, 48, 48, 48, 48, 48, 48

    };

    public getSequenceAnimationFrames = () => {
        const {dupa} = this.resources;
        const tileSize = dupa.height;
        const numberOfFrames = 6
        return {
            image: dupa,
            framesStartX: new Array(numberOfFrames).fill(0).map((_, i) => i * tileSize)
        }
    };

    private animateRun = () => {
        const {dupa} = this.resources;
    };
}
