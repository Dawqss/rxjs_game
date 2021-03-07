//@ts-nocheck
import {
    CharacterSpriteConfig,
    CharacterSpritesTypes,
    CharactersSpriteConfig,
    charactersSpritesImagesToLinks,
    mapTilesIdsToLinks
} from './contants';
import background from '../../assets/backgrounds/2 Background/Background.png';
import {ITileImages} from "./types";

import sprite from '../../assets/Premade Knight Sheets/spritesheet-knight-black.png';
import spriteMeta from '../../assets/Premade Knight Sheets/spritesheet-knight-black.json';

export class Resources {
    public tileImages?: ITileImages;
    public backgroundImage?: typeof Image;
    public charactersSpritesConfig = <CharactersSpriteConfig>{};
    public characterConfig = {};

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

    private getCharacterSpritesConfig = () => new Promise((response) => {
        let charactersSpritesConfig = <CharactersSpriteConfig>{};
        let count = 3 * 11;
        const charactersSpritesImagesToLinksEntries = Object.entries(charactersSpritesImagesToLinks)

        for (let [key, characterConfig] of charactersSpritesImagesToLinksEntries) {
            let loadedCharacterSprite = <{
                [key in CharacterSpritesTypes]: CharacterSpriteConfig
            }>{}

            for (let attack in characterConfig) {
                const image = new Image();

                loadedCharacterSprite = {
                    ...loadedCharacterSprite,
                    [key]: {
                        ...loadedCharacterSprite[key],
                        [attack]: image
                    }
                }

                image.src = characterConfig[attack];

                image.onload = () => {
                    count--;
                    if(!count) {
                        response(charactersSpritesConfig)
                    }
                }
            }

            charactersSpritesConfig = {
                ...charactersSpritesConfig,
                ...loadedCharacterSprite
            }
        }
    });

    public getCharacterSprites = () => new Promise((resolve) => {
        const image = new Image();

        image.src = sprite;
        image.onload = () => resolve(image);
    });

    public loadResources = () => Promise.all([
        this.getTileImages(),
        this.getBackgroundImage(),
        this.getCharacterSpritesConfig(),
        this.getCharacterSprites()
    ]).then(([tileImages, bgImage, characterSprites, charSprite]) => {
        this.tileImages = tileImages;
        this.backgroundImage = bgImage;
        this.charactersSpritesConfig = characterSprites;
        this.characterConfig = charSprite;
        // console.log(spriteMeta);
    });
}
