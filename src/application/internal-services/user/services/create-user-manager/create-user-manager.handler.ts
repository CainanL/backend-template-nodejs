import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { Policies } from "src/domain/enums/polices.enum";
import { Rules } from "src/domain/enums/rules.enum";
import { DataSource } from "typeorm";


@Injectable()
export class CreateUserManagerHandler implements OnApplicationBootstrap {

    constructor(private readonly dataSource: DataSource) { }


    public async onApplicationBootstrap() {
        const userRepo = this.dataSource.getRepository(User);
        
        const email = "admin@komput.com.br";
        const exists = await userRepo.exists({where: { email}});
        if (exists) {
            return;
        }

        let policies: Policies[] = Object.values(Policies);
        let rules: Rules[] = Object.values(Rules);

        const user = new User();
        user.create("Admin", email, "*admin123", policies, rules);

        await userRepo.save(user);
        console.log('Usuário master criado com sucesso!');
    }
}