import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FeaturesModule } from './features/features.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.local', '.env'],
		}),
		FeaturesModule,
		AuthModule,
		UsersModule,
		DatabaseModule,
		MailerModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
