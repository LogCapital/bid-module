import { Controller, UseInterceptors } from '@nestjs/common';
import { MainService } from './main.service';
import { OpenTelemetrySpan } from 'src/common/opentelemetry/decorators/opentelemetry-span.decorator';
import { OpenTelemetryInterceptor } from 'src/common/opentelemetry/interceptors/opentelemetry.interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { getBid } from 'src/infrastructure/provider.constants';
import { IGetBidResponse } from './responses/get-bid.response';
import { GetBidPayload } from './payloads/get-bid.payload';

@Controller('main')
export class MainController {
  constructor(
    private readonly mainService: MainService
  ) {}

  @OpenTelemetrySpan()
  @UseInterceptors(OpenTelemetryInterceptor)
  @MessagePattern(getBid)
  getBid(
    @Payload() payload: GetBidPayload
  ): Promise<IGetBidResponse> {
    return this.mainService.getBid(payload);
  }
}
