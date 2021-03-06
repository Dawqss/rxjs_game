import {mapTilesIdsToLinks} from "./contants";

export type ITileImages = { [key in keyof typeof mapTilesIdsToLinks]: typeof Image };
