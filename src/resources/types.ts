import {mapTilesIdsToLinks} from '../tile/contants';

export type ITileImages = { [key in keyof typeof mapTilesIdsToLinks]: typeof Image };
