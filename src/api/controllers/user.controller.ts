import { Controller, Post, Body, HttpCode, UseGuards, Req, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginRequest } from 'src/application/internal-services/user/services/login/login.request';
import { LoginService } from 'src/application/internal-services/user/services/login/login.service';
import { RolesPermissions } from '../decorators/roles.decorator';
import { PoliciesPermissions } from '../decorators/policies.decorator';
import { CreateUserRequest } from 'src/application/internal-services/user/services/create-user/create-user.request';
import { CreateUserService } from 'src/application/internal-services/user/services/create-user/create-user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PoliciesGuard } from '../guards/policies.guard';
import { Rules } from 'src/domain/enums/rules.enum';
import { Policies } from 'src/domain/enums/polices.enum';
import { RefreshTokenRequest } from 'src/application/internal-services/user/services/refresh-token/refresh-token.request';
import { RefreshTokenService } from 'src/application/internal-services/user/services/refresh-token/refresh-token.service';
import { LogoutService } from 'src/application/internal-services/user/services/logout/logout.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly logger: Logger,
    private readonly loginService: LoginService,
    private readonly createUserService: CreateUserService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logoutService: LogoutService
  ) { }

  @Post("login")
  @HttpCode(200)
  @ApiBody({ type: LoginRequest })
  @ApiResponse({ status: 200, description: 'Login efetuado com sucesso.' })
  async loginAsync(@Body() body: LoginRequest) {
    return await this.loginService.execute(body);
  }

  @Post("create-user")
  @UseGuards(JwtAuthGuard, RolesGuard, PoliciesGuard)
  @RolesPermissions(Rules.ADMIN)
  @PoliciesPermissions(Policies.CAN_CREATE)
  @ApiBody({ type: CreateUserRequest })
  async createUserAsync(@Req() request, @Body() body: CreateUserRequest) {
    return await this.createUserService.execute(body, { req: request });
  }

  @Post("refresh-token")
  @ApiBody({ type: RefreshTokenRequest })
  async refreshTokenAsync(@Body() body: RefreshTokenRequest) {
    return await this.refreshTokenService.execute(body);
  }

  @Post("logout")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AuthGuard)
  async logoutAsync(@Req() request) {
    this.logger.debug("Entrou");
    return await this.logoutService.execute(null, { req: request });
  }
}
