import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailManager } from './modules/email-manager/email-manager.module';
import { AppConstants } from './modules/email-manager/configs/app.constants';

@Module({
  imports: [
    //CONFIG MODULE
    ConfigModule.forRoot({
      //load env parameters
      load: [() => ({
        //MS
        MS_URL: process.env.MS_URL,
        MS_PROTO_PACKAGE: process.env.MS_PROTO_PACKAGE,
      })],
      validationSchema: Joi.object({
        MS_URL: Joi.string().pattern(AppConstants.IP_PORT_REGEX).required(),
        MS_PROTO_PACKAGE: Joi.string().required(),
      })
    }),
    //my modules
    EmailManager
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
