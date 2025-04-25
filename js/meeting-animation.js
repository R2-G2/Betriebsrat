// Meeting Animation using p5.js
// Creates a comic-style animation of a workers' council meeting

// Global variables
let participants = [];
let table;
let chairs = [];
let speechBubbles = [];
// meetingTopics and participantPhrases are loaded from external JS files

// Config constants
const ROOM_COLOR = "#E6E6FA";
const TABLE_COLOR = "#8B4513";
const CHAIR_COLOR = "#A0522D";
const PARTICIPANT_COLORS = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFFFE0", "#D8BFD8", "#FFA07A", "#87CEEB", "#98FB98"];
const PARTICIPANT_COUNT = 10;
const SPEECH_BUBBLE_DURATION = 3000; // milliseconds
const SPEECH_CHANCE = 0.01; // probability per frame that a participant speaks
const NEW_TOPIC_HIGHLIGHT_DURATION = 5000; // duration to highlight new topics

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
  
  // Set frame rate
  frameRate(30);
  
  // Listen for new topic events
  if (typeof document !== 'undefined' && typeof TOPIC_ADDED_EVENT !== 'undefined') {
    document.addEventListener(TOPIC_ADDED_EVENT, handleNewTopic);
  }
}

// Create chairs positioned around the meeting table
function createChairs() {
  // Top side of table
  for (let i = 0; i < 3; i++) {
    let x = table.x - table.width * 0.3 + i * table.width * 0.3;
    let y = table.y - table.height * 0.7;
    chairs.push({ x, y, width: 40, height: 40 });
  }
  
  // Bottom side of table
  for (let i = 0; i < 3; i++) {
    let x = table.x - table.width * 0.3 + i * table.width * 0.3;
    let y = table.y + table.height * 0.7;
    chairs.push({ x, y, width: 40, height: 40 });
  }
  
  // Left side of table
  for (let i = 0; i < 2; i++) {
    let x = table.x - table.width * 0.7;
    let y = table.y - table.height * 0.2 + i * table.height * 0.4;
    chairs.push({ x, y, width: 40, height: 40 });
  }
  
  // Right side of table
  for (let i = 0; i < 2; i++) {
    let x = table.x + table.width * 0.7;
    let y = table.y - table.height * 0.2 + i * table.height * 0.4;
    chairs.push({ x, y, width: 40, height: 40 });
  }
}

// Create participants and position them on chairs
function createParticipants() {
  for (let i = 0; i < PARTICIPANT_COUNT; i++) {
    if (i >= chairs.length) break; // Don't create more participants than chairs
    
    let chair = chairs[i];
    let colorIndex = i % PARTICIPANT_COLORS.length;
    
    participants.push({
      x: chair.x,
      y: chair.y,
      baseX: chair.x,
      baseY: chair.y,
      size: 35,
      color: PARTICIPANT_COLORS[colorIndex],
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      lastSpoke: 0,
      headBobAmount: random(0.2, 0.5)
    });
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
  
  // Draw chairs
  fill(CHAIR_COLOR);
  for (let chair of chairs) {
    rect(chair.x, chair.y, chair.width, chair.height, 5);
  }
  
  // Update and draw participants
  for (let i = 0; i < participants.length; i++) {
    updateParticipant(participants[i], i);
    drawParticipant(participants[i]);
    
    // Random chance for a participant to speak
    if (random() < SPEECH_CHANCE && millis() - participants[i].lastSpoke > SPEECH_BUBBLE_DURATION * 2) {
      createSpeechBubble(i);
      participants[i].lastSpoke = millis();
    }
  }
  
  // Update and draw speech bubbles
  updateSpeechBubbles();
}

// Update participant position with subtle movements
function updateParticipant(p, index) {
  // Subtle movement around base position (chair)
  p.x = p.baseX + sin(frameCount * 0.05 + index) * 5;
  p.y = p.baseY + sin(frameCount * 0.03 + index * 2) * 3 * p.headBobAmount;
  
  // Keep within boundary of their chair
  p.x = constrain(p.x, p.baseX - 10, p.baseX + 10);
  p.y = constrain(p.y, p.baseY - 8, p.baseY + 8);
}

// Draw a participant as a comic-style character
function drawParticipant(p) {
  push();
  
  // Body
  fill(p.color);
  ellipse(p.x, p.y + p.size * 0.6, p.size * 0.9, p.size * 1.2);
  
  // Head
  ellipse(p.x, p.y, p.size, p.size);
  
  // Eyes
  fill(0);
  ellipse(p.x - p.size * 0.2, p.y - p.size * 0.1, 5, 5);
  ellipse(p.x + p.size * 0.2, p.y - p.size * 0.1, 5, 5);
  
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
    ellipse(p.x, mouthY, 10, 8);
  } else {
    // Closed mouth otherwise
    stroke(0);
    strokeWeight(2);
    line(p.x - 8, mouthY, p.x + 8, mouthY);
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

// Create a temporary speech bubble to display new topic
function createTemporarySpeechBubble(topic, participantIndex = null) {
  // If no participant specified, choose random one
  if (participantIndex === null) {
    participantIndex = Math.floor(random(participants.length));
  }
  
  // Make the participant speak the new topic
  if (participantIndex >= 0 && participantIndex < participants.length) {
    const p = participants[participantIndex];
    
    // Create speech bubble with the new topic and highlight flag
    speechBubbles.push({
      participantIndex,
      x: p.x,
      y: p.y - p.size - 30,
      content: topic,
      createdAt: millis(),
      duration: NEW_TOPIC_HIGHLIGHT_DURATION, // Longer duration for new topics
      isNewTopic: true // Flag to highlight new topics
    });
    
    // Update the lastSpoke time for the participant
    p.lastSpoke = millis();
  }
}

// Create a new speech bubble for a participant
function createSpeechBubble(participantIndex) {
  const p = participants[participantIndex];
  const isDiscussingTopic = random() > 0.5;
  
  let content;
  if (isDiscussingTopic && typeof meetingTopics !== 'undefined' && meetingTopics.length > 0) {
    content = meetingTopics[Math.floor(random(meetingTopics.length))];
  } else if (typeof participantPhrases !== 'undefined' && participantPhrases.length > 0) {
    content = participantPhrases[Math.floor(random(participantPhrases.length))];
  } else {
    content = "Keine Daten geladen...";
  }
  
  speechBubbles.push({
    participantIndex,
    x: p.x,
    y: p.y - p.size - 30,
    content,
    createdAt: millis(),
    duration: SPEECH_BUBBLE_DURATION,
    isNewTopic: false
  });
}

// Update and draw speech bubbles
function updateSpeechBubbles() {
  // Create a copy of the array to safely remove items while iterating
  let bubblesToKeep = [];
  
  for (let bubble of speechBubbles) {
    const elapsed = millis() - bubble.createdAt;
    
    // Remove expired bubbles
    if (elapsed > bubble.duration) {
      continue;
    }
    
    // Update position to follow participant
    const p = participants[bubble.participantIndex];
    bubble.x = p.x;
    bubble.y = p.y - p.size - 30;
    
    // Calculate opacity for fade in/out effect
    let opacity = 1;
    if (elapsed < 500) {
      // Fade in
      opacity = map(elapsed, 0, 500, 0, 1);
    } else if (elapsed > bubble.duration - 500) {
      // Fade out
      opacity = map(elapsed, bubble.duration - 500, bubble.duration, 1, 0);
    }
    
    // Draw the speech bubble
    push();
    
    // Special styling for new topics
    if (bubble.isNewTopic) {
      // Pulsating effect for new topics
      const pulseAmount = sin(millis() * 0.01) * 0.2 + 0.8;
      fill(255, 255, 200, 255 * opacity * pulseAmount); // Yellowish background
      stroke(255, 200, 0, 150 * opacity); // Golden border
      strokeWeight(2);
    } else {
      fill(255, 255, 255, 255 * opacity);
      stroke(0, 0, 0, 100 * opacity);
      strokeWeight(1);
    }
    
    // Bubble
    ellipse(bubble.x, bubble.y, textWidth(bubble.content) + 20, 30);
    
    // Pointer to participant
    triangle(
      bubble.x, bubble.y + 15,
      bubble.x - 10, bubble.y + 30,
      bubble.x + 10, bubble.y + 30
    );
    
    // Text
    noStroke();
    fill(0, 0, 0, 255 * opacity);
    textAlign(CENTER, CENTER);
    text(bubble.content, bubble.x, bubble.y);
    pop();
    
    bubblesToKeep.push(bubble);
  }
  
  // Replace the original array with the filtered one
  speechBubbles = bubblesToKeep;
}

// Handle window resize
function windowResized() {
  let container = document.getElementById('meeting-animation');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  
  // Recalculate table position and size
  table.x = width / 2;
  table.y = height / 2;
  table.width = width * 0.6;
  table.height = height * 0.4;
  
  // Reposition chairs and participants
  chairs = [];
  createChairs();
  
  for (let i = 0; i < participants.length; i++) {
    if (i < chairs.length) {
      participants[i].baseX = chairs[i].x;
      participants[i].baseY = chairs[i].y;
    }
  }
} 