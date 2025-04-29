// Character presets for the workers' council animation
// Edit this file to customize the character presets

// Liste von Namen für die Meeting-Teilnehmer
const characterNames = {
  // Eher altmodische oder klassische Namen
  traditional: [
    "Helmut", "Gisela", "Gerhard", "Hildegard", "Wolfgang", "Irmgard", 
    "Hans-Dieter", "Ursula", "Klaus-Peter", "Ingrid", "Manfred", "Renate", 
    "Werner", "Hannelore", "Jürgen", "Erika", "Dieter", "Helga", "Günther", "Monika"
  ],
  
  // Moderne oder klischeehafte Namen
  modern: [
    "Kevin", "Chantal", "Justin", "Jacqueline", "Dustin", "Jennifer", 
    "Pascal", "Jessica", "Marvin", "Angelina", "Finn", "Lara", "Luca", 
    "Mia", "Noah", "Emma", "Leon", "Lea", "Luis", "Sophie"
  ],
  
  // Speziell für Gen-Z/Azubi
  genZ: [
    "Finn-Ole", "Luna-Marie", "Tyler", "Zoe", "Jayden", "Maja", 
    "Lennox", "Melody", "Neo", "Mila", "Liam", "Ella", "Jamie", 
    "Chiara", "Lenny", "Kimberley", "Jason", "Leonie", "Milan", "Aurora"
  ]
};

// Character presets with different probabilities for shouting, saying phrases, etc.
const characterPresets = {
  // Regular character with normal speaking patterns
  regular: {
    shoutProbability: 0.2,
    phraseProbability: 0.6,
    participantPhraseIndex: 0,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // Character that shouts a lot
  loudmouth: {
    shoutProbability: 0.5,
    phraseProbability: 0.8,
    participantPhraseIndex: 1,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // Quiet character that rarely speaks
  quiet: {
    shoutProbability: 0.05,
    phraseProbability: 0.3,
    participantPhraseIndex: 2,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // Manager character with specific phrases
  manager: {
    shoutProbability: 0.25,
    phraseProbability: 0.7,
    participantPhraseIndex: 3,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // HR representative with their own phrases
  hr: {
    shoutProbability: 0.15,
    phraseProbability: 0.65,
    participantPhraseIndex: 4,
    nameCategory: "modern",
    namePrefix: null
  },
  
  // Finance department representative
  finance: {
    shoutProbability: 0.3,
    phraseProbability: 0.7,
    participantPhraseIndex: 5,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // IT representative with tech jargon
  it: {
    shoutProbability: 0.2,
    phraseProbability: 0.75,
    participantPhraseIndex: 6,
    nameCategory: "modern",
    namePrefix: null
  },
  
  // Works council chair
  chair: {
    shoutProbability: 0.15,
    phraseProbability: 0.9,
    participantPhraseIndex: 7,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // Works council secretary
  secretary: {
    shoutProbability: 0.1,
    phraseProbability: 0.8,
    participantPhraseIndex: 8,
    nameCategory: "traditional",
    namePrefix: null
  },
  
  // Employee representative
  employee: {
    shoutProbability: 0.25,
    phraseProbability: 0.6,
    participantPhraseIndex: 9,
    nameCategory: "modern",
    namePrefix: null
  },
  
  // Gen-Z apprentice/trainee character
  genZAzubi: {
    shoutProbability: 0.4,
    phraseProbability: 0.8,
    participantPhraseIndex: 1, // Reuse loudmouth index but will prefer Gen-Z phrases
    nameCategory: "genZ",
    namePrefix: null
  }
};

// Define Gen-Z character appearance
const genZAzubiAppearance = {
  size: 55,
  color: '#00ffcc', // Teal/turquoise color
  extras: {
    hatColor: '#9966ff', // Purple beanie/hat
    hasHeadphones: true,
    headphoneColor: '#ff33cc', // Pink headphones
    hasGlasses: Math.random() > 0.6,
    glassesColor: '#333333'
  }
};

// Base appearance for characters
const BASE_APPEARANCE = {
  size: 50,
  color: '#FFD580', // Light orange/peach color
  extras: {}
};

// Define appearances for different character types
const characterAppearances = {
  regular: {
    ...BASE_APPEARANCE
  },
  loudmouth: {
    ...BASE_APPEARANCE,
    size: 55,
    color: '#FF6347' // Tomato color
  },
  quiet: {
    ...BASE_APPEARANCE,
    size: 45,
    color: '#E6E6FA' // Lavender color
  },
  manager: {
    ...BASE_APPEARANCE,
    size: 52,
    color: '#4682B4' // Steel blue
  },
  hr: {
    ...BASE_APPEARANCE,
    size: 48,
    color: '#FFC0CB' // Pink
  },
  finance: {
    ...BASE_APPEARANCE,
    size: 50,
    color: '#90EE90' // Light green
  },
  it: {
    ...BASE_APPEARANCE,
    size: 48,
    color: '#778899' // Light slate gray
  },
  chair: {
    ...BASE_APPEARANCE,
    size: 52,
    color: '#FF8C00' // Dark orange
  },
  secretary: {
    ...BASE_APPEARANCE,
    size: 48,
    color: '#BA55D3' // Medium orchid
  },
  employee: {
    ...BASE_APPEARANCE,
    size: 50,
    color: '#20B2AA' // Light sea green
  },
  genZAzubi: genZAzubiAppearance
};

// Funktion zum Abrufen eines zufälligen Namens für einen Charakter
function getRandomCharacterName(characterType) {
  const preset = characterPresets[characterType];
  if (!preset || !preset.nameCategory) {
    return null;
  }
  
  // Zufälligen Namen aus der entsprechenden Kategorie auswählen
  const nameCategory = preset.nameCategory;
  const nameList = characterNames[nameCategory];
  if (!nameList || nameList.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * nameList.length);
  const name = nameList[randomIndex];
  
  return name;
} 