import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({default: new Date()})
    createdAt: Date;

    @Column({default: true})
    isActive: boolean;

    public enable(){
        this.isActive = true;
    }

    public disable(){
        this.isActive = false;
    }

    constructor(){
        this.id = uuid();
        this.createdAt = new Date();
        this.isActive = true;
    }
}