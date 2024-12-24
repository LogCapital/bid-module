interface IMessagePattern {
    cmd: unknown;
    getMessage(): ICmd;
}
export interface ICmd {
    cmd: string
}

class MessagePattern implements IMessagePattern {
    private _cmd: string;
    get cmd(): string {
        return this._cmd;
    }
    private set cmd(value: string) {
        this._cmd = value;
    }

    constructor(moduleName: string, message: string) {
        this.cmd = [moduleName, message].join('/');
    }

    getMessage(): ICmd {
        return {
            cmd: this.cmd
        }
    }
}

/**
* Фабрика MessagePattern
* 
* @param {String} moduleName Название модуля (микросервиса), который должен ответить на сообщение 
* @param {String} message Сообщение, на который должен ответить модуль 
* 
* @returns {MessagePattern} Object of class {@link MessagePattern}
*/
export function messagePatternFactory(
    moduleName: string,
    message: string
): MessagePattern {
    return new MessagePattern(moduleName, message);
}