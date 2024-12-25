import { ICmd, messagePatternFactory } from "./message-patterns.util";

export const NATS_SERVICE = 'NATS_SERVICE';

export enum NATS_MODULES {
    FILES_MODULE = 'files-module',
    USERS_MODULE = 'users-module',
    BID_MODULE = 'bid-module'
}

export const sendPingOkHealthcheck: ICmd = messagePatternFactory(
    NATS_MODULES.BID_MODULE,
    'send-ping-ok',
).getMessage();