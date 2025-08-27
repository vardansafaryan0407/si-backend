import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/user';
import { PremiumUser } from 'src/modules/user/premium-user';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserModule } from 'src/modules/user/user.module';
import { StripeProvider } from './strtipe.provider';

@Module({
  imports: [SequelizeModule.forFeature([User, PremiumUser]), UserModule],
  providers: [StripeProvider, PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
