import { registerAs } from "@nestjs/config";
import { get } from "env-var";

export const appConfig = registerAs('app', () => ({
    port: get('APP_PORT').required().asPortNumber(),
}));

export const natsConfig = registerAs('nats', () => ({
    host: get('NATS_HOST').required().asString(),
    port: get('NATS_PORT').required().asInt(),
}));