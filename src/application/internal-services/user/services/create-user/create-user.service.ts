import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateUserRequest } from "./create-user.request";
import { DataSource } from "typeorm";
import { User } from "src/domain/entities/user.entity";
import { ApiResponse } from "src/application/common/response/api.response";

@Injectable()
export class CreateUserService extends HandlerBase<CreateUserRequest, null> {

    constructor(private readonly datasource: DataSource) {
        super(datasource);
    }

    protected async executeCore({
        email,
        name,
        password,
        policies,
        rules
    }: CreateUserRequest, data?: any): Promise<ApiResponse<null>> {
       this.logger.debug({ user: this.user });
        const exists = await this.context(User).exists({ where: { email } })
        if (exists)
            return ApiResponse.error<null>("E-mail já cadastrado");

        const user = new User();
        user.create(name, email, password, policies, rules);
        await this.context(User).save(user);

        return ApiResponse.success<null>(null);
    }

}