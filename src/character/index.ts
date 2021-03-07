//@ts-nocheck
import {Resources} from "../resources";
import {CharacterSpritesTypes, CharacterType} from "../resources/contants";
import {BehaviorSubject, interval} from "rxjs";
import {withLatestFrom} from "rxjs/operators";

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

export interface CharacterFrame {
    spriteImage: typeof Image;
    drawOptions: DrawOptions;
}

export class Character {
    private size = 48;
    private currentAnimationType = CharacterSpritesTypes.IDLE;
    private drawOptions: DrawOptions = {
        sourceX: 0,
        sourceY: 0,
        sourceHeight: this.size,
        sourceWidth: this.size,
        destinationX: 290,
        destinationY: 240,
        destinationHeight: this.size,
        destinationWidth: this.size
    }

    private animationSpeed = 1000 / 6;
    private animationFrame$ = interval(this.animationSpeed);
    private updateSubj$ = new BehaviorSubject();

    private framesConfig = {
        [CharacterSpritesTypes.IDLE]: 3,
        [CharacterSpritesTypes.IDLE_LEFT]: 3,
        [CharacterSpritesTypes.RUN]: 5,
        [CharacterSpritesTypes.RUN_LEFT]: 5,
        [CharacterSpritesTypes.JUMP]: 5
    }


    private count = 0;
    private speed = 0;
    private isJumping = false;

    constructor(private resources: Resources, private currentConfig = resources.charactersSpritesConfig[CharacterType.WOODCUTTER]) {
        // only idea to get good frames
        this.animationFrame$.pipe(
            withLatestFrom(this.updateSubj$)
        ).subscribe((deltaTime) => {
                const max = this.framesConfig[this.currentAnimationType];

                if (this.count > max) {
                    this.count = 0;
                }
                this.drawOptions.sourceX = this.count * this.size;
                this.count++;

                // console.log(deltaTime);
            }
        )
    }


    public update = (deltaTime, keysDown: any = {}, gameState) => {
        const hasRightArrow = keysDown.hasOwnProperty('right_arrow');
        const hasLeftArrowTrue = keysDown.hasOwnProperty('left_arrow');
        const isUpArrow = keysDown?.up_arrow;

        if (isUpArrow || this.isJumping) {
            this.currentAnimationType = CharacterSpritesTypes.JUMP;
            this.drawOptions.destinationY -= deltaTime * 10;
            this.isJumping = true;
            return;
        }

        // return;

        if (!hasRightArrow && !hasLeftArrowTrue) {
            this.updateSubj$.next(deltaTime);
            return;
        }

        const rightArrow = keysDown.right_arrow;
        const leftArrow = keysDown.left_arrow;

        if (rightArrow !== undefined && rightArrow) {
            this.currentAnimationType = CharacterSpritesTypes.RUN;
            this.drawOptions.destinationX += this.speed;
            if (this.speed < 6) {
                this.speed += deltaTime * 4;
            }

            return;
        }

        if (leftArrow !== undefined && leftArrow) {
            this.currentAnimationType = CharacterSpritesTypes.RUN_LEFT;
            this.drawOptions.destinationX -= this.speed;
            if (this.speed < 6) {
                this.speed += deltaTime * 4;
            }
            return;
        }

        if (rightArrow !== undefined && !rightArrow) {
            this.currentAnimationType = CharacterSpritesTypes.IDLE;
            this.speed = 0;
            return;
        }

        if (leftArrow !== undefined && !leftArrow) {
            this.currentAnimationType = CharacterSpritesTypes.IDLE_LEFT;
            this.speed = 0;
            return;
        }

        this.updateSubj$.next(deltaTime);
    };

    public getFrame = (): CharacterFrame => {
        return {
            spriteImage: this.currentConfig[this.currentAnimationType],
            drawOptions: this.drawOptions
        }
    };
}
