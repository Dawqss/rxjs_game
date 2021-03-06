//@ts-nocheck
import {BehaviorSubject, fromEvent, Observable, of} from "rxjs";
import {buffer, expand, filter, map, share, tap, withLatestFrom} from "rxjs/operators";

interface IFrameData {
    frameStartTime: number;
    deltaTime: number;
}

export class GameLoop {
    constructor(private renderHandler: (gameState: any) => void, private updateHandler: () => any) {
    };

    private gameState$ = new BehaviorSubject({});

    private requestFrameStep: (prevFrame?: IFrameData) => Observable<IFrameData> = (prevFrame?: IFrameData) => {
        return new Observable((observer) => {
            requestAnimationFrame((frameStartTime) => {
                // Millis to seconds
                const deltaTime = prevFrame ? (frameStartTime - prevFrame.frameStartTime) / 1000 : 0;
                observer.next({
                    frameStartTime,
                    deltaTime
                });
            })
        })
    };

    private frames$ = of(undefined)
        .pipe(
            expand((val) => this.requestFrameStep(val)),
            filter(frame => frame !== undefined),
            map((frame: IFrameData) => frame.deltaTime),
            share()
        );

    private keysDown$ = fromEvent(document, 'keydown')
        .pipe(
            map((event: KeyboardEvent) => {
                // const name = KeyUtil.codeToKey('' + event.keyCode);
                // if (name !== '') {
                //     let keyMap = {};
                //     keyMap[name] = event.code;
                //     return keyMap;
                // } else {
                //     return undefined;
                // }
            }),
            filter((keyMap) => keyMap !== undefined)
        );

    private keysDownPerFrame$ = this.keysDown$
        .pipe(
            buffer(this.frames$),
            map((frames: Array<any>) => {
                return frames.reduce((acc, curr) => {
                    return Object.assign(acc, curr);
                }, {});
            })
        );

    public start() {
        this.frames$
            .pipe(
                withLatestFrom(this.keysDownPerFrame$, this.gameState$),
                // HOMEWORK_OPPORTUNITY: Handle Key-up, and map to a true KeyState change object

                // map(([deltaTime, keysDown, gameState]) => (deltaTime, gameState, keysDown) => console.log(deltaTime, gameState, keysDown)),
                tap((gameState) => this.gameState$.next(gameState))
            )
            .subscribe((gameState) => {
                this.renderHandler(gameState);
            });
    }
}
