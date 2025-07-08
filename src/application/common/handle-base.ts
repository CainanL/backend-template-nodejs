import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { BaseException } from "src/domain/Exceptions/base-exception";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ApiResponse } from "./response/api.response";
import { User } from "src/domain/entities/user.entity";

export interface IHandlerBase<TRequest, TResponse> {
    execute(request: TRequest, data?: unknown): Promise<ApiResponse<TResponse>>;
}

@Injectable()
export abstract class HandlerBase<TRequest, TResponse> implements IHandlerBase<TRequest, TResponse> {

    protected readonly logger: Logger;
    protected readonly dataSource: DataSource;
    private _user: User;
    protected get user(): User { 
        if(!this._user) throw new BaseException("user não possui valor!", HttpStatus.INTERNAL_SERVER_ERROR);
        return this._user; }

    constructor(dataSource: DataSource, logger: Logger = new Logger(HandlerBase.name)) {
        this.logger = logger;
        this.dataSource = dataSource;
    }

    protected context<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.dataSource.getRepository(entity);
    }

    protected abstract executeCore(request: TRequest, data?: any): Promise<ApiResponse<TResponse>>;

    public async execute(request: TRequest, data?: unknown | any): Promise<ApiResponse<TResponse>> {
        try {
            if(data?.req?.userEntity) this._user = data.req.userEntity;
            return await this.executeCore(request, data);
        } catch (error) {
            this.logger.error('Error during handler execution:', error);

            // Converte BaseException em HttpException
            if (error instanceof BaseException) {
                throw error.toHttpException();
            }
            // Para erros genéricos, lança uma HttpException 500
            throw new HttpException(
                error instanceof Error ? error.message : 'Erro interno do servidor',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}