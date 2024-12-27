import { Controller, UseInterceptors } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { OpenTelemetrySpan } from "src/common/opentelemetry/decorators/opentelemetry-span.decorator";
import { OpenTelemetryInterceptor } from "src/common/opentelemetry/interceptors/opentelemetry.interceptor";
import { CreateBidPayload } from "./payloads/create-bid.payload";
import { ICreateBidResponse } from "./responses/create-bid.response";
import { MainService } from "./main.service";
import { createBid } from "src/infrastructure/provider.constants";

@Controller('main')
export class MainController {
    constructor(
        private readonly mainService: MainService,
    ) {}

    @OpenTelemetrySpan()
    @UseInterceptors(OpenTelemetryInterceptor)
    @MessagePattern(createBid)
    createBid(
        @Payload() payload: CreateBidPayload
    ): Promise<ICreateBidResponse> {
        return this.mainService.createBid(payload);
    }
}