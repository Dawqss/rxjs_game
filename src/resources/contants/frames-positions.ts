import spriteMeta from '../../../assets/Premade Knight Sheets/spritesheet-knight-black.json';

export const sprites = spriteMeta.TextureImporter.spriteSheet.sprites;

export enum AnimationTypes {
    Idle = 'Idle',
    Attack = 'Attack',
    Block = 'Block',
    Crouch = 'Crouch',
    AttackFromCrouch = 'AttackFromCrouch',
    BlockFromCrouch = 'BlockFromCrouch',
    GetHurt = 'GetHurt',
    Death = 'Death',
    Run = 'Run',
    Throw = 'Throw',
    Jump = 'Jump',
    MidAirHit = 'MidAirHit',
    TurningAway = 'TurningAway',
    ClimbingUp = 'ClimbingUp',
    GettingAtTop = 'GettingAtTop',
    RollingForward = 'RollingForward'
}

type Frame = {
    height: number;
    width: number;
    x: number;
    y: number;
}

const getFrameSlice = (startIndex: number, numberOfFrames: number): Frame[] => {
    return new Array(numberOfFrames).fill(0).map((_, i) => sprites[startIndex + i].rect);
}

export const animationFramesSpriteGrid: {[key in AnimationTypes]: Frame[]} = {
    [AnimationTypes.Idle]: getFrameSlice(0, 4),
    [AnimationTypes.Attack]: getFrameSlice(4, 9),
    [AnimationTypes.Block]: getFrameSlice(13, 4),
    [AnimationTypes.Crouch]: getFrameSlice(17, 4),
    [AnimationTypes.AttackFromCrouch]: getFrameSlice(21, 8),
    [AnimationTypes.BlockFromCrouch]: getFrameSlice(29, 4),
    [AnimationTypes.GetHurt]: getFrameSlice(33, 2),
    [AnimationTypes.Death]: getFrameSlice(35, 9),
    [AnimationTypes.Run]: getFrameSlice(45, 12),
    [AnimationTypes.Throw]: getFrameSlice(57, 10),
    [AnimationTypes.Jump]: getFrameSlice(67, 10),
    [AnimationTypes.MidAirHit]: getFrameSlice(77, 3),
    [AnimationTypes.TurningAway]: getFrameSlice(80, 4),
    [AnimationTypes.ClimbingUp]: getFrameSlice(84, 6),
    [AnimationTypes.GettingAtTop]: getFrameSlice(90, 6),
    [AnimationTypes.RollingForward]: getFrameSlice(96, 8)
}
