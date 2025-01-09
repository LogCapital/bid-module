import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from 'src/config/config';
import { ConfigurationModule } from 'src/config/configuration.module';
import { Bid } from 'src/domain/typeorm/bid.entity';
import { Contract } from 'src/domain/typeorm/contract.entity';
import { UserInfo } from 'src/domain/typeorm/user-info.entity';
import { LkModule } from 'src/lk/lk.module';

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
        entities: [Bid, Contract, UserInfo],
      }),
    }),
    LkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
