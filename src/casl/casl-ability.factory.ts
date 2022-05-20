import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Cat } from '../cats/entities/cat.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  mongoQueryMatcher,
} from '@casl/ability';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof Cat | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    console.log(user);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    const a = mongoQueryMatcher<Cat>({
      age: 1,
    });

    cannot(Action.Delete, Cat, { age: { $lte: 1 } });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
