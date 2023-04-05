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

        

        // gameObjecty -> ktore moga sie ruszac(miala by jakies jak zmienic swoja projekcje po dotknieciu),
        // nie moge sie ruszac (nie moga sie ruszac ale maja wplyw na postac, np nie prze przez nie przejsc),
        // i sa poruszane przez usera(character, characterInCar etc.)


        // gameLoop
        // 1. rendereowanie blokow widocznych na ekranie
        // 2. wysylanie informacji o nieruszalnych blokach do postaci
        // 3. wyrenderowanie ruchow postaci na podstawi usera inputa
        // 4. przekazanie ruchow postaci do obiektow ktore moga sie poruszac
    }
}
