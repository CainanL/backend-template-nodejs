import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Rules } from "../enums/rules.enum";
import { User } from "./user.entity";

@Entity("userRoles")
export class UserRules extends BaseEntity {
    @Column()
    rule: Rules;

    @ManyToOne(()=> User, user => user.rules, {onDelete: "SET NULL"})
    user: User;
}