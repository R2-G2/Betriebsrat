// Meeting topics for the workers' council animation
// Edit this file to customize the topics discussed in the meeting

const meetingTopics = [
  "Neue Arbeitszeiten",
  "Urlaubsanträge",
  "Kantinenangebot",
  "Betriebsausflug",
  "Parkplätze",
  "Weiterbildung",
  "Homeoffice-Regelung",
  "Gesundheitsförderung",
  "Neue Software",
  "Überstundenregelung",
  "Raumtemperatur",
  "Diensthandy",
  "KI-basierte Überwachung",
  "Agilität im Büro",
  "Digitale Transformation",
  "Work-Life-Balance",
  "New Work Konzept",
  "Employer Branding",
  "Lean Management",
  "Remote Work Policy",
  "Mitarbeiter-Tracking",
  "Outsourcing-Strategie",
  "Corporate Identity",
  "Holokratisches Arbeiten",
  "Silicon Valley Methodik",
  "Standortschließung",
  "Umstrukturierung",
  "Effizienzsteigerung",
  "Datenbasierte Leistungsmessung",
  "Hiring & Firing",
  "Change Management",
  "Burnout-Prophylaxe",
  "Diversity-Quote"
];

// Custom event to signal that a new topic has been added
const TOPIC_ADDED_EVENT = 'topicAdded';

// Function to add a new topic to the list
function addMeetingTopic(newTopic) {
  // Trim the input and convert to title case
  newTopic = newTopic.trim();
  
  // Check if the topic already exists (case insensitive)
  if (newTopic === "") {
    return { success: false, message: "Bitte geben Sie ein Thema ein." };
  }
  
  const topicExists = meetingTopics.some(topic => 
    topic.toLowerCase() === newTopic.toLowerCase()
  );
  
  if (topicExists) {
    return { success: false, message: "Dieses Thema existiert bereits." };
  }
  
  // Add the new topic to the array
  meetingTopics.push(newTopic);
  
  // Dispatch an event to notify the system about the new topic
  if (typeof document !== 'undefined') {
    const event = new CustomEvent(TOPIC_ADDED_EVENT, { 
      detail: { topic: newTopic } 
    });
    document.dispatchEvent(event);
    
    // Force immediate display of the new topic by creating a temporary speech bubble
    if (typeof createTemporarySpeechBubble === 'function') {
      createTemporarySpeechBubble(newTopic);
    }
  }
  
  // Return success message
  return { success: true, message: "Thema erfolgreich hinzugefügt!" };
} 