// Meeting topics for the workers' council animation
// Edit this file to customize the topics discussed in the meeting

const meetingTopics = [
  // Alle Themen in einer flachen Liste ohne Kategorisierung
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
  "Diversity-Quote",
  "Betriebsrad-Leasing für alle",
  "Kostenlose Obstkorb-Initiative",
  "Verpflichtende Kicker-Pausen",
  "Faire Betriebsrad-Vergabe",
  "Gratisgetränke am Arbeitsplatz",
  "Flexible Schreibtischhöhen",
  "Pflanzen am Arbeitsplatz",
  "Meditations- und Ruheräume",
  "Betriebsrad-Werkstatt im Keller",
  "Betriebsrad-Stellplätze mit Ladestation",
  "Gesundheitsprämien und Boni",
  "Monatliche Team-Events",
  "Barrierefreie Umgebung schaffen",
  "Bessere Klimaanlage im Sommer",
  "Eltern-Kind-Büro einrichten",
  "Vergünstigte ÖPNV-Tickets",
  "Betriebsrad statt Firmenwagen",
  "Ergonomische Büromöbel für alle",
  "Elektro-Firmenwagen für Führungskräfte",
  "Firmenwagen-Richtlinien überarbeiten",
  "CO2-Ausgleich für Dienstfahrzeuge",
  "Carsharing statt fester Firmenwagen",
  "Poolfahrzeuge für alle Mitarbeiter",
  "Firmenwagen-Budget als Gehaltsbestandteil",
  "Dienstwagen oder Mobilitätsbudget?",
  "Parkplatz-Reservierungen für Fahrgemeinschaften",
  "Familienfreundliche Parkplätze einrichten",
  "Frauenparkplätze in der Tiefgarage",
  "Parkplätze für Elektrofahrzeuge reservieren",
  "Parkplatzgebühren für Firmenwagen einführen",
  "Kostenloses Parken für Mitarbeiter",
  "Parksituation am Standort verbessern",
  "Parkplatz-Management-System implementieren",
  "Parkraumbewirtschaftung optimieren",
  "TikTok-Präsenz der Firma aufbauen",
  "Vier-Tage-Woche für Azubis testen",
  "Mikro-Learning-Plattform einführen",
  "Keine E-Mails nach Feierabend",
  "Social Media Guidelines aktualisieren",
  "Mentales Gesundheitsprogramm für Azubis",
  "Instagram als Azubi-Recruiting-Tool",
  "Diversity & Inclusion Task Force gründen",
  "Virtual Reality Schulungsräume",
  "Nachhaltigkeit im Arbeitsalltag",
  "Barrierefreie Kommunikationstools",
  "Gaming-Room für kreative Pausen",
  "Regelmäßiges Feedback-System für Azubis",
  "Azubi-Podcast starten",
  "Hybride Ausbildungsmodelle entwickeln",
  "Generationenübergreifende Tandems",
  "Handy-Policy überarbeiten",
  "Klimaneutrale Ausbildung zertifizieren",
  "Azubi-Botschafter:innen für Schulen",
  "Digital Detox Workshops",
  "Umstieg von MacOS auf Linux für Entwicklungsteams",
  "Kostenanalyse: Apple vs. Windows/Linux-Workstations",
  "Performance-Benchmarks: MacOS vs. Alternative Betriebssysteme",
  "Entwicklungsgeschwindigkeit auf verschiedenen Betriebssystemen",
  "Docker-Performance-Probleme auf MacOS lösen",
  "Apple-Hardware-Kosten im IT-Budget reduzieren",
  "Open-Source-Alternativen zu Apple-Software evaluieren",
  "Kompatibilitätsprobleme von MacOS mit Entwicklertools",
  "Standardisierte Entwicklungsumgebung abseits des Apple-Ökosystems",
  "XCode-Alternativen für effizienteres Arbeiten",
  "Mac-Entwicklerlizenzen kritisch überprüfen",
  "Produktivitätsverluste durch Apple-spezifische Probleme berechnen",
  "Cross-Plattform-Entwicklung ohne Apple-Abhängigkeit",
  "Multi-Boot-Optionen für Entwickler-Workstations",
  "Linux als primäres Entwicklerbetriebssystem einführen",
  "Beendigung des Apple-Developer-Programms",
  "Virtuelle Entwicklungsumgebungen statt physischer MacOS-Geräte",
  "Schulung für Windows/Linux als Entwicklerplattform",
  "Apple-Reparaturkosten vs. PC-Hardware-Wartung",
  "BYOD-Policy: Keine Unterstützung mehr für Apple-Geräte",
  
  // Neue Themen zu Cursor und KI
  "Cursor-Alternativen für professionelle Entwicklung",
  "Produktivitätsverluste durch Cursor-Instabilität messen",
  "Lizenzkosten für vollwertige IDEs vs. Cursor",
  "KI-gestützter Code: Wem gehören die Rechte?",
  "Halluzinierende KI-Assistenten: Ein Risiko für den Quellcode?",
  "Mitarbeiterschulung: Wie erkenne ich KI-generierten Unsinn?",
  "Prompt-Engineering als neue Kernkompetenz?",
  "KI-induzierte technische Schulden bekämpfen",
  "Cursor-freie Zonen für konzentriertes Arbeiten",
  "Versicherung gegen KI-verursachte Softwarefehler",
  "Einflussmessung von ChatGPT auf Architekturdegradation",
  "Cursor-Token-Budget: Wer darf wie viel KI nutzen?",
  "KI-Ethik-Richtlinien für Entwicklungsteams",
  "Umstieg von Cursor auf professionelle Entwicklungsumgebungen",
  "Wann wird die KI uns Entwickler ersetzen?",
  "Datenschutzprobleme durch Code-Uploads an KI-Provider",
  "KI als Co-Pilot oder als Rücksitzfahrer?",
  "Cursor-Abstürze als Burnout-Faktor",
  "Prompt-Writing als Jobprofil für Software-Entwickler",
  "Richtlinie: Kein KI-generierter Code in der Produktion"
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