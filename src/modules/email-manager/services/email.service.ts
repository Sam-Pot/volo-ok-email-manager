import { Injectable } from "@nestjs/common";
import * as Mail from 'nodemailer/lib/mailer';
import * as nodeMailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";
import { EmailDto } from "../dtos/email.dto";

@Injectable()
export class EmailService {

    constructor(
        private configService: ConfigService
    ) { }

    /**
     * This method, given an emailDto, send an email.
     * @param emailDto EmailDto
     * 
     */
    async sendEmail(emailDto: EmailDto): Promise<boolean> {
        try {
            let nodemailerTransport: Mail = nodeMailer.createTransport({
                host: this.configService.get('EMAIL_HOST'),
                port: this.configService.get<number>('EMAIL_PORT'),
                secure: this.configService.get<boolean>('EMAIL_SECURE'),
                auth: {
                    user: this.configService.get('EMAIL_USER'),
                    pass: this.configService.get('EMAIL_PASSWORD'),
                },
            });
            let options: Mail.Options = {
                from: this.configService.get('EMAIL_SENDER') + '<' + this.configService.get('EMAIL_USER') + '>',
                to: emailDto.to,
                subject: emailDto.subject,
                text: emailDto.text,
                html: emailDto.html
            };
            const info = await nodemailerTransport.sendMail(options);
            return true;
        } catch (e) {
            return false;
        }
    }
}