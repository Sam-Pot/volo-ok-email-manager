import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { EmailService } from "../services/email.service";
import { EmailDto } from "../dtos/email.dto";

@Controller()
export class EmailController {

    constructor(private readonly emailService: EmailService) { }

    @GrpcMethod('EmailService')
    async sendEmail(emailDto: EmailDto, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<boolean> {
        return await this.emailService.sendEmail(emailDto);
    }
}