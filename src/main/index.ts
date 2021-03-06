//@ts-nocheck
import {GameLoop} from "../game-loop";
import {Resources} from "../resources";
import {Draw} from "../draw";
import {Character} from "../character";

export class Main {
    resources = new Resources();

    gameLoop: GameLoop;
    draw: Draw;
    characters = new Map<Character>();

    constructor() {
        this.gameLoop = new GameLoop(this.renderGame, this.updateGameState);
        this.draw = new Draw(this.resources);
    }

    public bootstrap = () => {
        // load all classes images etc.
        // run gameLoop

        this.resources.loadResources().then(() => {
            // TODO: add enum
            // this.characters.set('Woodcutter', new Character(this.resources));
            // this.test();
            // this.gameLoop.start();
        })
    };

    private renderGame = () => {
        console.log('dupsko');
        this.draw.drawBackground();
    };

    private updateGameState = () => {

    }

    private test = () => {
        this.characters.forEach((character) => {
            // const animationFrames = character.getSequenceAnimationFrames();
            // console.log(animationFrames);
            // this.draw.ctx.drawImage(animationFrames.image, 0, 0, 48, 48, 48, 48, 48, 48);
        })
    }
}
