import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly datasource: DataSource,
        private readonly logger: Logger
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.log(AuthGuard.name);

        const request = context.switchToHttp().getRequest();
        const userId = request.user?.sub || request.user?.id;

        this.logger.debug(String(userId))
        if (!userId) return false;

        let userEntity: User | null;
        if (!request?.userEntity) {
            userEntity = await this.datasource.getRepository(User).findOne({ where: { id: userId }, relations: ['rules', 'policies'] });
            request.userEntity = userEntity;
        }
        else {
            userEntity = request.userEntity as User;
        }
        return !!userEntity;
    }

}