import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig, natsConfig, postgresConfig } from "./config";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [
                appConfig,
                natsConfig,
                postgresConfig,
            ],
        }),
    ],
})
export class ConfigurationModule {}