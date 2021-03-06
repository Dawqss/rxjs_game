//@ts-nocheck
import {BehaviorSubject, fromEvent, merge, Observable, of} from "rxjs";
import {buffer, expand, filter, map, share, take, tap, withLatestFrom} from "rxjs/operators";
import {KeyUtil} from "../keys.util";

interface IFrameData {
    frameStartTime: number;
    deltaTime: number;
}

export class GameLoop {

    constructor(private renderHandler: (gameState: any) => void, private updateHandler: (deltaTime, gameState, keysDown) => void) {
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

    private keysDown$ = merge(
        fromEvent(document, 'keydown'),
        fromEvent(document, 'keyup')
    ).pipe(
        map((event: KeyboardEvent) => {
            const name = KeyUtil.codeToKey('' + event.keyCode);
            if (!name) {
                return;
            }

            let keyMap = [];
            if (event.type === 'keydown') {
                keyMap[name] = true;
                return keyMap;
            }

            keyMap[name] = false

            return keyMap;
        }),
        filter(keyMap => keyMap !== undefined)
    );

    public start() {
        this.frames$
            .pipe(
                withLatestFrom(this.keysDown$, this.gameState$),
                map(([deltaTime, keysDown, gameState]) => this.updateHandler(deltaTime, keysDown, gameState)),
                tap((gameState) => this.gameState$.next(gameState))
            )
            .subscribe((gameState) => {
                this.renderHandler(gameState);
            });
    }
}
