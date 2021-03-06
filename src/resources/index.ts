//@ts-nocheck
import {ITileImages} from "../tile/utils";
import {
    CharacterSpriteConfig,
    CharacterSpritesTypes,
    CharactersSpriteConfig,
    charactersSpritesImagesToLinks,
    mapTilesIdsToLinks
} from './contants';
import background from '../../assets/backgrounds/2 Background/Background.png';

export class Resources {
    public tileImages?: ITileImages;
    public backgroundImage?: typeof Image;
    public charactersSpritesConfig: CharacterSpriteConfig;

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
        console.log('asdasdasd');
        // console.log(charactersSpritesImagesToLinks);
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

    public loadResources = () => Promise.all([
        this.getTileImages(),
        this.getBackgroundImage(),
        this.getCharacterSpritesConfig()
    ]).then(([tileImages, bgImage, characterSprites]) => {
        this.tileImages = tileImages;
        this.backgroundImage = bgImage;
        console.log(characterSprites);
        this.charactersSpritesConfig = characterSprites;
    });
}
