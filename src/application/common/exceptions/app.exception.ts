import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/domain/Exceptions/base-exception";

export class AppException extends BaseException {
    constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(message, statusCode)
    }
}