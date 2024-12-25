import { Controller, Get, Inject } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { NatsHealthIndicator } from "./indicators/nats-health.indicator";
import { natsConfig } from "src/config/config";
import { ConfigType } from "@nestjs/config";
import { MessagePattern, NatsOptions, Transport } from "@nestjs/microservices";
import { sendPingOkHealthcheck } from "src/infrastructure/provider.constants";

@Controller('health-check')
export class HealthCheckController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
        private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
        private readonly natsHealthIndicator: NatsHealthIndicator,
        @Inject(natsConfig.KEY)
        private readonly configNats: ConfigType<typeof natsConfig>,
    ) {}

    @Get()
    @HealthCheck()
    checkHealthHttp() {
        return this.healthCheckService.check([
            () => this.typeOrmHealthIndicator.pingCheck('TypeOrm Postgres check'),
            () => this.microserviceHealthIndicator.pingCheck<NatsOptions>('Ping NATS check', {
                transport: Transport.NATS,
                options: [`nats://${this.configNats.host}:${this.configNats.port}`]
            }),
            () => this.natsHealthIndicator.sendMessage('NATS send check', sendPingOkHealthcheck)
        ])
    }

    @Get('ping-ok')
    getPingOk() {
        return {
            status: 'ok',
            responseCode: 200
        }
    }

    @MessagePattern(sendPingOkHealthcheck)
    sendPingOk() {
        return {
            status: 'ok'
        }
    }
}