import { HttpStatus, Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { RefreshTokenRequest } from "./refresh-token.request";
import { UserVm } from "src/application/ViewModels/user/user.vm";
import { DataSource } from "typeorm";
import { ApiResponse } from "src/application/common/response/api.response";
import { User } from "src/domain/entities/user.entity";
import { Token } from "src/domain/entities/token.entity";
import { AppException } from "src/application/common/exceptions/app.exception";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "src/application/common/services/token.service";

@Injectable()
export class RefreshTokenService extends HandlerBase<RefreshTokenRequest, UserVm> {

    constructor(private readonly datasource: DataSource, private readonly tokenService: TokenService) {
        super(datasource);
    }

    protected async executeCore({ refreshToken }: RefreshTokenRequest, data?: any): Promise<ApiResponse<UserVm>> {
        const isRefreshTokenValid = this.tokenService.isRefreshTokenValid(refreshToken);

        if (!isRefreshTokenValid)
            throw new AppException("Acesso negado.", HttpStatus.UNAUTHORIZED);

        const token = await this.context(Token).findOne({
            where: {
                refreshToken
            }
        });

        if (!token)
            throw new AppException("Acesso negado.", HttpStatus.UNAUTHORIZED);



        const user = await this.context(User).findOne({ where: { id: token.userId } });

        if (!user)
            throw new AppException("Acesso negado.", HttpStatus.UNAUTHORIZED);

        token.token = this.tokenService.generateAccessToken(user);

        const userVm = new UserVm(user, token.token, token.refreshToken);
        return ApiResponse.success(userVm);
    }



}