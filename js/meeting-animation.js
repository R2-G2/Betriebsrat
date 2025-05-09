// Meeting Animation using p5.js
// Creates a comic-style animation of a workers' council meeting

// Import phrases from meeting-phrases.js
// Nur Referenzen auf die Phrasen, die bereits in meeting-phrases.js definiert wurden

// Versuche, die Phrasen zu laden, wenn das Skript im Browser ausgeführt wird
document.addEventListener('DOMContentLoaded', function() {
  // Wir stellen sicher, dass die neue meetingPhrases-Struktur geladen ist
  if (typeof window.meetingPhrases === 'undefined') {
    console.warn('meetingPhrases ist nicht definiert');
  }
});

// Global variables
let participants = [];
let table;
let chairs = [];
let speechBubbles = [];
let tableDecorations = []; // Added table decorations array
let waitress = null; // Waitress character
let lastConsumptionTime = 0; // Track last time an item was consumed
let lastRefillTime = 0; // Track last time waitress refilled
let chatMessages = []; // Stores chat messages for history
let chatMessagesElement = null; // DOM element for chat history
// meetingTopics and participantPhrases are loaded from external JS files

// Config constants
const ROOM_COLOR = "#E6E6FA";
const TABLE_COLOR = "#8B4513";
const CHAIR_COLOR = "#A0522D";
const PARTICIPANT_COLORS = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFFFE0", "#D8BFD8", "#FFA07A", "#87CEEB", "#98FB98"];
const PARTICIPANT_COUNT = 10;
const SPEECH_BUBBLE_DURATION = 2000; // milliseconds - reduced from 3000 to 2000
const SPEECH_CHANCE = 0.03; // probability per frame that a participant speaks - increased from 0.01 to 0.03
const NEW_TOPIC_HIGHLIGHT_DURATION = 3500; // duration to highlight new topics - reduced from 5000 to 3500
const SHOUTING_CHANCE = 0.4; // probability that a speech will be shouting - increased from 0.35 to 0.4
const HEATED_DISCUSSION_CHANCE = 0.15; // chance that a shouting will trigger heated discussion - increased from 0.05 to 0.15
const HEATED_DISCUSSION_DURATION = 7000; // duration of heated discussion in ms - reduced from 10000 to 7000
const CONSUMPTION_CHANCE = 0.001; // Chance a participant consumes something
const KOKS_CONSUMPTION_CHANCE = 0.003; // Higher chance for Koks consumption
const REFILL_DURATION = 3000; // How long the waitress stays to refill
const WAITRESS_INTERVAL = 15000; // Minimum time between waitress appearances
const KOKS_REFILL_INTERVAL = 8000; // Shorter interval for Koks refills only

// State variables
let isHeatedDiscussion = false;
let heatedDiscussionEndTime = 0;
let isDiscussionActive = true; // Variable to control discussion
let debateIntensity = 0; // Intensität der aktuellen Debatte (0.0 bis 1.0)

// Main p5.js setup function
function setup() {
  // Create canvas inside the container div
  let container = document.getElementById('meeting-animation');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('meeting-animation');
  
  // Create meeting table
  let tableWidth = width * 0.6;
  let tableHeight = height * 0.4;
  table = {
    x: width / 2,
    y: height / 2,
    width: tableWidth,
    height: tableHeight
  };
  
  // Create chairs around the table
  createChairs();
  
  // Create participants sitting on chairs
  createParticipants();
  
  // Create table decorations
  createTableDecorations();
  
  // Initialize waitress (off-screen)
  createWaitress();
  
  // Set frame rate
  frameRate(30);
  
  // Listen for new topic events
  if (typeof document !== 'undefined' && typeof TOPIC_ADDED_EVENT !== 'undefined') {
    document.addEventListener(TOPIC_ADDED_EVENT, handleNewTopic);
  }
  
  // Initialisiere das DOM-Element für den Chat-Verlauf
  chatMessagesElement = document.getElementById('chat-messages');
  
  // Initial setup of chat display
  setTimeout(updateChatDisplay, 500); // Small delay to ensure DOM is ready
  
  // Force a reset after a delay to ensure size changes are applied
  setTimeout(resetAnimation, 1000);
}

// Create chairs positioned around the meeting table
function createChairs() {
  // Top side of table
  for (let i = 0; i < 3; i++) {
    let x = table.x - table.width * 0.3 + i * table.width * 0.3;
    let y = table.y - table.height * 0.7;
    chairs.push({ x, y, width: 70, height: 70 });
  }
  
  // Bottom side of table
  for (let i = 0; i < 3; i++) {
    let x = table.x - table.width * 0.3 + i * table.width * 0.3;
    let y = table.y + table.height * 0.7;
    chairs.push({ x, y, width: 70, height: 70 });
  }
  
  // Left side of table
  for (let i = 0; i < 2; i++) {
    let x = table.x - table.width * 0.7;
    let y = table.y - table.height * 0.2 + i * table.height * 0.4;
    chairs.push({ x, y, width: 70, height: 70 });
  }
  
  // Right side of table
  for (let i = 0; i < 2; i++) {
    let x = table.x + table.width * 0.7;
    let y = table.y - table.height * 0.2 + i * table.height * 0.4;
    chairs.push({ x, y, width: 70, height: 70 });
  }
}

// Create participants and position them on chairs
function createParticipants() {
  // Define available character types
  const availableTypes = Object.keys(characterPresets);
  
  // Make sure genZAzubi appears at least twice
  const requiredTypes = ['genZAzubi', 'genZAzubi'];
  
  // Increase probability for genZAzubi (35%)
  const weightedTypes = [...availableTypes];
  for (let i = 0; i < Math.floor(availableTypes.length * 0.35); i++) {
    weightedTypes.push('genZAzubi');
  }
  
  for (let i = 0; i < PARTICIPANT_COUNT; i++) {
    if (i >= chairs.length) break; // Don't create more participants than chairs
    
    let chair = chairs[i];
    let colorIndex = i % PARTICIPANT_COLORS.length;
    
    // Select a character type
    let type;
    if (i < requiredTypes.length) {
      // Use one of the required types
      type = requiredTypes[i];
    } else {
      // Choose a random type from the weighted list
      type = weightedTypes[Math.floor(Math.random() * weightedTypes.length)];
    }
    
    // Generate a name for this participant
    const characterName = getRandomCharacterName(type);
    
    // Get appearance settings for this character type
    const appearance = characterAppearances[type] || characterAppearances.regular;
    
    participants.push({
      x: chair.x,
      y: chair.y,
      baseX: chair.x,
      baseY: chair.y,
      size: appearance.size || 90, // Dramatically increased from 60 to 90
      color: appearance.color || PARTICIPANT_COLORS[colorIndex],
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      lastSpoke: 0,
      headBobAmount: random(0.2, 0.5),
      isAggressive: random() < 0.3, // Some participants are more likely to shout
      faceColor: appearance.color || PARTICIPANT_COLORS[colorIndex], // Initial face color (changes when shouting)
      type: type, // Add character type to participant
      name: characterName, // Store name directly with participant
      extras: appearance.extras || {} // Add any extra appearance elements
    });
  }
}

// Create waitress character
function createWaitress() {
  waitress = {
    x: -100, // Start off-screen
    y: height / 2,
    targetX: -100,
    targetY: height / 2,
    size: 40,
    color: "#FF5733", // Attractive appearance
    hairColor: "#8B4513", // Brown hair
    speed: 3,
    isVisible: false,
    refillTarget: null,
    refillStartTime: 0,
    tray: {
      items: []
    }
  };
}

// Create table decorations - drinks, fruit, and "koks" (cola)
function createTableDecorations() {
  tableDecorations = [];
  
  // Create a grid system to prevent overlapping
  const gridSize = 40; // Minimum distance between objects
  const usedPositions = []; // Keep track of used positions
  
  // Helper function to check if a position is too close to existing items
  function isPositionFree(x, y, minDistance) {
    for (let pos of usedPositions) {
      const distance = sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      if (distance < minDistance) {
        return false;
      }
    }
    return true;
  }
  
  // Helper to get a free position within a region
  function getFreePosition(centerX, centerY, regionWidth, regionHeight, minDistance) {
    let x, y;
    let attempts = 0;
    const maxAttempts = 20;
    
    do {
      x = centerX + random(-regionWidth/2, regionWidth/2);
      y = centerY + random(-regionHeight/2, regionHeight/2);
      attempts++;
    } while (!isPositionFree(x, y, minDistance) && attempts < maxAttempts);
    
    // If we couldn't find a free spot after many attempts, 
    // slightly adjust an existing position as last resort
    if (attempts >= maxAttempts) {
      x += random(-10, 10);
      y += random(-10, 10);
    }
    
    // Mark this position as used
    usedPositions.push({x, y});
    return {x, y};
  }
  
  // Create water bottles - distribute them evenly along the top edge
  const waterSpacing = table.width * 0.6 / 5;
  for (let i = 0; i < 5; i++) {
    const baseX = table.x - table.width * 0.3 + i * waterSpacing;
    const baseY = table.y - table.height * 0.2;
    
    // Get a position near the base position that doesn't overlap
    const pos = getFreePosition(baseX, baseY, waterSpacing * 0.8, 20, gridSize * 0.7);
    
    tableDecorations.push({
      type: 'water',
      x: pos.x,
      y: pos.y,
      width: 15,
      height: 30,
      color: '#D6EAF8', // Light blue for water
      rotation: random(-0.1, 0.1),
      consumed: false, // Consumption state
      consumptionLevel: 1.0 // Full
    });
  }
  
  // Create fruit bowl - center of table
  const fruitBowlPos = getFreePosition(table.x, table.y, 40, 40, gridSize);
  tableDecorations.push({
    type: 'fruitBowl',
    x: fruitBowlPos.x,
    y: fruitBowlPos.y,
    radius: 40,
    color: '#E59866', // Brown for bowl
    fruits: [],
    consumed: false,
    consumptionLevel: 1.0
  });
  
  // Add fruits to the bowl
  const fruitColors = ['#FF6347', '#FFD700', '#228B22', '#FF4500']; // Red, yellow, green, orange
  for (let i = 0; i < 8; i++) {
    tableDecorations[tableDecorations.length - 1].fruits.push({
      x: random(-20, 20),
      y: random(-20, 20),
      radius: random(8, 12),
      color: fruitColors[floor(random(fruitColors.length))]
    });
  }
  
  // Create cola cans - distribute them along the bottom
  const colaBasePositions = [
    { x: table.x - table.width * 0.25, y: table.y + table.height * 0.15 },
    { x: table.x + table.width * 0.25, y: table.y + table.height * 0.15 },
    { x: table.x, y: table.y - table.height * 0.2 }
  ];
  
  for (let basePos of colaBasePositions) {
    const pos = getFreePosition(basePos.x, basePos.y, 40, 30, gridSize * 0.6);
    tableDecorations.push({
      type: 'cola',
      x: pos.x,
      y: pos.y,
      width: 18,
      height: 25,
      color: '#E74C3C', // Red for cola cans
      rotation: random(-0.2, 0.2),
      consumed: false,
      consumptionLevel: 1.0
    });
  }
  
  // Create coffee cups - distribute them evenly
  const coffeeBasePositions = [
    { x: table.x - table.width * 0.3, y: table.y + table.height * 0.1 },
    { x: table.x, y: table.y + table.height * 0.1 },
    { x: table.x + table.width * 0.3, y: table.y + table.height * 0.1 }
  ];
  
  for (let basePos of coffeeBasePositions) {
    const pos = getFreePosition(basePos.x, basePos.y, 40, 30, gridSize * 0.6);
    tableDecorations.push({
      type: 'coffee',
      x: pos.x,
      y: pos.y,
      radius: 12,
      color: '#784212', // Brown for coffee
      steamPhase: random(TWO_PI),
      consumed: false,
      consumptionLevel: 1.0
    });
  }
  
  // Create multiple "Koks" (white lines) spots around the table with better distribution
  const koksBasePositions = [
    { x: table.x + table.width * 0.2, y: table.y - table.height * 0.1 }, // Top right
    { x: table.x - table.width * 0.2, y: table.y - table.height * 0.1 }, // Top left
    { x: table.x, y: table.y + table.height * 0.15 },                    // Bottom center
    { x: table.x + table.width * 0.3, y: table.y + table.height * 0.1 }, // Bottom right
    { x: table.x - table.width * 0.3, y: table.y + table.height * 0.1 }  // Bottom left
  ];
  
  // Create multiple Koks locations around the table
  for (let basePos of koksBasePositions) {
    const pos = getFreePosition(basePos.x, basePos.y, 40, 30, gridSize * 0.8);
    let koksItem = {
      type: 'koks',
      x: pos.x,
      y: pos.y,
      lines: [],
      consumed: false,
      consumptionLevel: 1.0,
      priority: random() < 0.3 // Some Koks piles are higher priority (premium quality)
    };
    
    // Add variable number of lines per spot (2-4)
    const lineCount = floor(random(2, 5));
    for (let i = 0; i < lineCount; i++) {
      koksItem.lines.push({
        length: random(15, 25),
        angle: random(-0.15, 0.15),
        offset: i * 7
      });
    }
    
    tableDecorations.push(koksItem);
  }
}

// Main p5.js draw function - called every frame
function draw() {
  // Draw room
  background(ROOM_COLOR);
  
  // Draw table
  fill(TABLE_COLOR);
  rectMode(CENTER);
  rect(table.x, table.y, table.width, table.height, 10);
  
  // Draw table decorations
  drawTableDecorations();
  
  // Draw chairs
  fill(CHAIR_COLOR);
  for (let chair of chairs) {
    rect(chair.x, chair.y, chair.width, chair.height, 5);
  }
  
  // Log participant sizes for debugging
  if (frameCount % 60 === 0 && participants.length > 0) {
    console.log("Participant sizes:", participants.map(p => p.size));
  }
  
  // Check if heated discussion should end
  if (isHeatedDiscussion && millis() > heatedDiscussionEndTime) {
    isHeatedDiscussion = false;
    // Reset participant face colors
    participants.forEach(p => {
      p.faceColor = p.color;
    });
  }
  
  // Allmählich die Debatte-Intensität normalisieren, wenn keine hitzige Debatte aktiv ist
  if (!isHeatedDiscussion && debateIntensity > 0) {
    debateIntensity = max(0, debateIntensity - 0.005);
  }
  
  // Update and draw participants
  updateParticipants();
  
  // Update and draw waitress if visible
  if (waitress.isVisible) {
    updateWaitress();
    drawWaitress();
  } else {
    // Check if any Koks needs quick refill (priority refill)
    if (millis() - lastRefillTime > KOKS_REFILL_INTERVAL) {
      checkForKoksRefill();
    }
    // Regular refill check for any item
    else if (millis() - lastRefillTime > WAITRESS_INTERVAL) {
      checkForRefill();
    }
  }
  
  // Update and draw speech bubbles
  updateSpeechBubbles();
}

// Update and draw participants
function updateParticipants() {
  for (let i = 0; i < participants.length; i++) {
    updateParticipant(participants[i], i);
    drawParticipant(participants[i]);
    
    // Random chance for a participant to speak
    if (random() < (isHeatedDiscussion ? SPEECH_CHANCE * 3 : SPEECH_CHANCE) && 
        millis() - participants[i].lastSpoke > SPEECH_BUBBLE_DURATION * 0.8) {
      createSpeechBubble(participants[i]);
      participants[i].lastSpoke = millis();
    }
    
    // Random chance to consume something
    // Special higher chance for Koks consumption
    if (random() < KOKS_CONSUMPTION_CHANCE && millis() - lastConsumptionTime > 2000) {
      // Try to consume Koks specifically
      consumeSpecificItem(i, 'koks');
    } else if (random() < CONSUMPTION_CHANCE && millis() - lastConsumptionTime > 5000) {
      // Regular consumption of any item
      consumeRandomItem(i);
    }
  }
}

// Function to specifically consume an item of a certain type
function consumeSpecificItem(participantIndex, itemType) {
  // Find items of the specified type that can be consumed
  let consumableItems = tableDecorations.filter(item => 
    item.type === itemType && !item.consumed && item.consumptionLevel > 0.2
  );
  
  if (consumableItems.length === 0) return false;
  
  // Select a random item of this type
  let selectedItem = consumableItems[floor(random(consumableItems.length))];
  
  // Reduce consumption level
  if (itemType === 'koks') {
    selectedItem.consumptionLevel -= random(0.3, 0.9); // Consumes more Koks at once
  } else {
    selectedItem.consumptionLevel -= random(0.3, 0.7);
  }
  
  if (selectedItem.consumptionLevel <= 0.2) {
    selectedItem.consumed = true;
  }
  
  // Update last consumption time
  lastConsumptionTime = millis();
  
  // Create a speech bubble for the participant mentioning the consumption
  const p = participants[participantIndex];
  const consumptionPhrases = {
    'water': ['Ich brauche Wasser.', 'Erfrischend!', 'Ah, das tut gut.'],
    'fruitBowl': ['Etwas Obst gefällig?', 'Vitamine!', 'Sehr lecker.'],
    'cola': ['Eine Cola zur Motivation.', 'Koffein für den Kopf!', 'Zuckerschub.'],
    'coffee': ['Ohne Kaffee geht nichts.', 'Das weckt mich auf.', 'Noch ein Schluck Kaffee.'],
    'koks': ['Das bringt mich in Schwung!', 'Jetzt kann ich klar denken!', 'Das gibt mir Energie!', 'Kommt noch jemand?', 'Boah, das ist gut!', 'Mehr davon!', 'Arbeiten wird plötzlich Spaß machen!', 'Jetzt bin ich wach!']
  };
  
  const phrases = consumptionPhrases[selectedItem.type] || ['Mmm, lecker.'];
  const text = phrases[floor(random(phrases.length))];
  
  // Add consumption speech bubble
  speechBubbles.push({
    participantIndex,
    x: p.x,
    y: p.y - p.size - 30,
    content: text,
    createdAt: millis(),
    duration: SPEECH_BUBBLE_DURATION * 0.7, // Shorter duration
    isShouting: selectedItem.type === 'koks', // Shout when consuming Koks
    isNewTopic: false
  });
  
  // Add to chat history
  addMessageToChat(text, participantIndex, selectedItem.type === 'koks', false);
  
  // Mark participant as speaking
  p.lastSpoke = millis();
  
  // Special effects for Koks consumers
  if (selectedItem.type === 'koks') {
    // Make participant temporarily more animated
    p.headBobAmount = random(0.5, 1.0); // More head movement
    p.isShouting = true; // More expressive
    
    // Schedule a return to normal after some time
    setTimeout(() => {
      if (p && typeof p.headBobAmount !== 'undefined') {
        p.headBobAmount = random(0.2, 0.5); // Back to normal
        p.isShouting = false;
      }
    }, 5000);
  }
  
  return true;
}

// Check specifically if Koks needs refilling
function checkForKoksRefill() {
  // Count consumed Koks items
  const consumedKoks = tableDecorations.filter(item => 
    item.type === 'koks' && (item.consumed || item.consumptionLevel <= 0.6)
  );
  
  // If any Koks needs refill, make waitress appear immediately
  if (consumedKoks.length > 0) {
    // Make waitress appear from right side of screen (faster entrance)
    waitress.isVisible = true;
    waitress.x = width + 50;
    waitress.y = height / 3;
    waitress.targetX = table.x;
    waitress.targetY = table.y - table.height;
    waitress.speed = 5; // Faster speed for Koks refills
    
    // Give her extra Koks
    waitress.tray.items = [];
    waitress.tray.hasExtraKoks = true; 
    
    // Add high priority consumed items to her tray
    tableDecorations.forEach(item => {
      if (item.type === 'koks' && (item.consumed || item.consumptionLevel <= 0.6)) {
        waitress.tray.items.push('koks');
      }
    });
    
    // Make sure she has at least 3 Koks refills
    while (waitress.tray.items.length < 3) {
      waitress.tray.items.push('koks');
    }
  }
}

// Check if waitress should appear to refill items
function checkForRefill() {
  // First check if Koks needs refilling, prioritize that
  const consumedKoks = tableDecorations.filter(item => 
    item.type === 'koks' && (item.consumed || item.consumptionLevel <= 0.6)
  );
  
  if (consumedKoks.length > 0) {
    checkForKoksRefill();
    return;
  }
  
  // Count other consumed items
  const consumedCount = tableDecorations.filter(item => 
    item.consumed || item.consumptionLevel <= 0.3
  ).length;
  
  // If multiple items need refill, make waitress appear
  if (consumedCount >= 2) {
    // Make waitress appear from left side of screen
    waitress.isVisible = true;
    waitress.x = -100;
    waitress.y = height / 2;
    waitress.targetX = table.x;
    waitress.targetY = table.y - table.height;
    waitress.speed = 3; // Normal speed
    
    // Fill waitress tray with replacements
    waitress.tray.items = [];
    waitress.tray.hasExtraKoks = false;
    tableDecorations.forEach(item => {
      if (item.consumed || item.consumptionLevel <= 0.3) {
        waitress.tray.items.push(item.type);
      }
    });
  }
}

// Draw the waitress
function drawWaitress() {
  push();
  translate(waitress.x, waitress.y);
  
  // Draw tray if refilling
  if (waitress.refillTarget) {
    // Tray
    fill(150);
    ellipse(0, 30, 60, 20);
    
    // Items on tray
    let itemCount = waitress.tray.items.length;
    for (let i = 0; i < itemCount && i < 4; i++) {
      const itemType = waitress.tray.items[i];
      const xOffset = (i - itemCount/2 + 0.5) * 15;
      
      if (itemType === 'water') {
        fill('#D6EAF8');
        rect(xOffset, 25, 10, 15, 2);
      } else if (itemType === 'coffee') {
        fill('#784212');
        ellipse(xOffset, 25, 10, 10);
      } else if (itemType === 'cola') {
        fill('#E74C3C');
        rect(xOffset, 25, 8, 12, 1);
      } else if (itemType === 'fruitBowl') {
        fill('#FFD700');
        ellipse(xOffset, 25, 8, 8);
      } else if (itemType === 'koks') {
        // Special display for Koks on the tray
        fill(255);
        rectMode(CENTER);
        rect(xOffset, 25, 12, 8, 1);
        
        // Small lines on top
        stroke(255);
        strokeWeight(2);
        line(xOffset - 3, 21, xOffset + 3, 21);
        noStroke();
      }
    }
    
    // Extra bag of Koks if she's on a Koks refill mission
    if (waitress.tray.hasExtraKoks) {
      fill(255);
      rect(20, 15, 15, 10, 2);
      // Small powder effect
      noStroke();
      fill(255, 255, 255, 200);
      for (let i = 0; i < 5; i++) {
        ellipse(20 + random(-5, 5), 12 + random(-3, 3), 2, 2);
      }
    }
  }
  
  // Body
  fill('#FF5733');
  rect(0, 5, 30, 50, 10, 10, 5, 5);
  
  // Head
  fill('#FFCBA4'); // Skin tone
  ellipse(0, -25, 25, 25);
  
  // Hair
  fill(waitress.hairColor);
  arc(0, -30, 30, 25, PI, TWO_PI);
  
  // Eyes with winky effect for Koks refills
  fill(0);
  if (waitress.tray.hasExtraKoks) {
    // More frequent winking for Koks
    ellipse(-5, -25, 3, floor(frameCount/12) % 3 == 0 ? 1 : 3);
    ellipse(5, -25, 3, floor(frameCount/15) % 4 == 0 ? 1 : 3);
  } else {
    // Normal winking
    ellipse(-5, -25, 3, floor(frameCount/20) % 5 == 0 ? 1 : 3);
    ellipse(5, -25, 3, 3);
  }
  
  // Smile - bigger smile for Koks refills
  noFill();
  stroke(0);
  strokeWeight(1);
  if (waitress.tray.hasExtraKoks) {
    arc(0, -20, 15, 10, 0, PI);
  } else {
    arc(0, -20, 12, 8, 0, PI);
  }
  noStroke();
  
  // Arms
  fill('#FFCBA4');
  if (waitress.refillTarget) {
    // Arms extended with tray
    rect(-22, 0, 12, 30, 5);
    rect(22, 0, 12, 30, 5);
  } else {
    // Normal arms
    rect(-18, 0, 8, 25, 5);
    rect(18, 0, 8, 25, 5);
  }
  
  // Leg left
  fill('#FF5733');
  rect(-10, 35, 10, 20, 0, 0, 3, 3);
  
  // Leg right
  rect(10, 35, 10, 20, 0, 0, 3, 3);
  
  pop();
}

// Update waitress position and state
function updateWaitress() {
  // Move towards target
  const dx = waitress.targetX - waitress.x;
  const dy = waitress.targetY - waitress.y;
  const distance = sqrt(dx * dx + dy * dy);
  
  if (distance > waitress.speed) {
    waitress.x += dx * waitress.speed / distance;
    waitress.y += dy * waitress.speed / distance;
  } else {
    waitress.x = waitress.targetX;
    waitress.y = waitress.targetY;
    
    // If reached target and not yet refilling
    if (waitress.refillTarget === null && waitress.x === table.x) {
      waitress.refillStartTime = millis();
      waitress.refillTarget = 'table';
      
      // Prioritize refilling Koks if it's consumed
      const koksItems = tableDecorations.filter(item => 
        item.type === 'koks' && (item.consumed || item.consumptionLevel <= 0.6)
      );
      
      if (koksItems.length > 0) {
        // Refill all Koks immediately
        for (let koksItem of koksItems) {
          koksItem.consumed = false;
          koksItem.consumptionLevel = 1.0;
          
          // Create a highlight effect around the Koks
          const fadeEffect = {
            x: koksItem.x,
            y: koksItem.y,
            createdAt: millis(),
            duration: 1000
          };
          
          // Also replenish any other low Koks spots
          tableDecorations.forEach(item => {
            if (item.type === 'koks' && item.consumptionLevel < 1.0) {
              item.consumptionLevel = 1.0;
            }
          });
        }
        
        // If this was a Koks-specific refill, leave more quickly
        if (waitress.tray.hasExtraKoks) {
          waitress.refillStartTime -= 1000; // Reduce refill time by 1 second
        }
      }
    }
    
    // If refilling is complete
    if (waitress.refillTarget && millis() - waitress.refillStartTime > REFILL_DURATION) {
      // Refill all consumed items
      tableDecorations.forEach(item => {
        if (item.consumed || item.consumptionLevel <= 0.3) {
          item.consumed = false;
          item.consumptionLevel = 1.0;
        }
      });
      
      // Leave the scene
      waitress.refillTarget = null;
      
      // Leave in the opposite direction from entry
      if (waitress.x === table.x) {
        waitress.targetX = waitress.x < width/2 ? width + 100 : -100;
        waitress.targetY = height / 2;
      }
    }
    
    // If left the scene
    if (waitress.x > width + 50 || waitress.x < -50) {
      waitress.isVisible = false;
      lastRefillTime = millis();
    }
  }
}

// Update participant position with subtle movements
function updateParticipant(p, index) {
  // More animated movement during heated discussions
  const movementFactor = isHeatedDiscussion ? 1.8 : 1.0;
  
  // Subtle movement around base position (chair)
  p.x = p.baseX + sin(frameCount * 0.05 + index) * 5 * movementFactor;
  p.y = p.baseY + sin(frameCount * 0.03 + index * 2) * 3 * p.headBobAmount * movementFactor;
  
  // Keep within boundary of their chair
  p.x = constrain(p.x, p.baseX - 10, p.baseX + 10);
  p.y = constrain(p.y, p.baseY - 8, p.baseY + 8);
  
  // Update face color for shouting participants during heated discussions
  if (isHeatedDiscussion) {
    if (p.isShouting) {
      // Oscillate between normal and red face for shouting
      const redFactor = sin(frameCount * 0.2) * 0.5 + 0.5;
      p.faceColor = lerpColor(
        color(p.color), 
        color(255, 100, 100), 
        redFactor
      );
    }
  } else {
    p.faceColor = p.color;
    p.isShouting = false;
  }
}

// Draw a participant as a comic-style character
function drawParticipant(p) {
  push();
  
  // Get character appearance based on type
  const appearance = characterAppearances[p.type] || characterAppearances.regular;
  
  // Body
  fill(p.color);
  ellipse(p.x, p.y + p.size * 0.6, p.size * 0.9, p.size * 1.2);
  
  // Head
  fill(p.faceColor); // Use the face color (changes when shouting)
  ellipse(p.x, p.y, p.size, p.size);
  
  // Gen-Z special appearance elements
  if (p.type === 'genZAzubi') {
    // Draw headphones if they have them
    if (appearance.extras.hasHeadphones) {
      // Fix headphone positioning to be on top of the head
      stroke(appearance.extras.headphoneColor);
      strokeWeight(4); // Slightly thicker for better visibility
      noFill();
      
      // Draw headphone band across top of head (correctly oriented)
      arc(p.x, p.y, p.size * 1.2, p.size * 1.2, PI, TWO_PI);
      
      // Headphone ear pieces - larger and correctly positioned
      fill(appearance.extras.headphoneColor);
      noStroke();
      // Position ear pieces on sides of head
      ellipse(p.x - p.size/2 * 0.95, p.y, 14, 16);
      ellipse(p.x + p.size/2 * 0.95, p.y, 14, 16);
    }
    
    // Draw hat/beanie
    if (appearance.extras.hatColor) {
      fill(appearance.extras.hatColor);
      arc(p.x, p.y - p.size/2 * 0.6, p.size * 0.9, p.size * 0.5, PI, TWO_PI);
    }
  }
  
  // Eyes
  fill(0);
  
  // If the character has glasses
  if (p.type === 'genZAzubi' && appearance.extras.hasGlasses) {
    stroke(appearance.extras.glassesColor);
    strokeWeight(2); // Slightly thicker for better visibility
    noFill();
    // Draw glasses - scaled with participant size
    ellipse(p.x - p.size * 0.2, p.y - p.size * 0.1, p.size * 0.3, p.size * 0.3);
    ellipse(p.x + p.size * 0.2, p.y - p.size * 0.1, p.size * 0.3, p.size * 0.3);
    // Bridge of glasses
    line(p.x - p.size * 0.15, p.y - p.size * 0.1, p.x + p.size * 0.15, p.y - p.size * 0.1);
    noStroke();
    // Eyes behind glasses
    fill(0);
  }
  
  // Eyes change when shouting
  if (p.isShouting) {
    // Angry eyes
    const eyeY = p.y - p.size * 0.1;
    
    // Left eye
    push();
    translate(p.x - p.size * 0.2, eyeY);
    rotate(-PI/8);
    ellipse(0, 0, 6, 4);
    pop();
    
    // Right eye
    push();
    translate(p.x + p.size * 0.2, eyeY);
    rotate(PI/8);
    ellipse(0, 0, 6, 4);
    pop();
  } else {
    // Normal round eyes
    if (!(p.type === 'genZAzubi' && appearance.extras.hasGlasses)) {
      ellipse(p.x - p.size * 0.2, p.y - p.size * 0.1, 5, 5);
      ellipse(p.x + p.size * 0.2, p.y - p.size * 0.1, 5, 5);
    } else {
      // Smaller eyes behind glasses
      ellipse(p.x - p.size * 0.2, p.y - p.size * 0.1, 4, 4);
      ellipse(p.x + p.size * 0.2, p.y - p.size * 0.1, 4, 4);
    }
  }
  
  // Mouth
  let mouthY = p.y + p.size * 0.2;
  // Animated mouth for speaking participants
  let isSpeaking = false;
  for (let bubble of speechBubbles) {
    if (bubble.participantIndex === participants.indexOf(p)) {
      isSpeaking = true;
      break;
    }
  }
  
  if (isSpeaking) {
    // Open mouth when speaking
    fill(0);
    if (p.isShouting) {
      // Wide open mouth for shouting
      ellipse(p.x, mouthY, 15, 10);
    } else {
      // Normal open mouth
      ellipse(p.x, mouthY, 10, 8);
    }
  } else {
    // Closed mouth otherwise
    stroke(0);
    strokeWeight(2);
    if (p.isShouting) {
      // Angry downturned mouth when not speaking but still shouting
      line(p.x - 8, mouthY + 3, p.x + 8, mouthY + 3);
      line(p.x - 8, mouthY + 3, p.x - 4, mouthY);
      line(p.x + 8, mouthY + 3, p.x + 4, mouthY);
    } else {
      // Normal mouth
      line(p.x - 8, mouthY, p.x + 8, mouthY);
    }
    noStroke();
  }
  
  pop();
}

// Handler for new topic events
function handleNewTopic(event) {
  if (event && event.detail && event.detail.topic) {
    const randomParticipant = Math.floor(random(participants.length));
    createTemporarySpeechBubble(event.detail.topic, randomParticipant);
  }
}

// Start a heated discussion
function startHeatedDiscussion() {
  isHeatedDiscussion = true;
  heatedDiscussionEndTime = millis() + HEATED_DISCUSSION_DURATION;
  debateIntensity = 1.0; // Maximale Intensität während einer hitzigen Debatte
  
  // Make some participants shout
  participants.forEach(p => {
    if (p.isAggressive || random() < 0.5) {
      p.isShouting = true;
    }
  });
}

// Create a temporary speech bubble to display new topic
function createTemporarySpeechBubble(topic, participantIndex = null) {
  // If no participant specified, choose random one
  if (participantIndex === null) {
    participantIndex = Math.floor(random(participants.length));
  }
  
  // Verwende den beim Teilnehmer gespeicherten Namen
  const characterName = participants[participantIndex].name || "Unbekannt";
  
  // Erstelle eine temporäre Sprechblase mit dem neuen Thema
  const bubble = {
    participantIndex,
    x: participants[participantIndex].x,
    y: participants[participantIndex].y - participants[participantIndex].size - 30,
    content: (characterName ? characterName + ": " : "") + "Ich schlage ein neues Thema vor: " + topic,
    createdAt: Date.now(),
    duration: 5000 // 5 Sekunden anzeigen
  };
  
  // Zum Chat-Verlauf hinzufügen
  displayChatMessage(bubble.content);
  
  // Zur Sprechblasen-Liste hinzufügen
  speechBubbles.push(bubble);
}

// Erzeugt eine Sprechblase für einen Teilnehmer
function createSpeechBubble(participant) {
  // 30% Chance, eine Sprechblase zu erstellen
  if (random() > 0.3) return null;
  
  // Bestimme, ob die Person schreien soll (basierend auf Charakter-Eigenschaften)
  let isShouting = false;
  let text = '';
  
  // Prüfe, ob aktuell eine hitzige Debatte läuft
  const heatedDebate = isHeatedDiscussion || debateIntensity > 0.7;
  
  // Nutze die Schrei-Wahrscheinlichkeit des Charakters
  const participantIndex = participants.indexOf(participant);
  const characterType = participant.type || 'regular';
  const shoutProbability = characterPresets[characterType]?.shoutProbability || 0.15;
  
  // Während hitziger Debatten ist die Wahrscheinlichkeit zu schreien höher
  const effectiveShoutProbability = heatedDebate ? shoutProbability * 1.5 : shoutProbability;
  
  // Bestimme, ob geschrien wird
  isShouting = random() < effectiveShoutProbability;
  
  // Wähle eine zufällige Phrase aus der vereinfachten Struktur
  if (isShouting) {
    // Schrei-Phrasen aus der allgemeinen Shouting-Liste
    const shoutPhrases = meetingPhrases.shouting;
    text = shoutPhrases[Math.floor(random() * shoutPhrases.length)];
    
    // Formatiere den Text für Schreien (wenn nicht bereits in Großbuchstaben)
    if (text !== text.toUpperCase()) {
      text = text.toUpperCase();
    }
    
    // Füge 1-3 Ausrufezeichen hinzu, wenn nicht bereits vorhanden
    if (!text.endsWith('!')) {
      const exclamationCount = Math.floor(random() * 3) + 1;
      text += '!'.repeat(exclamationCount);
    }
  } else {
    // Normale Sprache (nicht schreien) aus der Normal-Liste
    const normalPhrases = meetingPhrases.normal;
    text = normalPhrases[Math.floor(random() * normalPhrases.length)];
  }
  
  // Hole den Namen des Teilnehmers
  const participantName = participant.name || "Teilnehmer";
  
  // Erstelle die Sprechblase
  return {
    participantIndex: participantIndex,
    text: text,
    content: text,  // Dupliziere für Konsistenz mit anderen Stellen im Code
    participantName: participantName, // Füge den Namen hinzu
    x: participant.x,
    y: participant.y - participant.size - 30,
    createdAt: millis(),
    duration: isShouting ? 5000 : 4000, // Schreien ist länger sichtbar
    isShouting: isShouting,
    alpha: 0, // Startet mit Fade-in
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// Consume a random item (that's not being specifically targeted)
function consumeRandomItem(participantIndex) {
  // Prefer non-Koks items for general consumption
  let consumableItems = tableDecorations.filter(item => 
    !item.consumed && item.consumptionLevel > 0.2
  );
  
  if (consumableItems.length === 0) return;
  
  // Select a random item
  let selectedItem = consumableItems[floor(random(consumableItems.length))];
  
  // Reduce consumption level
  selectedItem.consumptionLevel -= random(0.3, 0.7);
  
  if (selectedItem.consumptionLevel <= 0.2) {
    selectedItem.consumed = true;
  }
  
  // Update last consumption time
  lastConsumptionTime = millis();
  
  // Create a speech bubble for the participant mentioning the consumption
  const p = participants[participantIndex];
  const consumptionPhrases = {
    'water': ['Ich brauche Wasser.', 'Erfrischend!', 'Ah, das tut gut.'],
    'fruitBowl': ['Etwas Obst gefällig?', 'Vitamine!', 'Sehr lecker.'],
    'cola': ['Eine Cola zur Motivation.', 'Koffein für den Kopf!', 'Zuckerschub.'],
    'coffee': ['Ohne Kaffee geht nichts.', 'Das weckt mich auf.', 'Noch ein Schluck Kaffee.'],
    'koks': ['Das bringt mich in Schwung!', 'Jetzt kann ich klar denken!', 'Das gibt mir Energie!', 'Kommt noch jemand?', 'Boah, das ist gut!', 'Mehr davon!', 'Arbeiten wird plötzlich Spaß machen!', 'Jetzt bin ich wach!']
  };
  
  const phrases = consumptionPhrases[selectedItem.type] || ['Mmm, lecker.'];
  const text = phrases[floor(random(phrases.length))];
  
  // Add consumption speech bubble
  const newBubble = {
    participantIndex: participantIndex,
    text: text,
    x: p.x,
    y: p.y - p.size - 30,
    createdAt: millis(),
    duration: 4000, // Shorter duration
    isShouting: selectedItem.type === 'koks', // Shout when consuming Koks
    alpha: 0 // Starts with fade-in
  };
  
  speechBubbles.push(newBubble);
  
  // Add to chat history
  const chatMessage = {
    participant: p,
    participantIndex: participantIndex,
    message: text,
    text: text,
    content: text,
    name: p.name || "Teilnehmer",
    isShouting: selectedItem.type === 'koks',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  chatMessages.push(chatMessage);
  if (chatMessages.length > 50) chatMessages.shift();
  updateChatDisplay();
  
  // Mark participant as speaking
  p.lastSpoke = millis();
  
  // Special effects for Koks consumers (even in random consumption)
  if (selectedItem.type === 'koks') {
    // Make participant temporarily more animated
    p.headBobAmount = random(0.5, 1.0); // More head movement
    p.isShouting = true; // More expressive
    
    // Schedule a return to normal after some time
    setTimeout(() => {
      if (p && typeof p.headBobAmount !== 'undefined') {
        p.headBobAmount = random(0.2, 0.5); // Back to normal
        p.isShouting = false;
      }
    }, 5000);
  }
}

// Draw all table decorations
function drawTableDecorations() {
  for (let deco of tableDecorations) {
    push();
    
    // Don't draw fully consumed items
    if (deco.consumed) {
      pop();
      continue;
    }
    
    switch (deco.type) {
      case 'water':
        drawWaterBottle(deco);
        break;
      case 'fruitBowl':
        drawFruitBowl(deco);
        break;
      case 'cola':
        drawColaCan(deco);
        break;
      case 'coffee':
        drawCoffeeCup(deco);
        break;
      case 'koks':
        drawKoksLines(deco);
        break;
    }
    
    pop();
  }
}

// Draw a water bottle
function drawWaterBottle(bottle) {
  push();
  translate(bottle.x, bottle.y);
  rotate(bottle.rotation);
  
  // Bottle body
  fill(bottle.color);
  rect(0, 0, bottle.width, bottle.height, 2, 2, 2, 2);
  
  // Bottle cap
  fill('#A9A9A9'); // Gray for cap
  rect(0, -bottle.height/2 - 5, 10, 5, 1);
  
  // Water level - adjusted by consumption
  fill('#D6EAF8'); // Light blue with some transparency
  const waterHeight = (bottle.height - 8) * bottle.consumptionLevel;
  rect(0, bottle.height/2 - waterHeight/2 - 2, bottle.width - 4, waterHeight, 1);
  
  // Highlight
  stroke(255, 255, 255, 100);
  strokeWeight(1);
  line(-bottle.width/3, -bottle.height/3, -bottle.width/3, bottle.height/3);
  
  pop();
}

// Draw a fruit bowl with fruits
function drawFruitBowl(bowl) {
  push();
  translate(bowl.x, bowl.y);
  
  // Bowl
  fill(bowl.color);
  ellipse(0, 0, bowl.radius * 2, bowl.radius * 0.7);
  
  // Bowl rim (3D effect)
  noFill();
  stroke(lerpColor(color(bowl.color), color(0), 0.3));
  strokeWeight(2);
  ellipse(0, 0, bowl.radius * 2, bowl.radius * 0.7);
  
  // Fruits inside bowl - adjust count based on consumption
  const fruitCount = Math.ceil(bowl.fruits.length * bowl.consumptionLevel);
  for (let i = 0; i < fruitCount; i++) {
    const fruit = bowl.fruits[i];
    fill(fruit.color);
    noStroke();
    ellipse(fruit.x, fruit.y, fruit.radius * 2, fruit.radius * 2);
    
    // Highlight on fruit
    fill(255, 255, 255, 80);
    ellipse(fruit.x - fruit.radius * 0.3, fruit.y - fruit.radius * 0.3, fruit.radius * 0.7, fruit.radius * 0.7);
  }
  
  pop();
}

// Draw a cola can
function drawColaCan(can) {
  push();
  translate(can.x, can.y);
  rotate(can.rotation);
  
  // Can body
  fill(can.color);
  rect(0, 0, can.width, can.height, 2, 2, 0, 0);
  
  // Can top
  fill('#A9A9A9'); // Gray for top
  rect(0, -can.height/2 - 3, can.width, 6, 2, 2, 0, 0);
  
  // Label (simplified)
  fill(255);
  textSize(6); // Smaller text size (was 8)
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("COLA", 0, 0);
  
  // Show consumption by tilting the can if partially consumed
  if (can.consumptionLevel < 0.9) {
    rotate(PI/6 * (1 - can.consumptionLevel));
  }
  
  // Highlight
  stroke(255, 255, 255, 100);
  strokeWeight(1);
  line(-can.width/3, -can.height/3, -can.width/3, can.height/3);
  
  pop();
}

// Draw a coffee cup with steam
function drawCoffeeCup(cup) {
  push();
  translate(cup.x, cup.y);
  
  // Cup
  fill('#FFF');
  arc(0, 0, cup.radius * 2, cup.radius * 2, 0, PI, CHORD);
  
  // Coffee inside - adjust level based on consumption
  fill(cup.color);
  const coffeeHeight = cup.radius * 1.7 * cup.consumptionLevel;
  arc(0, cup.radius - coffeeHeight/2, cup.radius * 1.8, coffeeHeight, 0, PI, CHORD);
  
  // Cup handle
  noFill();
  stroke('#FFF');
  strokeWeight(3);
  arc(cup.radius * 0.8, 0, cup.radius, cup.radius * 1.5, -HALF_PI, HALF_PI);
  
  // Steam only if coffee is hot (not too consumed)
  if (cup.consumptionLevel > 0.4) {
    noFill();
    stroke(255, 255, 255, 150 * cup.consumptionLevel); // Fade steam as coffee is consumed
    strokeWeight(1);
    
    for (let i = 0; i < 3; i++) {
      let xOffset = i * 5 - 5;
      let phase = cup.steamPhase + i * 0.5;
      beginShape();
      for (let y = 0; y > -20 * cup.consumptionLevel; y -= 2) {
        let x = xOffset + sin((frameCount * 0.05) + phase + (y * 0.3)) * 3;
        curveVertex(x, y);
      }
      endShape();
    }
  }
  
  pop();
}

// Draw the "Koks" lines
function drawKoksLines(koks) {
  push();
  translate(koks.x, koks.y);
  
  // Small mirror or card surface
  fill(200, 200, 200, 150);
  noStroke();
  rect(0, 0, 30, 20, 2);
  
  // White lines - adjust based on consumption
  stroke(255);
  strokeWeight(2);
  strokeCap(ROUND);
  
  // Only draw lines based on consumption level
  const visibleLines = Math.ceil(koks.lines.length * koks.consumptionLevel);
  for (let i = 0; i < visibleLines; i++) {
    const kokeLine = koks.lines[i];
    push();
    translate(-10 + kokeLine.offset, 0);
    rotate(kokeLine.angle);
    // Adjust line length based on consumption
    const lineLength = kokeLine.length * koks.consumptionLevel;
    line(0, -5, 0, -5 - lineLength);
    pop();
  }
  
  // Credit card nearby
  fill(70, 130, 180); // Steel blue
  noStroke();
  rect(20, 10, 15, 10, 1);
  
  // Card stripe
  fill(50);
  rect(20, 12, 15, 2);
  
  pop();
}

// Add message to chat history
function addMessageToChat(text, participantIndex, isShouting = false, isNewTopic = false) {
  // Format current time HH:MM
  const now = new Date();
  const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
  
  // Create chat message object
  const chatMessage = {
    text: text,
    participantIndex: participantIndex,
    time: timeString,
    isShouting: isShouting,
    isNewTopic: isNewTopic,
    createdAt: Date.now()
  };
  
  // Add to chat messages array
  chatMessages.push(chatMessage);
  
  // Limit chat history length to prevent memory issues
  if (chatMessages.length > 100) {
    chatMessages.shift(); // Remove oldest message
  }
  
  // Update chat display using the DOM element
  updateChatDisplay();
}

// Update chat display
function updateChatDisplay() {
  if (!chatMessagesElement) {
    chatMessagesElement = document.getElementById('chat-messages');
    if (!chatMessagesElement) return;
  }
  
  // Aktuellen Chat leeren
  chatMessagesElement.innerHTML = '';
  
  // Alle Nachrichten zum Chat-Container hinzufügen
  for (let message of chatMessages) {
    const chatElement = document.createElement('div');
    chatElement.classList.add('chat-message');
    
    // Bestimme, ob es sich um eine Shout-Nachricht handelt
    const isShouting = message.isShouting || 
                      (message.message && message.message === message.message.toUpperCase() && 
                       message.message.includes('!'));
    
    if (isShouting) {
      chatElement.classList.add('shouting');
    }
    
    // Name und Zeitstempel in der ersten Zeile
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('chat-header');
    
    // Ermittle den Namen des Teilnehmers
    let participantName = "Unbekannt";
    if (message.participant) {
      participantName = message.participant.name || "Teilnehmer";
    } else if (typeof message.participantIndex === 'number' && 
               participants[message.participantIndex]) {
      participantName = participants[message.participantIndex].name || "Teilnehmer";
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.classList.add('chat-name');
    nameSpan.textContent = participantName;
    
    // Ermittle die Zeit
    const timeString = message.timestamp || message.time || 
                      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('chat-time');
    timeSpan.textContent = timeString;
    
    headerDiv.appendChild(nameSpan);
    headerDiv.appendChild(document.createTextNode(' '));
    headerDiv.appendChild(timeSpan);
    
    // Nachrichtentext in der zweiten Zeile
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('chat-content');
    
    // Verwende den richtigen Text aus message.content oder message.text oder message.message
    const messageText = message.content || message.text || message.message || "";
    contentDiv.textContent = messageText;
    
    // Alles zusammenfügen
    chatElement.appendChild(headerDiv);
    chatElement.appendChild(contentDiv);
    
    // Das Element zum Chat-Verlauf hinzufügen
    chatMessagesElement.appendChild(chatElement);
  }
  
  // Scrollen zum Ende
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}

// Update und zeichne die Sprechblasen
function updateSpeechBubbles() {
  // Filtere abgelaufene Sprechblasen
  speechBubbles = speechBubbles.filter(bubble => drawSpeechBubble(bubble));
  
  // Zufällig neue Sprechblasen erstellen
  if (isDiscussionActive && random() < 0.05 && participants.length > 0) {
    const participant = participants[floor(random() * participants.length)];
    const newBubble = createSpeechBubble(participant);
    if (newBubble) {
      speechBubbles.push(newBubble);
      
      // Füge Nachricht auch zum Chat hinzu
      const chatMessage = {
        participant: participant,
        participantIndex: newBubble.participantIndex,
        message: newBubble.text,
        text: newBubble.text,
        content: newBubble.text,
        name: participant.name || "Teilnehmer",
        isShouting: newBubble.isShouting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      chatMessages.push(chatMessage);
      if (chatMessages.length > 50) chatMessages.shift(); // Begrenze die Anzahl der Chat-Nachrichten
      updateChatDisplay();
    }
  }
}

// Zeichnet eine Sprechblase
function drawSpeechBubble(speechBubble) {
  // Berechne Opacity basierend auf Lebensdauer
  const now = millis();
  const age = now - speechBubble.createdAt;
  
  // Fade-in und Fade-out Animationen
  if (age < 500) {
    speechBubble.alpha = map(age, 0, 500, 0, 1);
  } else if (age > speechBubble.duration - 500) {
    speechBubble.alpha = map(age, speechBubble.duration - 500, speechBubble.duration, 1, 0);
  } else {
    speechBubble.alpha = 1;
  }
  
  // Beende, wenn die Lebensdauer abgelaufen ist
  if (age >= speechBubble.duration) {
    return false;
  }
  
  // Hole den Teilnehmer
  const participant = participants[speechBubble.participantIndex];
  if (!participant) return false;
  
  // Update position to follow participant
  speechBubble.x = participant.x;
  speechBubble.y = participant.y - participant.size - 30;
  
  // Bestimme den Text aus der richtigen Eigenschaft
  const bubbleText = speechBubble.text || speechBubble.content || "";
  if (!bubbleText) return false;
  
  // Berechne Größe basierend auf dem Text
  textSize(14);
  const bubbleWidth = min(300, textWidth(bubbleText) + 40); // Erhöhe die maximale Breite von 200 auf 300
  
  // Berechne die Anzahl der Zeilen basierend auf der Textbreite
  const words = bubbleText.split(' ');
  let line = '';
  let lineCount = 1;
  const maxLineWidth = bubbleWidth - 20; // Berücksichtige Padding
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = textWidth(testLine);
    
    if (testWidth > maxLineWidth) {
      line = words[i] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  // Berechne Höhe basierend auf Zeilenanzahl
  const lineHeight = speechBubble.isShouting ? 20 : 18;
  const textHeight = lineCount * lineHeight;
  const bubbleHeight = textHeight + 20; // Füge Padding hinzu
  
  push();
  translate(speechBubble.x, speechBubble.y);
  
  // Verschiedene Stile für Schreien und normale Sprache
  if (speechBubble.isShouting) {
    // Schrei-Sprechblase (rot/orange)
    fill(255, 100, 50, 255 * speechBubble.alpha);
    stroke(220, 50, 0, 255 * speechBubble.alpha);
    strokeWeight(2);
  } else {
    // Normale Sprechblase (weiß)
    fill(255, 255 * speechBubble.alpha);
    stroke(120, 255 * speechBubble.alpha);
    strokeWeight(1);
  }
  
  // Zeichne die Sprechblase
  ellipse(0, 0, bubbleWidth, bubbleHeight);
  
  // Spitze der Sprechblase
  triangle(
    -10, bubbleHeight/2,
    10, bubbleHeight/2,
    0, bubbleHeight/2 + 15
  );
  
  // Text
  if (speechBubble.isShouting) {
    fill(255, 255, 255, 255 * speechBubble.alpha);
    textStyle(BOLD);
  } else {
    fill(0, 255 * speechBubble.alpha);
    textStyle(NORMAL);
  }
  
  textAlign(CENTER, CENTER);
  textSize(speechBubble.isShouting ? 16 : 14);
  text(bubbleText, 0, 0, bubbleWidth - 20, bubbleHeight - 10);
  
  pop();
  return true;
}

// Handle window resize
function windowResized() {
  let container = document.getElementById('meeting-animation');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  
  // Reset the entire animation to apply new sizes
  resetAnimation();
}

function startDiscussion() {
  if (!isDiscussionActive) return;
  
  // Zufällig einen Teilnehmer auswählen
  const speakerIndex = Math.floor(Math.random() * participants.length);
  const speaker = participants[speakerIndex];
  
  // Prüfen, ob der Teilnehmer bereits spricht
  if (speaker.speechBubble) return;
  
  // Sprechblase erstellen
  const newBubble = createSpeechBubble(speaker);
  if (newBubble) {
    speechBubbles.push(newBubble);
    
    // Füge Nachricht auch zum Chat hinzu
    const chatMessage = {
      participant: speaker,
      participantIndex: speakerIndex,
      message: newBubble.text,
      text: newBubble.text,
      content: newBubble.text,
      name: speaker.name || "Teilnehmer",
      isShouting: newBubble.isShouting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    chatMessages.push(chatMessage);
    if (chatMessages.length > 50) chatMessages.shift();
    updateChatDisplay();
  }
  
  // Continue discussion after a random time
  const delay = 0.5 + Math.random() * 2;
  setTimeout(startDiscussion, delay * 1000);
}

// Calculate appropriate size for speech bubble based on text content
function calculateBubbleSize(content) {
  // Set text properties to measure width accurately
  textSize(12);
  textStyle(NORMAL);
  
  // Get basic text width
  const rawWidth = textWidth(content);
  
  // Calculate height based on width and approximate character count
  // Use wrapped text height calculation
  const maxWidth = min(200, rawWidth + 40); // Max width with padding, limit to 200px
  const lineHeight = 16;
  
  // Approximate number of lines based on word wrapping
  let numLines = 1;
  let words = content.split(' ');
  let currentLine = '';
  
  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    let testLineWidth = textWidth(testLine);
    if (testLineWidth > maxWidth - 40) { // Account for padding
      currentLine = word;
      numLines++;
    } else {
      currentLine = testLine;
    }
  }
  
  // Calculate height based on number of lines
  const height = numLines * lineHeight + 20; // Add padding
  
  return {
    width: maxWidth,
    height: height
  };
}

// Helper function to get a random phrase from an array
function getRandomPhrase(phrasesArray) {
  if (!phrasesArray || !Array.isArray(phrasesArray) || phrasesArray.length === 0) {
    return "..."; // Return a default phrase if input is invalid
  }
  return phrasesArray[Math.floor(Math.random() * phrasesArray.length)];
}

// Funktion zum Anzeigen von Chat-Nachrichten
function displayChatMessage(text) {
  // Format current time HH:MM
  const now = new Date();
  const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
  
  // Einfaches Objekt für Chat-Nachricht erstellen
  const chatMessage = {
    content: text,
    time: timeString,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  // Zur Chat-Nachrichtenliste hinzufügen
  chatMessages.push(chatMessage);
  
  // Begrenze die Chat-Historie auf 50 Nachrichten
  if (chatMessages.length > 50) {
    chatMessages.shift();
  }
  
  // Chat-Anzeige aktualisieren
  updateChatDisplay();
}

// Function to completely reset the animation with new sizes
function resetAnimation() {
  // Clear existing elements
  participants = [];
  chairs = [];
  speechBubbles = [];
  tableDecorations = [];
  
  // Set up the animation again
  let container = document.getElementById('meeting-animation');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  
  // Recreate table with appropriate size
  let tableWidth = width * 0.6;
  let tableHeight = height * 0.4;
  table = {
    x: width / 2,
    y: height / 2,
    width: tableWidth,
    height: tableHeight
  };
  
  // Recreate all elements
  createChairs();
  createParticipants();
  createTableDecorations();
  createWaitress();
  
  // Reset animation state
  isHeatedDiscussion = false;
  lastConsumptionTime = millis();
  lastRefillTime = millis();
  
  // Update the chat display
  updateChatDisplay();
}

// Add an exposed global function to reset the animation (accessible from browser console)
window.resetMeetingAnimation = function() {
  console.log("Resetting animation with new participant sizes...");
  resetAnimation();
};

// Call reset after 2 seconds to ensure the animation is fully loaded
setTimeout(() => {
  console.log("Auto-resetting animation for size change...");
  resetAnimation();
}, 2000);