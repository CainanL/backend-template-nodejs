import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity("tokens")
export class Token extends BaseEntity {
    @Column()
    public token: string;
    
    @Column()
    public refreshToken: string;

    @Column()
    public userId: string;

    public create(user, token, refreshToken){
        this.token = token;
        this.refreshToken = refreshToken;
        this.userId = user.id;
    }
    
}