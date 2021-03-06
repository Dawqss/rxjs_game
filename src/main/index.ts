//@ts-nocheck
import {loadBackgroundImage, loadTileImages} from "../tile/utils";
import {GameLoop} from "../game-loop";
import {Resources} from "../resources";
import {Draw} from "../draw";

export class Main {
    resources = new Resources();

    gameLoop: GameLoop;
    draw: Draw;

    ctx?: CanvasRenderingContext2D;

    constructor() {
        this.gameLoop = new GameLoop(this.renderGame, this.updateGameState);
        this.draw = new Draw(this.resources);
    }

    public bootstrap = () => {
        // load all classes images etc.
        // run gameLoop

        this.resources.loadResources().then(() => {
            this.gameLoop.start();
        })
    };

    private renderGame = () => {
        console.log('dupsko');
        this.draw.drawBackground();
    };

    private updateGameState = () => {

    }
}
