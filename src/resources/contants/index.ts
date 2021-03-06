//@ts-nocheck
import tile01 from '../../../assets/backgrounds/1 Tiles/Tile_01.png';
import tile02 from '../../../assets/backgrounds/1 Tiles/Tile_02.png';
import tile03 from '../../../assets/backgrounds/1 Tiles/Tile_03.png';
import tile04 from '../../../assets/backgrounds/1 Tiles/Tile_04.png';
import tile05 from '../../../assets/backgrounds/1 Tiles/Tile_05.png';
import tile06 from '../../../assets/backgrounds/1 Tiles/Tile_06.png';
import tile08 from '../../../assets/backgrounds/1 Tiles/Tile_08.png';
import tile09 from '../../../assets/backgrounds/1 Tiles/Tile_09.png';
import tile10 from '../../../assets/backgrounds/1 Tiles/Tile_10.png';
import tile11 from '../../../assets/backgrounds/1 Tiles/Tile_11.png';
import tile12 from '../../../assets/backgrounds/1 Tiles/Tile_12.png';
import tile13 from '../../../assets/backgrounds/1 Tiles/Tile_13.png';
import tile14 from '../../../assets/backgrounds/1 Tiles/Tile_14.png';
import tile15 from '../../../assets/backgrounds/1 Tiles/Tile_15.png';
import tile16 from '../../../assets/backgrounds/1 Tiles/Tile_16.png';
import tile17 from '../../../assets/backgrounds/1 Tiles/Tile_17.png';
import tile18 from '../../../assets/backgrounds/1 Tiles/Tile_18.png';
import tile19 from '../../../assets/backgrounds/1 Tiles/Tile_19.png';
import tile20 from '../../../assets/backgrounds/1 Tiles/Tile_20.png';
import tile21 from '../../../assets/backgrounds/1 Tiles/Tile_21.png';
import tile22 from '../../../assets/backgrounds/1 Tiles/Tile_22.png';
import tile23 from '../../../assets/backgrounds/1 Tiles/Tile_23.png';
import tile24 from '../../../assets/backgrounds/1 Tiles/Tile_24.png';
import tile25 from '../../../assets/backgrounds/1 Tiles/Tile_25.png';
import tile26 from '../../../assets/backgrounds/1 Tiles/Tile_26.png';
import tile27 from '../../../assets/backgrounds/1 Tiles/Tile_27.png';
import tile28 from '../../../assets/backgrounds/1 Tiles/Tile_28.png';
import tile29 from '../../../assets/backgrounds/1 Tiles/Tile_29.png';
import tile30 from '../../../assets/backgrounds/1 Tiles/Tile_30.png';
import tile31 from '../../../assets/backgrounds/1 Tiles/Tile_31.png';

import woodcutter_attack1 from '../../../assets/characters/1 Woodcutter/Woodcutter_attack1.png';
import woodcutter_attack2 from '../../../assets/characters/1 Woodcutter/Woodcutter_attack2.png';
import woodcutter_attack3 from '../../../assets/characters/1 Woodcutter/Woodcutter_attack3.png';
import woodcutter_climb from '../../../assets/characters/1 Woodcutter/Woodcutter_climb.png';
import woodcutter_craft from '../../../assets/characters/1 Woodcutter/Woodcutter_craft.png';
import woodcutter_death from '../../../assets/characters/1 Woodcutter/Woodcutter_death.png';
import woodcutter_push from '../../../assets/characters/1 Woodcutter/Woodcutter_push.png';
import woodcutter_run from '../../../assets/characters/1 Woodcutter/Woodcutter_run.png';
import woodcutter_walk from '../../../assets/characters/1 Woodcutter/Woodcutter_walk.png';
import woodcutter_idle from '../../../assets/characters/1 Woodcutter/Woodcutter_idle.png';
import woodcutter_jump from '../../../assets/characters/1 Woodcutter/Woodcutter_jump.png';

import grave_robber_attack1 from '../../../assets/characters/2 GraveRobber/GraveRobber_attack1.png';
import grave_robber_attack2 from '../../../assets/characters/2 GraveRobber/GraveRobber_attack2.png';
import grave_robber_attack3 from '../../../assets/characters/2 GraveRobber/GraveRobber_attack3.png';
import grave_robber_climb from '../../../assets/characters/2 GraveRobber/GraveRobber_climb.png';
import grave_robber_craft from '../../../assets/characters/2 GraveRobber/GraveRobber_craft.png';
import grave_robber_death from '../../../assets/characters/2 GraveRobber/GraveRobber_death.png';
import grave_robber_push from '../../../assets/characters/2 GraveRobber/GraveRobber_push.png';
import grave_robber_run from '../../../assets/characters/2 GraveRobber/GraveRobber_run.png';
import grave_robber_walk from '../../../assets/characters/2 GraveRobber/GraveRobber_walk.png';
import grave_robber_idle from '../../../assets/characters/2 GraveRobber/GraveRobber_idle.png';
import grave_robber_jump from '../../../assets/characters/2 GraveRobber/GraveRobber_jump.png';

import steam_man_attack1 from '../../../assets/characters/3 SteamMan/SteamMan_attack1.png';
import steam_man_attack2 from '../../../assets/characters/3 SteamMan/SteamMan_attack2.png';
import steam_man_attack3 from '../../../assets/characters/3 SteamMan/SteamMan_attack3.png';
import steam_man_climb from '../../../assets/characters/3 SteamMan/SteamMan_climb.png';
import steam_man_craft from '../../../assets/characters/3 SteamMan/SteamMan_craft.png';
import steam_man_death from '../../../assets/characters/3 SteamMan/SteamMan_death.png';
import steam_man_push from '../../../assets/characters/3 SteamMan/SteamMan_push.png';
import steam_man_run from '../../../assets/characters/3 SteamMan/SteamMan_run.png';
import steam_man_walk from '../../../assets/characters/3 SteamMan/SteamMan_walk.png';
import steam_man_idle from '../../../assets/characters/3 SteamMan/SteamMan_idle.png';
import steam_man_jump from '../../../assets/characters/3 SteamMan/SteamMan_jump.png';

export type CharactersSpriteLinksConfig = {
    [key in CharacterType]: {
        [key in CharacterSpritesTypes]: string;
    }
}

export enum CharacterType {
    WOODCUTTER = 'WOODCUTTER',
    GRAVE_ROBBER = 'GRAVE_ROBBER',
    STEAM_MAN = 'STEAM_MAN'
}

export enum CharacterSpritesTypes {
    ATTACK_A = 'attack1',
    ATTACK_B = 'attack2',
    ATTACK_C = 'attack3',
    CLIMB = 'climb',
    CRAFT = 'craft',
    DEATH = 'death',
    IDLE = 'idle',
    JUMP = 'jump',
    PUSH = 'push',
    RUN = 'run',
    WALK = 'walk'
}

export interface CharacterSpriteConfig {
    spriteImage: typeof Image;
    numberOfFrames: number;
}

export type CharactersSpriteConfig = {
    [key in CharacterType]: {
        [key in CharacterSpritesTypes]: CharacterSpriteConfig
    }
}

export const mapTilesIdsToLinks = {
    tile01,
    tile02,
    tile03,
    tile04,
    tile05,
    tile06,
    tile08,
    tile09,
    tile10,
    tile11,
    tile12,
    tile13,
    tile14,
    tile15,
    tile16,
    tile17,
    tile18,
    tile19,
    tile20,
    tile21,
    tile22,
    tile23,
    tile24,
    tile25,
    tile26,
    tile27,
    tile28,
    tile29,
    tile30,
    tile31
}

export const charactersSpritesImagesToLinks: CharactersSpriteLinksConfig = {
    [CharacterType.WOODCUTTER]: {
        [CharacterSpritesTypes.ATTACK_A]: woodcutter_attack1,
        [CharacterSpritesTypes.ATTACK_B]: woodcutter_attack2,
        [CharacterSpritesTypes.ATTACK_C]: woodcutter_attack3,
        [CharacterSpritesTypes.CLIMB]: woodcutter_climb,
        [CharacterSpritesTypes.CRAFT]: woodcutter_craft,
        [CharacterSpritesTypes.DEATH]: woodcutter_death,
        [CharacterSpritesTypes.IDLE]: woodcutter_idle,
        [CharacterSpritesTypes.JUMP]: woodcutter_jump,
        [CharacterSpritesTypes.PUSH]: woodcutter_push,
        [CharacterSpritesTypes.WALK]: woodcutter_walk,
        [CharacterSpritesTypes.RUN]: woodcutter_run,
    },
    [CharacterType.GRAVE_ROBBER]: {
        [CharacterSpritesTypes.ATTACK_A]: grave_robber_attack1,
        [CharacterSpritesTypes.ATTACK_B]: grave_robber_attack2,
        [CharacterSpritesTypes.ATTACK_C]: grave_robber_attack3,
        [CharacterSpritesTypes.CLIMB]: grave_robber_climb,
        [CharacterSpritesTypes.CRAFT]: grave_robber_craft,
        [CharacterSpritesTypes.DEATH]: grave_robber_death,
        [CharacterSpritesTypes.IDLE]: grave_robber_idle,
        [CharacterSpritesTypes.JUMP]: grave_robber_jump,
        [CharacterSpritesTypes.PUSH]: grave_robber_push,
        [CharacterSpritesTypes.WALK]: grave_robber_walk,
        [CharacterSpritesTypes.RUN]: grave_robber_run,
    },
    [CharacterType.STEAM_MAN]: {
        [CharacterSpritesTypes.ATTACK_A]: steam_man_attack1,
        [CharacterSpritesTypes.ATTACK_B]: steam_man_attack2,
        [CharacterSpritesTypes.ATTACK_C]: steam_man_attack3,
        [CharacterSpritesTypes.CLIMB]: steam_man_climb,
        [CharacterSpritesTypes.CRAFT]: steam_man_craft,
        [CharacterSpritesTypes.DEATH]: steam_man_death,
        [CharacterSpritesTypes.IDLE]: steam_man_idle,
        [CharacterSpritesTypes.JUMP]: steam_man_jump,
        [CharacterSpritesTypes.PUSH]: steam_man_push,
        [CharacterSpritesTypes.WALK]: steam_man_walk,
        [CharacterSpritesTypes.RUN]: steam_man_run,
    }
}
