import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailController } from './controllers/emailController';
import { ConfigModule} from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailManager { }
