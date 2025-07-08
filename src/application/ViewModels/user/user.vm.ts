import { User } from "src/domain/entities/user.entity";
import { Policies } from "src/domain/enums/polices.enum";
import { Rules } from "src/domain/enums/rules.enum";

export class UserVm {
    public name: string;
    public email: string;
    public token: string;
    public refreshToken: string;
    public policies: Policies[];
    public rules: Rules[]

    constructor({ name, email, policies, rules }: User, token: string, refreshToken: string) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.refreshToken = refreshToken;

        if(!policies) policies = [];
        if(!rules) rules = [];

        this.policies = policies.map(p => p.police);
        this.rules = rules.map(r => r.rule);
    }


}