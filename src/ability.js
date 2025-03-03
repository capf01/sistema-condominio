// src/ability.js
import { AbilityBuilder, createAliasResolver, Ability } from '@casl/ability';

const resolveAction = createAliasResolver({
  update: 'edit',
  read: ['view', 'list'],
});

export const defineRulesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('create', 'funcionario');
    can('edit', 'funcionario');
    can('delete', 'funcionario');
  } else if (user.role === 'funcionario') {
    can('read', 'encomenda');
    cannot('create', 'funcionario');
    cannot('edit', 'funcionario');
  }

  return build({ resolveAction });
};

export const buildAbilityFor = (user) => {
  return new Ability(defineRulesFor(user), { resolveAction });
};