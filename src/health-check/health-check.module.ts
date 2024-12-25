import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TerminusModule } from "@nestjs/terminus";
import { natsConfig } from "src/config/config";
import { NATS_SERVICE } from "src/infrastructure/provider.constants";
import { HealthCheckController } from "./health-check.controller";
import { NatsHealthIndicator } from "./indicators/nats-health.indicator";

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forRoot(),
        ClientsModule.registerAsync([
            {
                name: NATS_SERVICE,
                useFactory: (config: ConfigType<typeof natsConfig>) => ({
                    transport: Transport.NATS,
                    options: {
                        servers: [`nats://${config.host}:${config.port}`],
                    },
                }),
                inject: [natsConfig.KEY],
            },
        ]),
    ],
    controllers: [HealthCheckController],
    providers: [NatsHealthIndicator],
})
export class HealthCheckModule {}