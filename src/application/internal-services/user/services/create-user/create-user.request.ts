import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Policies } from "src/domain/enums/polices.enum";
import { Rules } from "src/domain/enums/rules.enum";

export class CreateUserRequest {
    @ApiProperty({ example: "cainan@komput.com.br" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '*admin123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "Cainan Luyles" })
     @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        isArray: true,
        enum: Policies,
        example: Object.values(Policies),
        description: "Lista de permissões atribuídas ao usuário"
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Policies, { each: true })
    policies: Policies[];

    @ApiProperty({
        isArray: true,
        enum: Rules,
        example: Object.values(Rules),
        description: "Lista de regras atribuídas ao usuário"
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Rules, { each: true })
    rules: Rules[];
}