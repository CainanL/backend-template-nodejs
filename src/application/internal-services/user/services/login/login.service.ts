import { Injectable, Logger } from '@nestjs/common';
import { HandlerBase } from 'src/application/common/handle-base';
import { LoginRequest } from './login.request';
import { UserVm } from 'src/application/ViewModels/user/user.vm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { ApiResponse } from 'src/application/common/response/api.response';
import { Token } from 'src/domain/entities/token.entity';
import { TokenService } from 'src/application/common/services/token.service';

@Injectable()
export class LoginService extends HandlerBase<LoginRequest, UserVm> {



    constructor(protected readonly datasource: DataSource, private readonly tokenService: TokenService) {
        super(datasource);
    }

    protected async executeCore({ email, password }: LoginRequest, data?: unknown): Promise<ApiResponse<UserVm>> {
        const user = await this.context(User).findOne({ where: { email, isActive: true }, relations: ['rules', 'policies'] });

        if (!user)
            return ApiResponse.error("E-mail inválido");

        if (!user.passwordMatch(password))
            return ApiResponse.error("senha incorreta");

        const token = this.tokenService.generateAccessToken(user);
        const refreshToken = this.tokenService.generateRefreshToken(user);

        // sempre que o refreshtoken for alterado, o antigo será deletado, isso invalidará o refreshtoken deletado para não poder ser utilizado posteriormente.
        const validatorToken = new Token();
        validatorToken.create(user, token, refreshToken);

        await this.context(Token).save(validatorToken);

        const response = new UserVm(user, token, refreshToken);
        return ApiResponse.success(response);
    }

}
