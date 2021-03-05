import { BehaviorSubject, Observable, of, fromEvent } from 'rxjs';
import { buffer, bufferCount, expand, filter, map,  share, tap, withLatestFrom } from 'rxjs/operators';

import { KeyUtil } from './keys.util';


export interface IFrameData {
    frameStartTime: number;
    deltaTime: number;
}

const gameArea: HTMLElement = document.getElementById('game')!;
const fps: HTMLElement = document.getElementById('fps')!;

/**
 * This is our core game loop logic. We update our objects and gameState here
 * each frame. The deltaTime passed in is in seconds, we are givent our current state,
 * and any inputStates. Returns the updated Game State
 */
const update = (deltaTime: number, state: any, inputState: any): any => {

    return state;
}

/**
 * This is our rendering function. We take the given game state and render the items
 * based on their latest properties.
 */
const render = (state: any) => {
    const ctx: CanvasRenderingContext2D = (<HTMLCanvasElement>gameArea).getContext('2d')!;
    ctx.clearRect(0, 0, gameArea.clientWidth, gameArea.clientHeight);
};



/**
 * This function returns an observable that will emit the next frame once the
 * browser has returned an animation frame step. Given the previous frame it calculates
 * the delta time, and we also clamp it to 30FPS in case we get long frames.
 */
const calculateStep: (prevFrame: IFrameData) => Observable<IFrameData> = (prevFrame: IFrameData) => {
    return Observable.create((observer) => {

        requestAnimationFrame((frameStartTime) => {
            // Millis to seconds
            const deltaTime = prevFrame ? (frameStartTime - prevFrame.frameStartTime)/1000 : 0;
            observer.next({
                frameStartTime,
                deltaTime
            });
        })
    })
};

// This is our core stream of frames. We use expand to recursively call the
//  `calculateStep` function above that will give us each new Frame based on the
//  window.requestAnimationFrame calls. Expand emits the value of the called functions
//  returned observable, as well as recursively calling the function with that same
//  emitted value. This works perfectly for calculating our frame steps because each step
//  needs to know the lastStepFrameTime to calculate the next. We also only want to request
//  a new frame once the currently requested frame has returned.
const frames$ = of(undefined)
    .pipe(
        expand((val) => calculateStep(val)),
        // Expand emits the first value provided to it, and in this
        //  case we just want to ignore the undefined input frame
        filter(frame => frame !== undefined),
        map((frame: IFrameData) => frame.deltaTime),
        share()
    )

// This is our core stream of keyDown input events. It emits an object like `{"spacebar": 32}`
//  each time a key is pressed down.
const keysDown$ = fromEvent(document, 'keydown')
    .pipe(
        map((event: KeyboardEvent) => {
            const name = KeyUtil.codeToKey(''+event.keyCode);
            if (name !== ''){
                let keyMap = {};
                keyMap[name] = event.code;
                return keyMap;
            } else {
                return undefined;
            }
        }),
        filter((keyMap) => keyMap !== undefined)
    );

// Here we buffer our keyDown stream until we get a new frame emission. This
//  gives us a set of all the keyDown events that have triggered since the previous
//  frame. We reduce these all down to a single dictionary of keys that were pressed.
const keysDownPerFrame$ = keysDown$
    .pipe(
        buffer(frames$),
        map((frames: Array<any>) => {
            return frames.reduce((acc, curr) => {
                return Object.assign(acc, curr);
            }, {});
        })
    );

// Since we will be updating our gamestate each frame we can use an Observable
//  to track that as a series of states with the latest emission being the current
//  state of our game.
const gameState$ = new BehaviorSubject({});

// This is where we run our game!
//  We subscribe to our frames$ stream to kick it off, and make sure to
//  combine in the latest emission from our inputs stream to get the data
//  we need do perform our gameState updates.
frames$
    .pipe(
        withLatestFrom(keysDownPerFrame$, gameState$),
        // HOMEWORK_OPPORTUNITY: Handle Key-up, and map to a true KeyState change object
        map(([deltaTime, keysDown, gameState]) => update(deltaTime, gameState, keysDown)),
        tap((gameState) => gameState$.next(gameState))

    )
    .subscribe((gameState) => {
        render(gameState);
    });


// Average every 10 Frames to calculate our FPS
frames$
    .pipe(
        bufferCount(10),
        map((frames) => {
            const total = frames
                .reduce((acc, curr) => {
                    acc += curr;
                    return acc;
                }, 0);

            return 1/(total/frames.length);
        })
    ).subscribe((avg) => {
    fps.innerHTML = Math.round(avg) + '';
})
