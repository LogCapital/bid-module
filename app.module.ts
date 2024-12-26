import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { postgresConfig } from 'src/config/config';
import { HealthCheckModule } from 'src/health-check/health-check.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof postgresConfig>) => ({
        type: 'postgres',
        host: config.server,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        synchronize: true,
        migrationsRun: true,
        requestTimeout: 30000,
      }),
      inject: [postgresConfig.KEY],
    }),
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
