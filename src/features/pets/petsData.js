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

export default petsData;
