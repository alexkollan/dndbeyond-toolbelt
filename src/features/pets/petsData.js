// This file contains all pet/summon data for D&D 5e
const petsData = {
  // Summon spells organized by spell name
  'find-familiar': {
    name: 'Find Familiar',
    description: 'Familiar creatures from Find Familiar spell',
    summonLevel: 1, // Spell level required
    options: [
      {
        name: 'Owl',
        size: 'Tiny',
        type: 'Beast',
        ac: 11,
        hp: 1,
        speed: '5 ft., fly 60 ft.',
        stats: { str: 3, dex: 13, con: 8, int: 2, wis: 12, cha: 7 },
        skills: { perception: 3, stealth: 3 },
        senses: 'Darkvision 120 ft., passive Perception 13',
        abilities: [
          {
            name: 'Flyby',
            description: "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
          },
          {
            name: 'Keen Hearing and Sight',
            description: 'The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight.'
          }
        ],
        actions: [
          {
            name: 'Talons',
            type: 'Melee Weapon Attack',
            bonus: '+3',
            reach: '5 ft.',
            damage: '1 slashing damage'
          }
        ]
      },
      {
        name: 'Cat',
        size: 'Tiny',
        type: 'Beast',
        ac: 12,
        hp: 2,
        speed: '40 ft., climb 30 ft.',
        stats: { str: 3, dex: 15, con: 10, int: 3, wis: 12, cha: 7 },
        skills: { perception: 3, stealth: 4 },
        senses: 'Passive Perception 13',
        abilities: [
          {
            name: 'Keen Smell',
            description: 'The cat has advantage on Wisdom (Perception) checks that rely on smell.'
          }
        ],
        actions: [
          {
            name: 'Claws',
            type: 'Melee Weapon Attack',
            bonus: '+0',
            reach: '5 ft.',
            damage: '1 slashing damage'
          }
        ]
      },
      {
        name: 'Raven',
        size: 'Tiny',
        type: 'Beast',
        ac: 12,
        hp: 1,
        speed: '10 ft., fly 50 ft.',
        stats: { str: 2, dex: 14, con: 8, int: 2, wis: 12, cha: 6 },
        skills: { perception: 3 },
        senses: 'Passive Perception 13',
        abilities: [
          {
            name: 'Mimicry',
            description: 'The raven can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering.'
          }
        ],
        actions: [
          {
            name: 'Beak',
            type: 'Melee Weapon Attack',
            bonus: '+4',
            reach: '5 ft.',
            damage: '1 piercing damage'
          }
        ]
      }
    ]
  },
  
  'summon-draconic-spirit': {
    name: 'Summon Draconic Spirit',
    description: 'Draconic spirit from 5th level spell',
    summonLevel: 5,
    scalingLevels: [5, 6, 7, 8, 9], // Spell slot levels
    options: [
      {
        name: 'Draconic Spirit',
        size: 'Large',
        type: 'Dragon',
        baseStats: {
          ac: 14,
          hp: 50, // Base HP at 5th level
          hpPerLevel: 10, // Additional HP per spell level above 5th
          speed: '30 ft., fly 60 ft., swim 30 ft.',
          stats: { str: 19, dex: 14, con: 17, int: 10, wis: 14, cha: 14 },
          damageResistance: 'Chosen damage type',
          conditionImmunity: 'Charmed, frightened, poisoned',
          senses: 'Blindsight 30 ft., darkvision 60 ft., passive Perception 12',
          languages: 'Draconic, understands the languages you speak'
        },
        abilities: [
          {
            name: 'Shared Resistances',
            description: 'When you summon the dragon, choose a damage type: acid, cold, fire, lightning, or poison. The dragon has resistance to that damage type.'
          }
        ],
        actions: [
          {
            name: 'Multiattack',
            description: 'The dragon makes a number of Rend attacks equal to half the spell slot level (rounded down).',
            scaling: true
          },
          {
            name: 'Rend',
            type: 'Melee Weapon Attack',
            bonus: '+7', // Increases with spell level
            reach: '10 ft.',
            damage: '1d6 + 4 + spell level piercing damage',
            scaling: true
          },
          {
            name: 'Breath Weapon (Recharge 5-6)',
            type: 'Area Effect',
            save: 'Dexterity',
            area: '30-foot cone',
            damage: 'Spell level d6 of chosen damage type',
            scaling: true
          }
        ]
      }
    ]
  },
  
  'animate-objects': {
    name: 'Animate Objects',
    description: 'Animated objects from 5th level spell',
    summonLevel: 5,
    options: [
      {
        name: 'Tiny Animated Object',
        size: 'Tiny',
        ac: 18,
        hp: 20,
        speed: '30 ft.',
        stats: { str: 4, dex: 18, con: 10 },
        attackBonus: '+8',
        damage: '1d4 + 4',
        maxCount: 10
      },
      {
        name: 'Small Animated Object',
        size: 'Small',
        ac: 16,
        hp: 25,
        speed: '25 ft.',
        stats: { str: 6, dex: 14, con: 10 },
        attackBonus: '+6',
        damage: '1d8 + 2',
        maxCount: 5
      },
      {
        name: 'Medium Animated Object',
        size: 'Medium',
        ac: 13,
        hp: 40,
        speed: '20 ft.',
        stats: { str: 10, dex: 12, con: 10 },
        attackBonus: '+5',
        damage: '2d6 + 1',
        maxCount: 2
      },
      {
        name: 'Large Animated Object',
        size: 'Large',
        ac: 10,
        hp: 50,
        speed: '15 ft.',
        stats: { str: 14, dex: 10, con: 10 },
        attackBonus: '+6',
        damage: '2d10 + 2',
        maxCount: 1
      }
    ]
  },

  'conjure-animals': {
    name: 'Conjure Animals',
    description: 'Summon fey spirits that take the form of beasts',
    summonLevel: 3,
    scalingLevels: [3, 5, 7, 9],
    options: [
      {
        name: 'Wolf',
        size: 'Medium',
        type: 'Beast',
        ac: 13,
        hp: 11,
        speed: '40 ft.',
        stats: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
        skills: { perception: 3, stealth: 4 },
        senses: 'Passive Perception 13',
        abilities: [
          {
            name: 'Pack Tactics',
            description: 'The wolf has advantage on attack rolls against a creature if at least one of the wolf\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.'
          }
        ],
        actions: [
          {
            name: 'Bite',
            type: 'Melee Weapon Attack',
            bonus: '+4',
            reach: '5 ft.',
            damage: '2d4 + 2 piercing damage',
            additionalEffect: 'Target must succeed on a DC 11 Strength saving throw or be knocked prone'
          }
        ]
      },
      {
        name: 'Giant Wolf Spider',
        size: 'Medium',
        type: 'Beast',
        ac: 13,
        hp: 11,
        speed: '40 ft., climb 40 ft.',
        stats: { str: 12, dex: 16, con: 13, int: 3, wis: 12, cha: 4 },
        skills: { perception: 3, stealth: 7 },
        senses: 'Blindsight 10 ft., darkvision 60 ft., passive Perception 13',
        abilities: [
          {
            name: 'Spider Climb',
            description: 'The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'
          },
          {
            name: 'Web Sense',
            description: 'While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.'
          }
        ],
        actions: [
          {
            name: 'Bite',
            type: 'Melee Weapon Attack',
            bonus: '+5',
            reach: '5 ft.',
            damage: '1d8 + 3 piercing damage',
            additionalEffect: 'Target must make a DC 11 Constitution saving throw, taking 2d8 poison damage on a failed save, or half as much on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour.'
          }
        ]
      }
    ]
  },

  'bigbys-hand': {
    name: "Bigby's Hand",
    description: 'Create a Large hand of shimmering, translucent force',
    summonLevel: 5,
    options: [
      {
        name: "Bigby's Hand",
        size: 'Large',
        type: 'Force Construct',
        ac: 20,
        hp: 'Equal to your hit point maximum',
        speed: '60 ft.',
        stats: { str: 26, dex: 10, con: '-', int: '-', wis: '-', cha: '-' },
        damageImmunity: 'Poison, psychic',
        conditionImmunity: 'All conditions',
        abilities: [
          {
            name: 'Clenched Fist',
            description: 'Melee Spell Attack: +8 to hit, 2d6 + spell ability modifier force damage'
          },
          {
            name: 'Forceful Hand',
            description: 'Push a creature, Strength check vs your spell attack'
          },
          {
            name: 'Grasping Hand',
            description: 'Grapple a creature, Strength (Athletics) check vs your spell attack'
          },
          {
            name: 'Interposing Hand',
            description: 'Provides half cover, disadvantage on attacks through it'
          }
        ]
      }
    ]
  },

  'spiritual-weapon': {
    name: 'Spiritual Weapon',
    description: 'Create a floating spectral weapon',
    summonLevel: 2,
    scalingLevels: [2, 3, 4, 5, 6, 7, 8, 9],
    options: [
      {
        name: 'Spiritual Weapon',
        size: 'Medium',
        type: 'Force Construct',
        ac: '-',
        hp: '-',
        speed: '20 ft. (no opportunity attacks)',
        abilities: [
          {
            name: 'Spectral Weapon',
            description: 'Cannot be targeted or damaged'
          }
        ],
        actions: [
          {
            name: 'Spectral Attack',
            type: 'Melee Spell Attack',
            bonus: 'Spell attack modifier',
            reach: '5 ft.',
            damage: '1d8 + spell ability modifier force damage',
            scaling: true,
            scalingDamage: '+1d8 per 2 spell levels above 2nd'
          }
        ]
      }
    ]
  }
};

// Append to petsData in your file
const extraPets = {
  'conjure-celestial': {
    name: 'Conjure Celestial',
    description: 'Summon a celestial spirit (Cleric 7th). Wish can duplicate this up to 8th-level.',
    summonLevel: 7,
    scalingLevels: [7, 8],
    options: [
      // CR limit: 7th = CR 4, 8th = CR 5 (but Wish can’t hit 9th, so Unicorn CR 5 is off-limits)
      {
        name: 'Couatl (CR 4)',
        size: 'Medium',
        type: 'Celestial',
        ac: 19,
        hp: 97,
        speed: '30 ft., fly 90 ft.',
        stats: { str: 16, dex: 20, con: 17, int: 18, wis: 20, cha: 18 },
        savingThrows: { con: 6, wis: 7, cha: 7 },
        skills: { insight: 7, perception: 7 },
        senses: 'Truesight 120 ft., passive Perception 17',
        languages: 'All, telepathy 120 ft.',
        abilities: [
          { name: 'Magic Resistance', description: 'Advantage on saving throws against spells and other magical effects.' },
          { name: 'Innate Spellcasting', description: 'Includes invisibility, detect thoughts, etc. (per MM). Uses Charisma.' },
          { name: 'Shapeshift', description: 'Can magically polymorph (per MM).' }
        ],
        actions: [
          { name: 'Bite', type: 'Melee Weapon Attack', bonus: '+8', reach: '5 ft.', damage: '1d6 + 3 piercing + 3d6 poison' },
          { name: 'Constrict', type: 'Melee Weapon Attack', bonus: '+6', reach: '10 ft.', damage: '2d6 + 3 bludgeoning; target grappled (escape DC 15), restrained while grappled' }
        ]
      },
      {
        name: 'Pegasus (CR 2)',
        size: 'Large',
        type: 'Celestial',
        ac: 12,
        hp: 59,
        speed: '60 ft., fly 90 ft.',
        stats: { str: 18, dex: 15, con: 16, int: 10, wis: 15, cha: 13 },
        skills: { perception: 6 },
        senses: 'Passive Perception 16',
        languages: 'Understands Celestial, Common, Elvish, Sylvan but can’t speak',
        abilities: [
          { name: 'Keen Sight', description: 'Advantage on Wisdom (Perception) checks that rely on sight.' }
        ],
        actions: [
          { name: 'Hooves', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 4 bludgeoning' }
        ]
      }
    ]
  },

  'conjure-fey': {
    name: 'Conjure Fey',
    description: 'Summon a fey creature (Druid 6th). Wish can duplicate up to 8th-level.',
    summonLevel: 6,
    scalingLevels: [6, 7, 8],
    options: [
      // CR limit: 6th = CR 6, 7th = CR 7, 8th = CR 8 (list includes popular/max-CR picks)
      {
        name: 'Annis Hag (CR 6)',
        size: 'Large',
        type: 'Fey',
        ac: 17,
        hp: 75,
        speed: '40 ft., climb 40 ft.',
        stats: { str: 21, dex: 12, con: 14, int: 13, wis: 14, cha: 14 },
        senses: 'Darkvision 60 ft., passive Perception 12',
        abilities: [
          { name: 'Crushing Hug', description: 'On a grappled target, bonus damage/conditions (per VGtM/MMoM entry).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes three Claw attacks.' },
          { name: 'Claw', type: 'Melee Weapon Attack', bonus: '+8', reach: '5 ft.', damage: '2d6 + 5 slashing' }
        ]
      },
      {
        name: 'Korred (CR 7)',
        size: 'Small',
        type: 'Fey',
        ac: 17,
        hp: 102,
        speed: '30 ft., burrow 20 ft.',
        stats: { str: 19, dex: 14, con: 16, int: 10, wis: 14, cha: 16 },
        senses: 'Darkvision 120 ft., tremorsense 60 ft., passive Perception 12',
        abilities: [
          { name: 'Earth Glide', description: 'Move through nonmagical earth and stone.' },
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' }
        ],
        actions: [
          { name: 'Hair Rope', type: 'Melee Weapon Attack', bonus: '+7', reach: '30 ft.', damage: '1d4 + 4 slashing; grapple on hit (escape DC 15)' },
          { name: 'Greatclub', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d8 + 4 bludgeoning' }
        ]
      },
      {
        name: 'Yeth Hound (CR 4)',
        size: 'Large',
        type: 'Fey',
        ac: 15,
        hp: 51,
        speed: '40 ft., fly 40 ft. (hover)',
        stats: { str: 16, dex: 17, con: 16, int: 5, wis: 12, cha: 7 },
        senses: 'Darkvision 60 ft., passive Perception 11',
        abilities: [
          { name: 'Baleful Baying', description: 'Frighten creatures that can hear it (per VGtM/MMoM entry).' },
          { name: 'Sunlight Banishment', description: 'Vanishes in sunlight (per entry).' }
        ],
        actions: [
          { name: 'Bite', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 3 piercing' }
        ]
      }
    ]
  },

  'conjure-woodland-beings': {
    name: 'Conjure Woodland Beings',
    description: 'Summon fey creatures in groups (Druid 4th). The infamous pixie polymorph combo lives here.',
    summonLevel: 4,
    scalingLevels: [4, 6, 8], // Upcasting increases total number, not CR options
    options: [
      {
        name: 'Pixie (CR 1/4) x8',
        size: 'Tiny',
        type: 'Fey',
        ac: 15,
        hp: 1,
        speed: '10 ft., fly 30 ft.',
        stats: { str: 2, dex: 20, con: 8, int: 10, wis: 14, cha: 15 },
        senses: 'Passive Perception 12',
        abilities: [
          { name: 'Innate Spellcasting', description: 'Includes polymorph, greater invisibility, fly, etc. (per MM). Uses Charisma.' },
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' }
        ],
        actions: [
          { name: 'Shortbow', type: 'Ranged Weapon Attack', bonus: '+7', range: '80/320 ft.', damage: '1d6 + 5 piercing' }
        ],
        maxCount: 8
      }
    ]
  },

  'infernal-calling': {
    name: 'Infernal Calling',
    description: 'Call a devil (XGtE 5th). With Wish you can duplicate up to 8th, so up to CR 8.',
    summonLevel: 5,
    scalingLevels: [5, 6, 7, 8],
    options: [
      // CR limit = spell slot level (5) -> CR 5; each slot above +1 CR (cap CR 8 via Wish)
      {
        name: 'Barbed Devil (CR 5)',
        size: 'Medium',
        type: 'Fiend (Devil)',
        ac: 15,
        hp: 110,
        speed: '30 ft.',
        stats: { str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14 },
        damageResistance: 'Cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons',
        damageImmunity: 'Fire, poison',
        conditionImmunity: 'Poisoned',
        senses: 'Darkvision 120 ft., passive Perception 12',
        languages: 'Infernal, telepathy 120 ft.',
        abilities: [
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' },
          { name: 'Barbed Hide', description: 'Creatures grappling the devil take piercing damage (per MM).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes three attacks: Claw, Claw, Tail.' },
          { name: 'Claw', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 3 slashing' },
          { name: 'Tail', type: 'Melee Weapon Attack', bonus: '+6', reach: '10 ft.', damage: '2d6 + 3 piercing' }
        ]
      },
      {
        name: 'Chain Devil (CR 8)',
        size: 'Medium',
        type: 'Fiend (Devil)',
        ac: 16,
        hp: 85,
        speed: '30 ft.',
        stats: { str: 18, dex: 15, con: 18, int: 11, wis: 12, cha: 14 },
        damageResistance: 'Cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons',
        damageImmunity: 'Fire, poison',
        conditionImmunity: 'Charmed, frightened, poisoned',
        senses: 'Darkvision 120 ft., passive Perception 11',
        languages: 'Infernal, telepathy 120 ft.',
        abilities: [
          { name: 'Devil’s Sight', description: 'Magical darkness doesn’t impede darkvision.' },
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' },
          { name: 'Animate Chains', description: 'Can animate chains to restrain/attack (per MM).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes two Chain attacks.' },
          { name: 'Chain', type: 'Melee Weapon Attack', bonus: '+8', reach: '10 ft.', damage: '2d6 + 4 slashing; grapple and restrain on hit (escape DC 14)' }
        ]
      }
    ]
  },

  'conjure-elemental': {
    name: 'Conjure Elemental',
    description: 'Summon an elemental (Druid/Wizard 5th). Wish can duplicate this up to 8th-level.',
    summonLevel: 5,
    scalingLevels: [5, 6, 7, 8],
    options: [
      // Base CR 5, upcast to CR 6-8. Common “best” picks listed.
      {
        name: 'Air Elemental (CR 5)',
        size: 'Large',
        type: 'Elemental',
        ac: 15,
        hp: 90,
        speed: '0 ft., fly 90 ft. (hover)',
        stats: { str: 14, dex: 20, con: 14, int: 6, wis: 10, cha: 6 },
        damageImmunity: 'Poison',
        conditionImmunity: 'Exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
        senses: 'Darkvision 60 ft., passive Perception 10',
        languages: 'Auran',
        abilities: [
          { name: 'Air Form', description: 'Can move through a space as narrow as 1 inch wide; can enter a hostile creature’s space.' },
          { name: 'Whirlwind (Recharge 4–6)', description: 'Area effect that knocks prone/throws creatures (per MM).' }
        ],
        actions: [
          { name: 'Slam', type: 'Melee Weapon Attack', bonus: '+8', reach: '5 ft.', damage: '2d8 + 5 bludgeoning' }
        ]
      },
      {
        name: 'Earth Elemental (CR 5)',
        size: 'Large',
        type: 'Elemental',
        ac: 17,
        hp: 126,
        speed: '30 ft., burrow 30 ft.',
        stats: { str: 20, dex: 8, con: 20, int: 5, wis: 10, cha: 5 },
        damageResistance: 'Bludgeoning, piercing, slashing from nonmagical attacks',
        damageImmunity: 'Poison',
        conditionImmunity: 'Exhaustion, paralyzed, petrified, poisoned, unconscious',
        senses: 'Darkvision 60 ft., tremorsense 60 ft., passive Perception 10',
        languages: 'Terran',
        abilities: [
          { name: 'Earth Glide', description: 'Move through nonmagical, unworked earth and stone.' }
        ],
        actions: [
          { name: 'Slam', type: 'Melee Weapon Attack', bonus: '+8', reach: '5 ft.', damage: '2d8 + 5 bludgeoning' }
        ]
      },
      {
        name: 'Fire Elemental (CR 5)',
        size: 'Large',
        type: 'Elemental',
        ac: 13,
        hp: 102,
        speed: '50 ft.',
        stats: { str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7 },
        damageImmunity: 'Fire, poison',
        conditionImmunity: 'Exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
        senses: 'Darkvision 60 ft., passive Perception 10',
        languages: 'Ignan',
        abilities: [
          { name: 'Fire Form', description: 'Enter a creature’s space; sets foes on fire on hit/move-through.' }
        ],
        actions: [
          { name: 'Touch', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 3 fire (targets ignite on hit; take ongoing fire damage)' }
        ]
      },
      {
        name: 'Water Elemental (CR 5)',
        size: 'Large',
        type: 'Elemental',
        ac: 14,
        hp: 114,
        speed: '30 ft., swim 90 ft.',
        stats: { str: 18, dex: 14, con: 18, int: 5, wis: 10, cha: 8 },
        damageResistance: 'Acid; bludgeoning, piercing, slashing from nonmagical attacks',
        damageImmunity: 'Poison',
        conditionImmunity: 'Exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
        senses: 'Darkvision 60 ft., passive Perception 10',
        languages: 'Aquan',
        abilities: [
          { name: 'Freeze', description: 'Cold damage partially freezes it (per MM).' },
          { name: 'Whelm (Recharge 4–6)', description: 'Engulf and restrain creatures; deals bludgeoning each turn.' }
        ],
        actions: [
          { name: 'Slam', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d8 + 4 bludgeoning' }
        ]
      },
      {
        name: 'Invisible Stalker (CR 6)',
        size: 'Medium',
        type: 'Elemental',
        ac: 14,
        hp: 104,
        speed: '50 ft., fly 50 ft. (hover)',
        stats: { str: 16, dex: 19, con: 14, int: 10, wis: 15, cha: 11 },
        conditionImmunity: 'Exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
        senses: 'Darkvision 60 ft., passive Perception 15',
        languages: 'Auran, understands Common but doesn’t speak',
        abilities: [
          { name: 'Invisibility', description: 'Invisible while not attacking (per MM behavior).' },
          { name: 'Faultless Tracker', description: 'Knows direction/distance to target it was assigned to track.' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes two Slam attacks.' },
          { name: 'Slam', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 4 bludgeoning' }
        ]
      },
      {
        name: 'Galeb Duhr (CR 6)',
        size: 'Medium',
        type: 'Elemental',
        ac: 16,
        hp: 85,
        speed: '15 ft.',
        stats: { str: 20, dex: 14, con: 20, int: 11, wis: 12, cha: 11 },
        damageResistance: 'Bludgeoning, piercing, slashing from nonmagical attacks',
        conditionImmunity: 'Petrified, poisoned',
        senses: 'Darkvision 60 ft., tremorsense 60 ft., passive Perception 11',
        languages: 'Terran',
        abilities: [
          { name: 'False Appearance', description: 'Indistinguishable from a boulder while motionless.' },
          { name: 'Animate Boulders (1/day)', description: 'Animates two boulders (per MM).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes two Slam attacks.' },
          { name: 'Slam', type: 'Melee Weapon Attack', bonus: '+8', reach: '5 ft.', damage: '2d6 + 5 bludgeoning' }
        ]
      }
    ]
  },

  'summon-greater-demon': {
    name: 'Summon Greater Demon',
    description: 'Summon a demon (XGtE 4th). With Wish you can duplicate up to 8th-level (cap CR 9).',
    summonLevel: 4,
    scalingLevels: [4, 5, 6, 7, 8],
    options: [
      // CR limit: 4th = CR 5; each slot above +1 CR; Wish cap -> CR 9
      {
        name: 'Barlgura (CR 5)',
        size: 'Large',
        type: 'Fiend (Demon)',
        ac: 15,
        hp: 68,
        speed: '40 ft., climb 40 ft.',
        stats: { str: 18, dex: 15, con: 16, int: 7, wis: 14, cha: 9 },
        senses: 'Darkvision 60 ft., passive Perception 12',
        languages: 'Abyssal',
        abilities: [
          { name: 'Reckless', description: 'Gains advantage on melee, but attacks against it have advantage until next turn.' },
          { name: 'Spellcasting', description: 'Disguise self and invisibility (per MM).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes three attacks: Bite and two Fists.' },
          { name: 'Bite', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d6 + 4 piercing' },
          { name: 'Fist', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d8 + 4 bludgeoning' }
        ]
      },
      {
        name: 'Vrock (CR 6)',
        size: 'Large',
        type: 'Fiend (Demon)',
        ac: 15,
        hp: 104,
        speed: '40 ft., fly 60 ft.',
        stats: { str: 17, dex: 15, con: 18, int: 8, wis: 13, cha: 8 },
        senses: 'Darkvision 120 ft., passive Perception 11',
        languages: 'Abyssal, telepathy 120 ft.',
        abilities: [
          { name: 'Spore Cloud (Recharge 6)', description: 'Poison spores (per MM).'},
          { name: 'Stunning Screech (1/Day)', description: 'Stuns nearby creatures (per MM).'}
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes two attacks: Beak and Talons.' },
          { name: 'Beak', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d6 + 3 piercing' },
          { name: 'Talons', type: 'Melee Weapon Attack', bonus: '+6', reach: '5 ft.', damage: '2d10 + 3 slashing' }
        ]
      },
      {
        name: 'Hezrou (CR 8)',
        size: 'Large',
        type: 'Fiend (Demon)',
        ac: 16,
        hp: 136,
        speed: '30 ft.',
        stats: { str: 19, dex: 17, con: 20, int: 5, wis: 12, cha: 13 },
        senses: 'Darkvision 120 ft., passive Perception 11',
        languages: 'Abyssal, telepathy 120 ft.',
        abilities: [
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' },
          { name: 'Stench', description: 'Creatures starting turn in aura must save or be poisoned (per MM).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes three attacks: Bite and two Claws.' },
          { name: 'Bite', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d10 + 4 piercing' },
          { name: 'Claw', type: 'Melee Weapon Attack', bonus: '+7', reach: '5 ft.', damage: '2d6 + 4 slashing' }
        ]
      },
      {
        name: 'Glabrezu (CR 9)',
        size: 'Large',
        type: 'Fiend (Demon)',
        ac: 17,
        hp: 157,
        speed: '40 ft.',
        stats: { str: 20, dex: 15, con: 21, int: 19, wis: 17, cha: 16 },
        senses: 'Truesight 120 ft., passive Perception 13',
        languages: 'Abyssal, telepathy 120 ft.',
        abilities: [
          { name: 'Magic Resistance', description: 'Advantage on saves vs. spells and magical effects.' },
          { name: 'Innate Spellcasting', description: 'Includes darkness, dispel magic, power word stun (per MM limits).' }
        ],
        actions: [
          { name: 'Multiattack', description: 'Makes two Pincer attacks and two Fist attacks.' },
          { name: 'Pincer', type: 'Melee Weapon Attack', bonus: '+9', reach: '10 ft.', damage: '2d10 + 5 bludgeoning; grapple on hit (escape DC 15)' },
          { name: 'Fist', type: 'Melee Weapon Attack', bonus: '+9', reach: '5 ft.', damage: '2d4 + 5 bludgeoning' }
        ]
      }
    ]
  }
};

// Merge into your existing petsData
Object.assign(petsData, extraPets);
export default petsData;

