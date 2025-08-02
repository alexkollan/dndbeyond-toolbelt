// Extra Spells Configuration
// Add your custom spells here organized by level

const extraSpells = {
  'cantrip': [],

  '1st': [
    {
      name: 'Find Familiar',
      url: 'https://www.dndbeyond.com/spells/find-familiar',
      casting_time: '1 hour',
      range: '10 feet',
      attack: '--',
      damage: 'Utility',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    }
  ],

  '2nd': [
    {
      name: 'Web',
      url: 'https://www.dndbeyond.com/spells/web',
      casting_time: '1 action',
      range: '60 feet',
      attack: 'dex save',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Concentration, up to 1 hour'
      },
      source: "Player's Handbook"
    }
  ],

  '3rd': [
    {
      name: 'Counterspell',
      url: 'https://www.dndbeyond.com/spells/counterspell',
      casting_time: '1 reaction',
      range: '60 feet',
      attack: '--',
      damage: 'Control',
      components: {
        verbal: false,
        somatic: true,
        material: false,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Leomund\'s Tiny Hut',
      url: 'https://www.dndbeyond.com/spells/leomunds-tiny-hut',
      casting_time: '1 minute',
      range: '10 feet',
      attack: '--',
      damage: 'Utility',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: '8 hours'
      },
      source: "Player's Handbook"
    }
  ],

  '4th': [
    {
      name: 'Banishment',
      url: 'https://www.dndbeyond.com/spells/banishment',
      casting_time: '1 action',
      range: '60 feet',
      attack: 'cha save',
      damage: 'Banishment',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Concentration, up to 1 minute'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Dimension Door',
      url: 'https://www.dndbeyond.com/spells/dimension-door',
      casting_time: '1 action',
      range: '500 feet',
      attack: '--',
      damage: 'Teleportation',
      components: {
        verbal: true,
        somatic: false,
        material: false,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    }
  ],

  '5th': [
    {
      name: 'Wall of Force',
      url: 'https://www.dndbeyond.com/spells/wall-of-force',
      casting_time: '1 action',
      range: '120 feet',
      attack: '--',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Concentration, up to 10 minutes'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Mass Cure Wounds',
      url: 'https://www.dndbeyond.com/spells/mass-cure-wounds',
      casting_time: '1 action',
      range: '60 feet',
      attack: '--',
      damage: 'Healing',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Animate Objects',
      url: 'https://www.dndbeyond.com/spells/animate-objects',
      casting_time: '1 action',
      range: '120 feet',
      attack: '--',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: 'Concentration, up to 1 minute'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Bigby\'s Hand',
      url: 'https://www.dndbeyond.com/spells/bigbys-hand',
      casting_time: '1 action',
      range: '120 feet',
      attack: '--',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Concentration, up to 1 minute'
      },
      source: "Player's Handbook"
    }
  ],

  '6th': [
    {
      name: 'Heal',
      url: 'https://www.dndbeyond.com/spells/heal',
      casting_time: '1 action',
      range: 'Touch',
      attack: '--',
      damage: 'Healing',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Disintegrate',
      url: 'https://www.dndbeyond.com/spells/disintegrate',
      casting_time: '1 action',
      range: '60 feet',
      attack: 'dex save',
      damage: '10d6+40 force',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Otto\'s Irresistible Dance',
      url: 'https://www.dndbeyond.com/spells/ottos-irresistible-dance',
      casting_time: '1 action',
      range: '30 feet',
      attack: 'wis save',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: false,
        material: false,
        duration: 'Concentration, up to 1 minute'
      },
      source: "Player's Handbook"
    }
  ],

  '7th': [
    {
      name: 'Plane Shift',
      url: 'https://www.dndbeyond.com/spells/plane-shift',
      casting_time: '1 action',
      range: 'Touch',
      attack: 'cha save',
      damage: 'Banishment',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Mordenkainen\'s Magnificent Mansion',
      url: 'https://www.dndbeyond.com/spells/mordenkainens-magnificent-mansion',
      casting_time: '1 minute',
      range: '300 feet',
      attack: '--',
      damage: 'Utility',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: '24 hours'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Simulacrum',
      url: 'https://www.dndbeyond.com/spells/simulacrum',
      casting_time: '12 hours',
      range: 'Touch',
      attack: '--',
      damage: 'Creation',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Until dispelled'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Forcecage',
      url: 'https://www.dndbeyond.com/spells/forcecage',
      casting_time: '1 action',
      range: '100 feet',
      attack: 'cha save',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: '1 hour'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Mirage Arcane',
      url: 'https://www.dndbeyond.com/spells/mirage-arcane',
      casting_time: '10 minutes',
      range: 'Sight',
      attack: '--',
      damage: 'Illusion',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: '10 days'
      },
      source: "Player's Handbook"
    }
  ],

  '8th': [
    {
      name: 'Clone',
      url: 'https://www.dndbeyond.com/spells/clone',
      casting_time: '1 hour',
      range: 'Touch',
      attack: '--',
      damage: 'Creation',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Maze',
      url: 'https://www.dndbeyond.com/spells/maze',
      casting_time: '1 action',
      range: '60 feet',
      attack: '--',
      damage: 'Banishment',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: 'Concentration, up to 10 minutes'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Control Weather',
      url: 'https://www.dndbeyond.com/spells/control-weather',
      casting_time: '10 minutes',
      range: 'Self (5-mile radius)',
      attack: '--',
      damage: 'Control',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Concentration, up to 8 hours'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Glibness',
      url: 'https://www.dndbeyond.com/spells/glibness',
      casting_time: '1 action',
      range: 'Self',
      attack: '--',
      damage: 'Enhancement',
      components: {
        verbal: true,
        somatic: false,
        material: false,
        duration: '1 hour'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Feeblemind',
      url: 'https://www.dndbeyond.com/spells/feeblemind',
      casting_time: '1 action',
      range: '150 feet',
      attack: 'int save',
      damage: 'Debuff',
      components: {
        verbal: true,
        somatic: true,
        material: true,
        duration: 'Instantaneous'
      },
      source: "Player's Handbook"
    },
    {
      name: 'Mind Blank',
      url: 'https://www.dndbeyond.com/spells/mind-blank',
      casting_time: '1 action',
      range: 'Touch',
      attack: '--',
      damage: 'Protection',
      components: {
        verbal: true,
        somatic: true,
        material: false,
        duration: '24 hours'
      },
      source: "Player's Handbook"
    }
  ],

  '9th': []
};

export default extraSpells;
