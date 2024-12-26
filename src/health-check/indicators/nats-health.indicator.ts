import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { ICmd } from "src/infrastructure/message-patterns.util";
import { NATS_SERVICE } from "src/infrastructure/provider.constants";
import { resolveObservable } from "src/infrastructure/resolver.observable";

@Injectable()
export class NatsHealthIndicator extends HealthIndicator {
    constructor(
        @Inject(NATS_SERVICE)
        private readonly natsClient: ClientProxy,
    ) {
        super();
    }

    async sendMessage(key: string, message: ICmd): Promise<HealthIndicatorResult> {
        try {
            await resolveObservable(this.natsClient.send(message, {}));

            return this.getStatus(key, true);
        } catch (err) {
            console.log(err);
            throw new HealthCheckError('Nats health failed', this.getStatus(key, false));
        }
    }
}