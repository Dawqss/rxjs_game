//@ts-nocheck
import {GameLoop} from "../game-loop";
import {Resources} from "../resources";
import {Draw} from "../draw";
import {Character} from "../character";
import {CharacterType} from "../resources/contants";

export class Main {
    resources = new Resources();

    gameLoop: GameLoop;
    draw: Draw;
    characters = new Map<CharacterType, Character>();

    constructor() {
        this.gameLoop = new GameLoop(this.renderGame, this.updateGameState);
        this.draw = new Draw(this.resources);
    }

    public bootstrap = () => {
        this.resources.loadResources().then(() => {
            this.characters.set(CharacterType.WOODCUTTER, new Character(this.resources));
            this.gameLoop.start();
        })
    };

    private renderGame = () => {
        this.draw.drawBackground();

        this.characters.forEach((character) => {
            this.draw.drawBySpriteFrame(character.getFrame());
        })
    };

    private updateGameState = (deltaTime, keysDown, gameState) => {
        this.characters.forEach((character) => {
            character.update(deltaTime, keysDown, gameState);
        })
    }
}
