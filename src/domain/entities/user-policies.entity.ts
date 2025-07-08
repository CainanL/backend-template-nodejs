import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Policies } from "../enums/polices.enum";
import { User } from "./user.entity";

@Entity("userPolicies")
export class UserPolicies extends BaseEntity{
    @Column()
    police: Policies;

    @ManyToOne(()=> User, user => user.policies, {onDelete: "SET NULL"})
    user: User;
}