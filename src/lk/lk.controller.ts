import { Controller, UseInterceptors } from '@nestjs/common';
import { OpenTelemetrySpan } from 'src/common/opentelemetry/decorators/opentelemetry-span.decorator';
import { OpenTelemetryInterceptor } from 'src/common/opentelemetry/interceptors/opentelemetry.interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { getBid } from 'src/infrastructure/provider.constants';
import { IGetBidResponse } from './responses/get-bid.response';
import { GetBidPayload } from './payloads/get-bid.payload';
import { BidService } from './bid.service';

@Controller('lk')
export class LkController {
  constructor(
    private readonly bidService: BidService
  ) {}

  @OpenTelemetrySpan()
  @UseInterceptors(OpenTelemetryInterceptor)
  @MessagePattern(getBid)
  getBid(
    @Payload() payload: GetBidPayload
  ): Promise<IGetBidResponse> {
    return this.bidService.getBid(payload);
  }
}
