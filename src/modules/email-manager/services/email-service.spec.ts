import { Test, TestingModule } from "@nestjs/testing";
import { EmailDto } from "../dtos/email.dto";
import { EmailService } from "./email.service";
import { ConfigModule } from "@nestjs/config";
import { EmailController } from "../controllers/emailController";
import { EmailResponse } from "../dtos/email-response.dto";

describe('MailingService', () => {

    let emailService: EmailService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmailService],
            imports: [ConfigModule],
            controllers: [EmailController]
        }).compile();
        emailService = module.get<EmailService>(EmailService);
        process.env.EMAIL_HOST = "smtp-mail.outlook.com";
        process.env.EMAIL_PORT = "587";
        process.env.EMAIL_USER = "UtilityUser@hotmail.com";
        process.env.EMAIL_PASSWORD = "@YouT1liTy_P$w";
        process.env.EMAIL_SENDER = "VoloOk";
    });

    it('should be defined', () => {
        expect(emailService).toBeDefined();
    });
    
    //SEND EMAIL
    it('should send an email', async () => {
        let emailDto: EmailDto = {
            to: "s.potrino@sinapsys.it",
            subject: "comunicazione",
            text: "testo importante da leggere con urgenza ",
            html: "<b>haha, su propriu mastodonticu comunque</b>"
        };
        let response:EmailResponse = await emailService.sendEmail(emailDto);
        expect(response.sent).toBeTruthy();
    })
})