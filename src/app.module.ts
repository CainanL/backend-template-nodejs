import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserManagerHandler } from './application/internal-services/user/services/create-user-manager/create-user-manager.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './application/internal-services/user/user.module';
import { RolesGuard } from './api/guards/roles.guard';
import { PoliciesGuard } from './api/guards/policies.guard';
import { JwtAuthGuard } from './api/guards/jwt-auth.guard';
import { OrmConfigService } from './infra/database/config/orm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRootAsync({
      useClass: OrmConfigService,
    }),
    UserModule
  ],
  controllers: [],
  providers: [
    CreateUserManagerHandler,
    OrmConfigService,
    RolesGuard,
    PoliciesGuard,
    JwtAuthGuard,
    Logger
  ],
})
export class AppModule {}
