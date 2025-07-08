import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { ApiResponse } from "src/application/common/response/api.response";
import { Token } from "src/domain/entities/token.entity";
import { DataSource } from "typeorm";

@Injectable()
export class LogoutService extends HandlerBase<null, null> {
    constructor(private readonly datasource: DataSource) {
        super(datasource)
    }

    protected async executeCore(request: null, data?: any): Promise<ApiResponse<null>> {
        this.logger.debug("chegou");
        await this.context(Token).delete({ userId: this.user.id });
        return ApiResponse.success(null);
    }

}