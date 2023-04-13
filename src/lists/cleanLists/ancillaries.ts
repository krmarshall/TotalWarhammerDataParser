import CleanListInterface from '../../interfaces/CleanListsInterface';

const ancillaries_tables: CleanListInterface = {
  applies_to: 'delete',
  transferrable: 'delete',
  unique_to_world: 'delete',
  unique_to_faction: 'delete',
  precedence: 'delete',
  start_date: 'delete',
  end_date: 'delete',
  avatar_skill: 'delete',
  avatar_special_ability: 'delete',
  legendary_item: 'delete',
  mp_exclusive: 'delete',
  is_wife_ancillary: 'delete',
  category: 'delete',
  min_starting_age: 'delete',
  max_starting_age: 'delete',
  min_expiry_age: 'delete',
  max_expiry_age: 'delete',
  immortal: 'delete',
  provided_bodyguard_unit: 'delete',
  provided_banner: 'delete',
  uniqueness_score: 'delete',
  turns_before_swap_allowed: 'delete',
  subcategory: 'delete',
  randomly_dropped: 'delete',
  can_be_stolen: 'delete',
  can_be_destroyed: 'delete',

  faction_set: 'delete',
};

export default ancillaries_tables;
