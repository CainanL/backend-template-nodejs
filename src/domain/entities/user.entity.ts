import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import * as bcrypt from "bcrypt";
import { UserRules } from './user-rules.entity';
import { UserPolicies } from './user-policies.entity';
import { Policies } from '../enums/polices.enum';
import { Rules } from '../enums/rules.enum';

@Entity('users')
export class User extends BaseEntity {
	@Column()
	public name: string;

	@Column({ name: 'email', unique: true })
	public email: string;

	@Column({ name: 'password' })
	public password: string;

	@OneToMany(() => UserRules, userRupes => userRupes.user, { cascade: true })
	public rules: UserRules[];

	@OneToMany(() => UserPolicies, userPolicies => userPolicies.user, { cascade: true })
	public policies: UserPolicies[];

	create(name: string, email: string, password: string, policies: Policies[], rules: Rules[]) {
		this.name = name;
		this.email = email;
		this.setPassword(password);

		for (let police of policies) {
			this.addPolice(police);
		}

		for (let rule of rules) {
			this.addRule(rule);
		}
	}

	public addRule(newRule: Rules) {
		if (!this.rules) this.rules = [];
		const ruleExists = this.rules.some(({ rule }) => rule == newRule);
		if (ruleExists) return;
		const rule = new UserRules();
		rule.rule = newRule;
		this.rules.push(rule);
	}

	public removeRule(rule: Rules) {
		this.rules = this.rules.filter(x => x.rule != rule);
	}

	public addPolice(newPolice: Policies) {
		if (!this.policies) this.policies = [];
		const policeExists = this.policies.some(({ police }) => police == newPolice);
		if (policeExists) return;
		const police = new UserPolicies();
		police.police = newPolice;
		this.policies.push(police);
	}

	public removePolice(police: Policies) {
		this.policies = this.policies.filter(x => x.police != police);
	}

	public setPassword(password: string): void {
		this.password = bcrypt.hashSync(password, 10);
	}

	public passwordMatch(password: string): boolean {
		return bcrypt.compareSync(password, this.password);
	}
}