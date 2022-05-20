import { Cat } from '../cats/entities/cat.entity';
import { Action } from './action.enum';
import { AppAbility } from './casl-ability.factory';
import { IPolicyHandler } from './policyHandler';

export class ReadCatPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Cat);
  }
}
