import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EmailController } from './controllers/emailController';
import { ConfigModule} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        //CONFIG MODULE
    ConfigModule.forRoot({
        //load env parameters
        load: [() => ({
          //EMAIL MANAGER
          EMAIL_HOST: process.env.EMAIL_HOST,
          EMAIL_PORT: process.env.EMAIL_PORT,
          EMAIL_SECURE: process.env.EMAIL_SECURE,
          EMAIL_USER: process.env.EMAIL_USER,
          EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
          EMAIL_SENDER: process.env.EMAIL_SENDER,
        })],
        validationSchema: Joi.object({
          EMAIL_HOST: Joi.string().required(),
          EMAIL_PORT: Joi.string().required(),
          EMAIL_SECURE: Joi.string().required(),
          EMAIL_USER: Joi.string().required(),
          EMAIL_PASSWORD: Joi.string().required(),
          EMAIL_SENDER: Joi.string().required(),
        })
      }),
    ],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailManager { }
