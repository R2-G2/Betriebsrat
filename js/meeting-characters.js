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
    namePrefix: "Herr/Frau"
  },
  
  // Character that shouts a lot
  loudmouth: {
    shoutProbability: 0.5,
    phraseProbability: 0.8,
    participantPhraseIndex: 1,
    nameCategory: "traditional",
    namePrefix: "Herr/Frau"
  },
  
  // Quiet character that rarely speaks
  quiet: {
    shoutProbability: 0.05,
    phraseProbability: 0.3,
    participantPhraseIndex: 2,
    nameCategory: "traditional",
    namePrefix: "Herr/Frau"
  },
  
  // Manager character with specific phrases
  manager: {
    shoutProbability: 0.25,
    phraseProbability: 0.7,
    participantPhraseIndex: 3,
    nameCategory: "traditional",
    namePrefix: "Herr/Frau Dr."
  },
  
  // HR representative with their own phrases
  hr: {
    shoutProbability: 0.15,
    phraseProbability: 0.65,
    participantPhraseIndex: 4,
    nameCategory: "modern",
    namePrefix: "Herr/Frau"
  },
  
  // Finance department representative
  finance: {
    shoutProbability: 0.3,
    phraseProbability: 0.7,
    participantPhraseIndex: 5,
    nameCategory: "traditional",
    namePrefix: "Herr/Frau"
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
    namePrefix: "Herr/Frau"
  },
  
  // Works council secretary
  secretary: {
    shoutProbability: 0.1,
    phraseProbability: 0.8,
    participantPhraseIndex: 8,
    nameCategory: "traditional",
    namePrefix: "Herr/Frau"
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

// Base appearance for characters including color and size
const characterBase = {
  size: 20,
  color: '#4287f5'
};

// Define different character appearances 
const characterAppearances = {
  regular: {
    ...characterBase,
    color: '#4287f5'
  },
  loudmouth: {
    ...characterBase,
    color: '#f54242',
    size: 22
  },
  quiet: {
    ...characterBase,
    color: '#42f5a7',
    size: 18
  },
  manager: {
    ...characterBase,
    color: '#f5a742',
    size: 21
  },
  hr: {
    ...characterBase,
    color: '#f542f2',
    size: 20
  },
  finance: {
    ...characterBase,
    color: '#42f5f5',
    size: 20
  },
  it: {
    ...characterBase,
    color: '#a742f5',
    size: 20
  },
  chair: {
    ...characterBase,
    color: '#f54291',
    size: 23
  },
  secretary: {
    ...characterBase,
    color: '#42aaf5',
    size: 20
  },
  employee: {
    ...characterBase,
    color: '#42f552',
    size: 19
  },
  genZAzubi: {
    ...characterBase,
    color: '#00ffcc', // Teal/turquoise color (popular among Gen Z)
    size: 18
  }
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
  
  // Wenn ein Präfix vorhanden ist, zufällig bestimmen, ob es "Herr" oder "Frau" sein soll
  // und dem Namen voranstellen
  if (preset.namePrefix) {
    const isMale = Math.random() > 0.5;
    const prefix = preset.namePrefix.replace("Herr/Frau", isMale ? "Herr" : "Frau");
    return `${prefix} ${name}`;
  }
  
  return name;
} 