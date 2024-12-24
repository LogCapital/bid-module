import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig, natsConfig } from "./config";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [
                appConfig,
                natsConfig,
            ],
        }),
    ],
})
export class ConfigurationModule {}