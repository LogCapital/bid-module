import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
