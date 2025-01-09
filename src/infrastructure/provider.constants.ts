import { ICmd, messagePatternFactory } from "./message-patterns.util";

export const NATS_SERVICE = 'NATS_SERVICE';

export enum NATS_MODULES {
    FILES_MODULE = 'files-module',
    USERS_MODULE = 'users-module',
    BIDS_MODULE = 'bids-module'
}

export const createBid: ICmd = messagePatternFactory(
    NATS_MODULES.BIDS_MODULE,
    'create-bid'
).getMessage();