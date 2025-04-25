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
const SHOUTING_CHANCE = 0.3; // probability that a speech will be shouting
const HEATED_DISCUSSION_CHANCE = 0.05; // chance that a shouting will trigger heated discussion
const HEATED_DISCUSSION_DURATION = 10000; // duration of heated discussion in ms

// State variables
let isHeatedDiscussion = false;
let heatedDiscussionEndTime = 0;

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
      headBobAmount: random(0.2, 0.5),
      isAggressive: random() < 0.3, // Some participants are more likely to shout
      faceColor: PARTICIPANT_COLORS[colorIndex] // Initial face color (changes when shouting)
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
  
  // Check if heated discussion should end
  if (isHeatedDiscussion && millis() > heatedDiscussionEndTime) {
    isHeatedDiscussion = false;
    // Reset participant face colors
    participants.forEach(p => {
      p.faceColor = p.color;
    });
  }
  
  // Update and draw participants
  for (let i = 0; i < participants.length; i++) {
    updateParticipant(participants[i], i);
    drawParticipant(participants[i]);
    
    // Random chance for a participant to speak
    if (random() < (isHeatedDiscussion ? SPEECH_CHANCE * 3 : SPEECH_CHANCE) && 
        millis() - participants[i].lastSpoke > SPEECH_BUBBLE_DURATION * 1.5) {
      createSpeechBubble(i);
      participants[i].lastSpoke = millis();
    }
  }
  
  // Update and draw speech bubbles
  updateSpeechBubbles();
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
  
  // Body
  fill(p.color);
  ellipse(p.x, p.y + p.size * 0.6, p.size * 0.9, p.size * 1.2);
  
  // Head
  fill(p.faceColor); // Use the face color (changes when shouting)
  ellipse(p.x, p.y, p.size, p.size);
  
  // Eyes
  fill(0);
  
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
    ellipse(p.x - p.size * 0.2, p.y - p.size * 0.1, 5, 5);
    ellipse(p.x + p.size * 0.2, p.y - p.size * 0.1, 5, 5);
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
      isNewTopic: true, // Flag to highlight new topics
      isShouting: false
    });
    
    // Update the lastSpoke time for the participant
    p.lastSpoke = millis();
  }
}

// Create a new speech bubble for a participant
function createSpeechBubble(participantIndex) {
  if (Math.random() > 0.3) {
    return; // Only 30% chance to create bubble
  }
  
  // Determine if this participant is shouting
  // Higher chance of shouting for more heated debate
  const isShouting = Math.random() < 0.35; // Increased chance from 0.15 to 0.35
  let text = "";
  
  if (isShouting) {
    // Get shouting phrases - only use meetingPhrases object
    const availableShoutingPhrases = meetingPhrases?.shoutingPhrases || [];
    text = availableShoutingPhrases[Math.floor(Math.random() * availableShoutingPhrases.length)];
    
    // Convert to ALL CAPS and add exclamation marks for emphasis
    text = text.toUpperCase();
    if (!text.endsWith("!")) {
      text += "!";
    }
    
    // Sometimes add multiple exclamation marks for extra emphasis
    if (Math.random() < 0.5) {
      text += "!!";
    }
  } else {
    // Normal speech - participant-specific or general phrases
    const participantSpecificPhrases = meetingPhrases?.participantPhrases?.[participantIndex] || [];
    const normalPhrases = meetingPhrases?.normalPhrases || [];
    
    // 70% chance to use participant-specific phrase if available
    if (participantSpecificPhrases && participantSpecificPhrases.length > 0 && Math.random() < 0.7) {
      text = participantSpecificPhrases[Math.floor(Math.random() * participantSpecificPhrases.length)];
    } else {
      text = normalPhrases[Math.floor(Math.random() * normalPhrases.length)];
    }
  }
  
  const p = participants[participantIndex];
  // Mark participant as shouting if applicable
  if (isShouting) {
    p.isShouting = true;
  }
  
  // Add speech bubble
  speechBubbles.push({
    participantIndex,
    x: p.x,
    y: p.y - p.size - 30,
    content: text,
    createdAt: millis(),
    duration: SPEECH_BUBBLE_DURATION,
    isShouting: isShouting,
    isNewTopic: false
  });
  
  // Small chance that a shouting will trigger heated discussion
  if (isShouting && !isHeatedDiscussion && random() < HEATED_DISCUSSION_CHANCE) {
    startHeatedDiscussion();
  }
  
  return true;
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
    
    // Special styling for shouting
    if (bubble.isShouting) {
      // Red speech bubble for shouting
      const pulseAmount = sin(millis() * 0.01) * 0.2 + 0.8;
      fill(255, 200, 200, 255 * opacity);
      stroke(255, 100, 100, 200 * opacity);
      strokeWeight(3 * pulseAmount);
      
      // Make shouting bubbles larger
      const shouting_size = textWidth(bubble.content) + 35;
      ellipse(bubble.x, bubble.y, shouting_size, 40);
    }
    // Special styling for new topics
    else if (bubble.isNewTopic) {
      // Pulsating effect for new topics
      const pulseAmount = sin(millis() * 0.01) * 0.2 + 0.8;
      fill(255, 255, 200, 255 * opacity * pulseAmount); // Yellowish background
      stroke(255, 200, 0, 150 * opacity); // Golden border
      strokeWeight(2);
      
      // Bubble
      ellipse(bubble.x, bubble.y, textWidth(bubble.content) + 20, 30);
    } else {
      // Normal bubble
      fill(255, 255, 255, 255 * opacity);
      stroke(0, 0, 0, 100 * opacity);
      strokeWeight(1);
      
      // Bubble
      ellipse(bubble.x, bubble.y, textWidth(bubble.content) + 20, 30);
    }
    
    // Pointer to participant
    triangle(
      bubble.x, bubble.y + 15,
      bubble.x - 10, bubble.y + 30,
      bubble.x + 10, bubble.y + 30
    );
    
    // Text
    noStroke();
    textAlign(CENTER, CENTER);
    
    if (bubble.isShouting) {
      // Larger, bolder text for shouting
      fill(0, 0, 0, 255 * opacity);
      textStyle(BOLD);
      textSize(14);
    } else {
      // Normal text
      fill(0, 0, 0, 255 * opacity);
      textStyle(NORMAL);
      textSize(12);
    }
    
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

function startDiscussion() {
  if (!isDiscussionActive) return;
  
  // Zufällig einen Teilnehmer auswählen
  const speakerIndex = Math.floor(Math.random() * participants.length);
  const speaker = participants[speakerIndex];
  
  // Prüfen, ob der Teilnehmer bereits spricht
  if (speaker.speechBubble) return;
  
  // Directly call createSpeechBubble with speaker index only
  createSpeechBubble(speakerIndex);
  
  // Diskussion nach einer zufälligen Zeit fortsetzen
  const delay = 0.5 + Math.random() * 2;
  setTimeout(startDiscussion, delay * 1000);
}

// Draw a speech bubble
function drawSpeechBubble(speechBubble) {
  const p = participants[speechBubble.participantIndex];
  const elapsed = millis() - speechBubble.createdAt;
  const remainingTime = speechBubble.duration - elapsed;
  
  if (remainingTime <= 0) {
    return false; // Remove this speech bubble
  }
  
  // Update position to follow participant
  speechBubble.x = p.x;
  speechBubble.y = p.y - p.size - 30;
  
  const bubbleSize = calculateBubbleSize(speechBubble.content);
  
  push();
  translate(speechBubble.x, speechBubble.y);
  
  // Animate the bubble if shouting - more pronounced shake and pulsing effect
  if (speechBubble.isShouting) {
    // More aggressive shaking for shouting
    const shakeAmount = sin(elapsed * 0.05) * 3;
    translate(shakeAmount, random(-3, 3));
    
    // Pulsing size for shouting - emphasize anger
    const pulseFactor = 1.3 + sin(elapsed * 0.01) * 0.1;
    scale(pulseFactor);
  }
  
  // Make the bubble fade in and out
  const alpha = map(
    min(elapsed, remainingTime),
    0,
    300,
    0,
    255
  );
  
  // Style based on speaking mode
  if (speechBubble.isShouting) {
    // Stronger red tint for shouting with gradient effect
    const redIntensity = 255 - sin(elapsed * 0.02) * 20;
    fill(redIntensity, 200, 200, alpha);
    stroke(255, 100, 100, alpha);
    strokeWeight(4);
    // Make shouting bubbles larger with jagged edges
    const enlargeFactor = 1.4;
    rect(-bubbleSize.width/2 * enlargeFactor, -bubbleSize.height * enlargeFactor, 
         bubbleSize.width * enlargeFactor, bubbleSize.height * enlargeFactor, 
         8, 8, 8, 8);
         
    // Add "anger marks" - small lines around the bubble
    stroke(255, 80, 80, alpha);
    strokeWeight(2);
    for (let i = 0; i < 6; i++) {
      const angle = i * PI / 3;
      const distance = bubbleSize.width/2 * enlargeFactor + 10;
      const lineLength = 8 + random(4);
      const x1 = cos(angle) * distance;
      const y1 = sin(angle) * distance;
      line(x1, y1, x1 * 1.3, y1 * 1.3);
    }
  } else if (speechBubble.isNewTopic) {
    // Topic bubbles
    fill(230, 255, 230, alpha);
    stroke(180, 255, 180, alpha);
    strokeWeight(2);
    rect(-bubbleSize.width/2, -bubbleSize.height, bubbleSize.width, bubbleSize.height, 10, 10, 10, 10);
  } else {
    // Regular speech
    fill(255, 255, 255, alpha);
    stroke(200, 200, 200, alpha);
    strokeWeight(1);
    rect(-bubbleSize.width/2, -bubbleSize.height, bubbleSize.width, bubbleSize.height, 10, 10, 10, 10);
  }
  
  // Add the speech bubble tail
  fill(255, 255, 255, alpha);
  if (speechBubble.isShouting) {
    fill(255, 200, 200, alpha);
  } else if (speechBubble.isNewTopic) {
    fill(230, 255, 230, alpha);
  }
  
  noStroke();
  triangle(-10, 0, 10, 0, 0, 15);
  
  // Text
  if (speechBubble.isShouting) {
    // Bold text for shouting with stronger color
    textStyle(BOLD);
    fill(180, 0, 0, alpha);
    textSize(14); // Larger text size for shouting
  } else {
    textStyle(NORMAL);
    fill(0, 0, 0, alpha);
    textSize(12);
  }
  
  textAlign(CENTER, CENTER);
  text(speechBubble.content, 0, -bubbleSize.height / 2 - 5, bubbleSize.width - 20, bubbleSize.height - 20);
  
  pop();
  
  return true; // Keep this speech bubble
} 