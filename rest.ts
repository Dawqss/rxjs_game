// //@ts-nocheck
// import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
// import {buffer, bufferCount, expand, filter, map, share, tap, withLatestFrom} from 'rxjs/operators';
// import image from '../assets/backgrounds/1 Tiles/Tile_01.png';
//
// import {KeyUtil} from './keys.util';
// import {mapTilesLinksToImages} from "./tile/constants";
// import {loadTileImages} from "./tile/utils";
//
//
// export interface IFrameData {
//     frameStartTime: number;
//     deltaTime: number;
// }
//
// const img = new Image();
//
// img.src = image;
//
//
//
// const gameArea: HTMLElement = document.getElementById('game')!;
// const fps: HTMLElement = document.getElementById('fps')!;
//
// const update = (deltaTime: number, state: any, inputState: any): any => {
//
//     return state;
// }
//
// const render = (state: any) => {
//
//     const ctx: CanvasRenderingContext2D = (<HTMLCanvasElement>gameArea).getContext('2d')!;
//     ctx.clearRect(0, 0, gameArea.clientWidth, gameArea.clientHeight);
//     // console.log(mapTilesLinksToImages);
//     ctx.drawImage(img, 0 , 0);
// };
//
// const calculateStep: (prevFrame?: IFrameData) => Observable<IFrameData> = (prevFrame?: IFrameData) => {
//     return new Observable((observer) => {
//
//         requestAnimationFrame((frameStartTime) => {
//             // Millis to seconds
//             const deltaTime = prevFrame ? (frameStartTime - prevFrame.frameStartTime) / 1000 : 0;
//             observer.next({
//                 frameStartTime,
//                 deltaTime
//             });
//         })
//     })
// };
//
// const frames$ = of(undefined)
//     .pipe(
//         expand((val) => calculateStep(val)),
//         filter(frame => frame !== undefined),
//         map((frame: IFrameData) => frame.deltaTime),
//         share()
//     )
//
// // This is our core stream of keyDown input events. It emits an object like `{"spacebar": 32}`
// //  each time a key is pressed down.
// const keysDown$ = fromEvent(document, 'keydown')
//     .pipe(
//         map((event: KeyboardEvent) => {
//             const name = KeyUtil.codeToKey('' + event.keyCode);
//             if (name !== '') {
//                 let keyMap = {};
//                 keyMap[name] = event.code;
//                 return keyMap;
//             } else {
//                 return undefined;
//             }
//         }),
//         filter((keyMap) => keyMap !== undefined)
//     );
//
// // Here we buffer our keyDown stream until we get a new frame emission. This
// //  gives us a set of all the keyDown events that have triggered since the previous
// //  frame. We reduce these all down to a single dictionary of keys that were pressed.
// const keysDownPerFrame$ = keysDown$
//     .pipe(
//         buffer(frames$),
//         map((frames: Array<any>) => {
//             return frames.reduce((acc, curr) => {
//                 return Object.assign(acc, curr);
//             }, {});
//         })
//     );
//
//
// const gameState$ = new BehaviorSubject({});
//
//
// frames$
//     .pipe(
//         withLatestFrom(keysDownPerFrame$, gameState$),
//         // HOMEWORK_OPPORTUNITY: Handle Key-up, and map to a true KeyState change object
//         map(([deltaTime, keysDown, gameState]) => update(deltaTime, gameState, keysDown)),
//         tap((gameState) => gameState$.next(gameState))
//     )
//     .subscribe((gameState) => {
//         render(gameState);
//     });
//
//
// frames$
//     .pipe(
//         bufferCount(10),
//         map((frames) => {
//             const total = frames
//                 .reduce((acc, curr) => {
//                     acc += curr;
//                     return acc;
//                 }, 0);
//
//             return 1 / (total / frames.length);
//         })
//     ).subscribe((avg) => {
//     // fps.innerHTML = Math.round(avg) + '';
// })
