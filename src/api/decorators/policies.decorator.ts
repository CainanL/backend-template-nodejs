import { SetMetadata } from '@nestjs/common';
import { Policies } from 'src/domain/enums/polices.enum';
export const POLICIES_KEY = 'policies';
export const PoliciesPermissions = (...policies: Policies[]) => SetMetadata(POLICIES_KEY, policies);