import { Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "src/api/controllers/user.controller";
import { LoginService } from "./services/login/login.service";
import { CreateUserService } from "./services/create-user/create-user.service";
import { JwtStrategy } from "./estrategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { TokenService } from "src/application/common/services/token.service";
import { RefreshTokenService } from "./services/refresh-token/refresh-token.service";
import { LogoutService } from "./services/logout/logout.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "secret_key",
            signOptions: { expiresIn: '15m' },
        }),
    ],
    providers: [
        JwtStrategy,
        LoginService,
        CreateUserService,
        Logger,
        TokenService,
        RefreshTokenService,
        LogoutService
    ],
    exports: [JwtModule],
    controllers: [UserController]
})
export class UserModule {

}