import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { EmailService } from "../services/email.service";
import { EmailDto } from "../dtos/email.dto";
import { EmailResponse } from "../dtos/email-response.dto";
@Controller()
export class EmailController {

    constructor(private readonly emailService: EmailService) { }

    @GrpcMethod('EmailService','sendEmail')
    async sendEmail(emailDto: EmailDto, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<EmailResponse> {
        let response: EmailResponse = await this.emailService.sendEmail(emailDto);
        return response;
    }
}
