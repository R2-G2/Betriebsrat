// Meeting-Phrasen für die Betriebsratsanimation
// Bearbeiten Sie diese Datei, um die Phrasen anzupassen

// Vereinfachte Phrasen-Struktur ohne thematische Unterteilung
const meetingPhrases = {
  // Alle normalen Phrasen in einer Liste
  normal: [
    // Allgemeine Phrasen
    "Das sehe ich anders...",
    "Können wir abstimmen?",
    "Da bin ich dafür!",
    "Ich habe einen Vorschlag.",
    "Das müssen wir klären.",
    "Wie ist die Rechtslage?",
    "Das ist im Interesse der Mitarbeiter.",
    "Die Geschäftsführung sagt...",
    "Laut Paragraph...",
    "Wir sollten das vertagen.",
    "Dazu gibt es eine Umfrage.",
    "Das protokollieren wir.",
    "Wir müssen agil reagieren!",
    "Lassen Sie uns das disruptiv angehen.",
    "Die Zahlen sprechen für sich.",
    "Haben wir dafür die Ressourcen?",
    "Wir brauchen mehr Synergien.",
    "Das ist nicht DSGVO-konform!",
    "Bei der Konkurrenz macht man das anders.",
    "Wo ist der Business Case?",
    "Was sagt der Compliance Officer?",
    "Lasst uns das im Deep Dive analysieren.",
    "Hier fehlt der Proof of Concept.",
    "Können wir das skalieren?",
    "Das ist nicht Teil der Roadmap!",
    "Einfach mal machen statt quatschen.",
    "Wir müssen den Stakeholdern zuhören.",
    "Ist das im Budget eingeplant?",
    "Das steht nicht in meiner OKR-Liste.",
    "Gibt es dafür eine Best Practice?",
    "Wir brauchen einen Paradigmenwechsel.",
    "Die KPIs sprechen dagegen.",
    "Ist das überhaupt nachhaltig?",
    "Das müssen wir noch mal benchmarken.",
    "Wir sollten eine Task Force gründen.",
    "Das müssen wir ganzheitlich betrachten.",
    "Ich setze auf Customer Centricity.",
    "Maximale Transparenz ist entscheidend.",
    "Wir brauchen ein Mindset-Shift!",
    "Haben wir dafür eine Blockchain-Lösung?",
    "Das war in meinem letzten Design Sprint anders.",
    "Lass uns das im Workshop vertiefen.",
    "Das ist ein echter Game Changer!",
    "Haben wir die Pain Points identifiziert?",
    "Das skaliert nicht exponentiell genug.",
    "Lasst uns einen Hackathon organisieren.",
    "Was sagt unsere AI dazu?",
    "Können wir das Minimum Viable Product definieren?",
    "Ich stelle das mal in den Parking Lot.",
    "Da fehlt mir die Customer Journey.",
    "Wir sollten das agil mit SCRUM umsetzen.",
    "Wir müssen die KPIs überprüfen",
    "Lass uns das offline besprechen",
    "Ich stelle das in den Parkplatz",
    "Das ist nicht in meinem Zuständigkeitsbereich",
    "Können wir das priorisieren?",
    "Ich bin damit einverstanden",
    "Wir sollten agiler vorgehen",
    "Haben wir dafür Budget?",
    "Ich muss das mit meinem Team abstimmen",
    "Lasst uns einen Workshop dazu machen",
    "Bitte alle ins Boot holen",
    "Wir sollten das eskalieren",
    "Können wir ein Follow-up vereinbaren?",
    "Das ist eine Win-win-Situation",
    "Wir sollten die Quartalszahlen überprüfen",
    "Das ist ein wichtiger Punkt",
    "Können wir das nächste Thema besprechen?", 
    "Ich finde diesen Vorschlag gut",
    "Das müssen wir noch genauer analysieren",
    "Wann ist die nächste Sitzung?",
    "Vielleicht sollten wir eine Pause machen",
    "Ich bin mit diesem Plan einverstanden",
    "Wir brauchen mehr Daten dazu",
    "Das Protokoll der letzten Sitzung liegt vor",
    "Die Geschäftsführung wartet auf unsere Entscheidung",
    "Wie sehen die Finanzen aus?",
    "Lassen Sie uns über die Mitarbeiterumfrage sprechen",
    "Die aktuellen Zahlen sind nicht gut",
    "Sollen wir darüber abstimmen?",
    "Ich möchte einen Vorschlag einbringen",
    "Das müssen wir mit der Personalabteilung besprechen",
    "Was meinen die anderen dazu?",
    "Wie ist die rechtliche Lage?",
    "Das sollten wir im Protokoll festhalten",
    
    // Mobility/Betriebsrad Phrasen
    "Wir müssen die Work-Life-Balance verbessern.",
    "Das Betriebsrad-Konzept ist zukunftsweisend!",
    "Wie sieht die CO2-Bilanz beim Betriebsrad aus?",
    "Was kostet uns das Betriebsrad-Programm?",
    "Können alle Mitarbeiter ein Betriebsrad bekommen?",
    "Die Mitarbeiter wünschen sich mehr Flexibilität.",
    "Ich schlage einen Wellness-Raum vor.",
    "Der Obstkorb sollte wöchentlich aufgefüllt werden.",
    "Ich nutze mein Betriebsrad täglich!",
    "Betriebsräder fördern die Gesundheit nachweislich.",
    "Brauchen wir mehr Fahrradstellplätze?",
    "Können wir eine Duschmöglichkeit einrichten?",
    "Eine Betriebsrad-Werkstatt wäre praktisch.",
    "Haben wir eine Versicherung für die Betriebsräder?",
    "Wir sollten Corporate Benefits ausbauen.",
    "Das Betriebsrad fördert den Teamgeist",
    "Ein besserer Arbeitsplatz steigert die Produktivität",
    "Flexible Arbeitszeiten sind essentiell",
    "Die Pausenkultur muss verbessert werden",
    "Wir sollten ergonomische Stühle anschaffen",
    "Mehr Pflanzen verbessern das Raumklima",
    "Betriebsrad statt Firmenwagen spart Kosten",
    "Der Obstkorb ist immer leer",
    "Wir brauchen eine Fahrradgarage",
    "Die Gesundheit der Mitarbeiter hat Priorität",
    "Betriebsräder sind nachhaltiger als Dienstwagen",
    "Die Leasingkonditionen sind zu prüfen",
    "Wir sollten eine Fahrgemeinschafts-App einführen",
    "Eine E-Bike-Option wäre zukunftsorientiert",
    "Mentale Gesundheit ist genauso wichtig",
    "Mein Firmenwagen ist zu klein für meine Position.",
    "Ein Elektroauto spart langfristig Kosten.",
    "Die aktuelle Parkplatzsituation ist katastrophal.",
    "Warum bekommen nur Manager einen Firmenwagen?",
    "Die CO2-Bilanz unserer Fahrzeugflotte ist bedenklich.",
    "Wir brauchen mehr Ladestationen für E-Autos.",
    "Ein Mobilitätsbudget wäre flexibler als Firmenwagen.",
    "Die Parkplatzordnung muss neu strukturiert werden.",
    "Können wir ein Carsharing-Modell implementieren?",
    "Familienfreundliche Parkplätze sollten Priorität haben.",
    "Die Firmenwagen-Policy ist veraltet.",
    "Belegbare Parkplätze sind ein wichtiger Benefit.",
    "Wir sollten die Dienstwagensteuer neu kalkulieren.",
    "Das Parkleitsystem muss digitalisiert werden.",
    "Ein nachhaltiges Mobilitätskonzept ist überfällig.",
    "Die Parkplatzsituation muss verbessert werden",
    "Firmenwagen sind ein teurer Benefit",
    "Elektroautos sind die Zukunft unserer Flotte",
    "Wir sollten mehr Fahrgemeinschaften fördern",
    "Ein Parkleitsystem würde viel Zeit sparen",
    "Die Tiefgarage könnte effizienter genutzt werden",
    "Poolfahrzeuge sind wirtschaftlicher als persönliche Dienstwagen",
    "Die Parkplatzverteilung muss gerechter werden",
    "Ein Mobilitätsbudget ist flexibler als ein Firmenwagen",
    "Wir sollten einen Shuttle-Service anbieten",
    "Die CO2-Bilanz unserer Fahrzeugflotte ist zu optimieren",
    "Ladestationen sind ein wichtiger Mitarbeiter-Benefit",
    "Die Fahrtkosten-Erstattung sollte überarbeitet werden",
    "Parken sollte für alle Mitarbeiter kostenfrei sein",
    "Carsharing ist Teil eines modernen Mobilitätskonzepts",
    
    // GenZ Phrasen
    "Die Azubi-TikTok-Challenge war ein voller Erfolg!",
    "Wir brauchen mehr digitale Lernformate.",
    "Vier Tage Arbeiten bei vollem Gehalt ist erwiesen produktiver.",
    "Kann ich die Arbeit auch vom Café aus erledigen?",
    "Wir sollten Teams durch Discord ersetzen.",
    "Feedback sollte kontinuierlich sein, nicht nur jährlich.",
    "Eine klimaneutrale Ausbildung ist mir wichtig.",
    "Können wir Slack-Kanäle thematisch besser strukturieren?",
    "Virtual Reality Training spart langfristig Reisekosten.",
    "Ich lerne besser mit kurzen Video-Tutorials.",
    "Das Meeting hätte auch ein Podcast sein können.",
    "Ein Digital Detox Tag pro Monat fördert die Kreativität.",
    "Die Azubi-Botschafter haben 50 neue Bewerber generiert.",
    "Eine hybride Ausbildung bietet mehr Flexibilität.",
    "Der Gaming-Room fördert teamübergreifende Kommunikation.",
    "Digga, das ist so wichtig für unsere Work-Life-Balance!",
    "No cap, das ist legit eine gute Idee!",
    "Sheesh, wie sollen wir das den Chefs präsentieren?",
    "Wer hat den Boomer-Move gestartet?",
    "Das ist lowkey cringe, aber wir müssen da durch.",
    "Slay! Diese Präsentation ist ein Vibe!",
    "FOMO bei den Benefits ist real, Leute!",
    "Ist dieser Vorschlag based oder mid?",
    "Ich muss kurz einen TikTok zu dieser Meeting-Katastrophe machen.",
    "Wir sind so back mit diesem Projekt!",
    "Wie lange dauert das noch? Hab gleich einen Call mit meinen Besties.",
    "Die Deadline hat mich komplett verstresst, gönnt mal eine Pause!",
    "Muss mir kurz einen Iced Coffee holen, dann können wir weiterreden.",
    "Können wir das hybrid machen? Ich will nächste Woche remote arbeiten.",
    "Das ist der Way, Leute! Ganz ehrlich!",
    "Ich kann nicht mehr, bin literally dead nach diesem Meeting.",
    "Yassss, endlich jemand der's versteht!",
    "Ist das jetzt Pflicht oder kann man das ghosten?",
    "Muss man dazu wirklich eine E-Mail schreiben? Gibt's da keine App?",
    "Wieso sind unsere Server so sus? IT muss mal updaten!",
    "Bin ich die Hauptcharakterin oder warum muss ich das machen?",
    "Ich bin mir sicher, das ist ein Skill issue bei der Geschäftsführung.",
    "Touch grass, Leute! Wir brauchen mal frische Luft!",
    "Ist einfach served, dieses Projekt. Wird mega!",
    "Okay aber real talk - wann gibt's hier mal echtes WLAN?",
    "Wir sollten einen Company-Podcast starten, da würd ich easy mittalken.",
    "Die Kultur hier ist einfach ein Mood.",
    "Irgendwie ist das alles sehr random geplant.",
    "Einfach vibes and inshaAllah für dieses Projekt.",
    "Das Meeting könnte auch ein E-Mail sein, for real.",
    "TikTok erreicht die junge Zielgruppe effektiver als LinkedIn",
    "Mikro-Learning-Formate steigern die Aufmerksamkeit",
    "Eine App für den Azubi-Austausch wäre sinnvoll",
    "Videoformate sind besser als PDF-Anleitungen",
    "Die Vier-Tage-Woche erhöht nachweislich die Produktivität",
    "Mentale Gesundheit sollte im Ausbildungsplan integriert sein",
    "Instagram als Recruiting-Kanal wird unterschätzt",
    "Wir sollten mehr mit Infografiken statt mit Text arbeiten",
    "VR-Training ist die Zukunft der Azubi-Ausbildung",
    "Nachhaltigkeit muss in jedem Ausbildungsmodul berücksichtigt werden",
    "Barrierefreie Kommunikation verbessert den Wissenstransfer",
    "Gaming-Elemente steigern die Lernmotivation",
    "Kontinuierliches Feedback ist wichtiger als Jahresgespräche",
    "Podcasts eignen sich gut für Lernthemen unterwegs",
    "Hybride Modelle bieten mehr Flexibilität in der Ausbildung",
    "Ein vibe check vor Meetings würde die Stimmung verbessern",
    "Das ist nicht der move, Boomer-Content zu posten",
    "Können wir mal ein Meeting ohne main character energy machen?",
    "Der onboarding-Prozess ist lowkey stressig",
    "Unsere social media Strategie ist nicht very cash money",
    "Die Work-Life-Balance ist nicht bussin", 
    "Ist es für real so schwer, nachhaltige Entscheidungen zu treffen?",
    "Brauche ein side hustle zum Azubi-Gehalt tbh",
    "Die Meetings geben major red flag vibes",
    "No cap, Betriebsräder sind eine gute Idee",
    "Der Dresscode ist straight up outdated",
    "Lowkey, wir müssen das Thema noch besprechen.",
    "Der CEO ist so mid, aber whatever.",
    "Digga, ich versteh diese Statistiken nicht.",
    "Ist einfach based, dieses Projekt. Wird lit!",
    "No cap, das ist ein guter Plan!",
    "Sheesh, die Deadline ist ja morgen schon!",
    "Bin kinda overwhelmed mit den Tasks rn.",
    "Das Meeting ist ein Vibe.",
    "Können wir schneller machen? Meine Energy ist am dippen.",
    "This ain't it, chief. Wir brauchen einen besseren Plan.",
    "Slay! Dieser Vorschlag killt es!",
    "Anyways... Was steht als nächstes an?",
    "Das ist so ein Boomer-Move, sorry not sorry.",
    "Wir sollten eine Slack-Gruppe dafür machen, E-Mails sind old school.",
    "Gib mir mal die ✨Essentials✨ des Projekts.",
    "No cap, dieses Meeting ist zu lang",
    "Das ist literally so cringe",
    "Vibe check: Warum sind alle so stressed?",
    "Ich bin so done mit diesem Projekt",
    "Sheesh, diese Deadline ist unmöglich",
    "Main character energy vom Chef heute",
    "Das ist so ein Boomer Move",
    "Slay! Diese Idee ist fire",
    "Real talk, wir müssen effizienter werden",
    "Ist einfach not it, diese Strategie",
    "Bin kinda overwhelmed mit all den Tasks",
    "Okay but like, können wir das digital machen?",
    "This ain't it, chief",
    "Ist ein Skill Issue bei der Umsetzung",
    "Ich bin literally dead nach diesem Meeting",
    "Yeet diese veralteten Prozesse aus dem Fenster",
    "Das hat major red flag vibes",
    "Fr fr, wir brauchen besseres WLAN",
    "Die Work-Life-Balance ist nicht bussin",
    "Ist der Dresscode ein social experiment?",
    "Betriebsräder? Based. Autos? Cringe.",
    "Digga, ich check diese Tabelle null",
    "Warum ghosten alle meine Slack-Messages?",
    "Können wir einen Podcast statt einem Meeting machen?",
    "Lowkey stressed über die Deadline",
    "Die Meetings geben pure NPC Energy",
    "Wir müssen mehr auf TikTok posten",
    "Das ist ein serve, ehrlich",
    "Touch grass, Leute! Wir brauchen frische Ideen",
    "Highkey muss das Marketing verbessert werden",
    "Kommt halt anders auf den social media team vibe an",
    "Bisschen sus, wie das Budget verteilt wird",
    "Muss man wirklich eine Email schreiben? Gibt's da keine App?",
    "Die Excel-Tabelle hat mich traumatisiert, fr",
    "Ist der Obstkorb ein joke? Wo sind die açai bowls?",
    "Gib mir mal die ✨Essentials✨ des Projekts",
    "Brauche einen emotional support Hund im Büro",
    "Warum sind meetings immer so early? Not slay",
    "Du bist so valid mit diesem Vorschlag",
    "Living for diese Präsentation, period",
    "Ist mir zu corporate, brauche mehr vibes",
    "Der CEO hat keine Ahnung, iykyk",
    "Wann kriegen wir eigentlich einen TikTok account?",
    "Ihr wollt mich gaslighten mit dieser Deadline",
    "Die IT gibt zero Efford",
    "Hat jemand einen spare Iced Coffee?",
    "Trag ich jeans oder sweatpants zur Präsentation?",
    "Meine mental health kann das nicht verkraften",
    "Ich brauche eine Kamera für meinen content",
    "Das ist so millennial behavior",
    "Das ist so cringe",
    "Sheesh, der Vorschlag ist wild",
    "No cap, die Zahlen sind sus",
    "Digga, das ist voll wyld",
    "Ehrenlos, wie die das handhaben",
    "Slay! Das ist ein guter Plan",
    "Siuuu, endlich Fortschritt",
    "Yeet die alten Prozesse raus",
    "Bruder muss los, Kaffeepause",
    "Isso, voll nachvollziehbar",
    "Safe, mache ich",
    "Mashallah, diese Präsentation",
    "Vallah, keine Ahnung",
    "Boah, unnötig kompliziert",
    "Rischtisch, genau so",
    "Das ist main character energy",
    "So based, endlich jemand sagt's",
    "Lowkey cringe wie die das machen",
    "Kann nicht relatieren",
    "Bin lost, kann das jemand erklären?",
    "Muss kurz afk, Handy checken",
    "Ratio! Das ist ein besserer Vorschlag",
    "Kein Front, aber das ist nicht der Move",
    "Macher, danke für die Erklärung",
    "Wer hat das gedroppt? Wilde Idee",
    
    // Apple/MacOS Kritik
    "MacOS ist für professionelle Softwareentwicklung völlig ungeeignet.",
    "Apple-Geräte sind heillos überteuert für das, was sie bieten.",
    "Echte Entwickler nutzen Linux, nicht MacOS.",
    "Die Apple Hardware-Abhängigkeit ist ein Entwicklungshindernis.",
    "MacOS Berechtigungssystem ist ein Albtraum für Entwickler.",
    "Windows ist für Entwicklung deutlich nutzerfreundlicher als MacOS.",
    "Die Apple-Ecosystem-Lock-In-Strategie behindert offene Entwicklung.",
    "Auf MacOS dauert die Einrichtung einer Entwicklungsumgebung ewig.",
    "Apple priorisiert Design über Funktionalität, darum ist es unbrauchbar für Entwickler.",
    "Docker auf MacOS? Eine absolute Qual und Performance-Katastrophe!",
    "Die Apple Silicon Chips sind mit vielen Entwicklertools nicht kompatibel.",
    "Apple-Hardware ist für den Preis absolut unterdimensioniert.",
    "Der App Store ist ein bürokratischer Albtraum für Entwickler.",
    "XCode ist das langsamste und instabilste IDE auf dem Markt.",
    "Auf MacOS fehlen essentielle Entwicklertools, die auf Linux Standard sind.",
    "Der Terminal in MacOS ist nur eine schlechte Linux-Imitation.",
    "Apple-Upgrades machen regelmäßig Entwicklungsumgebungen kaputt.",
    "Die geschlossene Architektur von Apple verhindert echte Innovation.",
    "Linux ist der Standard für Server – warum sollte man auf MacOS entwickeln?",
    "Die Paketverwaltung unter MacOS ist ein schlechter Witz.",
    
    // Cursor und KI Kritik (neu)
    "Cursor stürzt ab, sobald ich mehr als drei Dateien gleichzeitig öffne.",
    "Diese KI-Vorschläge sind völliger Unsinn für unseren Technologie-Stack.",
    "Ich musste den KI-Code vollständig überarbeiten, das hat mehr Zeit gekostet als selbst zu schreiben.",
    "Ich möchte eine Faustregel: Kein KI-generierter Code in kritischen Komponenten.",
    "Cursor nennt sich IDE, ist aber eher ein aufgeblasener Texteditor.",
    "Die KI halluziniert APIs, die nicht existieren, und erzeugt Sicherheitslücken.",
    "Cursor erfüllt nicht einmal die grundlegendsten Anforderungen an eine IDE.",
    "Mit Cursor bezahlen wir dafür, dass unser Code an fremde Server geschickt wird.",
    "Mein Code-Review bestand zu 80% aus Fehlerbehebung von KI-generiertem Code.",
    "Die KI hat Funktionen falsch benannt und komplett falsche Imports erstellt.",
    "Wir sollten einen 'KI-Bullshit-Bingo' für Meetings einführen.",
    "Die Prompt-Engineering-Kosten übersteigen den Nutzen der KI.",
    "Die KI hat meinen Datenbank-Code durch Halluzinationen zerstört.",
    "Ich brauche echte Code-Navigation und Debugging, nicht nur ChatGPT in einer hübschen Hülle.",
    "Cursor verspricht Produktivität, macht uns aber tatsächlich langsamer.",
    "Die KI-Abos werden immer teurer für immer weniger Nutzen.",
    "90% unserer Cursor-Nutzung besteht aus Versuchen, die KI zu korrigieren.",
    "Die Lizenzkosten für eine echte IDE wären günstiger als die Fehlerkosten durch KI-Code.",
    "Der Stundensatz für 'KI-Prompt-Optimierung' ist höher als für Programmierung.",
    "Selbst nach perfekten Prompts liefert die KI immer noch mangelhaften Code.",
    "Visual Studio Code ist kostenlos und macht alles besser als Cursor.",
    "Cursor ist das perfekte Tool für Leute, die nicht programmieren können.",
    "Ich hatte heute drei Cursor-Abstürze, die meine Änderungen gelöscht haben.",
    "Die KI verwechselt unsere eigenen APIs mit externen Libraries.",
    "Die Code-Vorschläge der KI sind wie eine Glücksspiel – manchmal hilfreich, oft katastrophal.",
    "Cursor ist ein Marketing-Gag, kein professionelles Werkzeug für Entwickler.",
    "Ich wette, die KI würde diesen Meeting-Satz auch generieren.",
    "Die Stromkosten von KI-generierten Funktionen stehen in keinem Verhältnis zum Nutzen.",
    "KI-Assistenten verstehen nicht einmal die grundlegendste Architektur unserer Anwendung.",
    "An welchem Punkt geben wir zu, dass wir mit KI mehr Zeit vergeuden als sparen?",
    "Unsere Junior-Entwickler lernen schlechte Praktiken von der KI.",
    "Jedem Bug, den die KI löst, fügt sie drei neue hinzu.",
    "In der Zeit, die ich mit Prompt-Engineering verbringe, hätte ich den Code dreimal selbst schreiben können."
  ],
  
  // Alle Schrei-Phrasen in einer Liste
  shouting: [
    // Allgemeine Schrei-Phrasen
    "Das ist inakzeptabel",
    "Wir haben keine Zeit mehr",
    "Das hätte schon letzte Woche fertig sein sollen",
    "Das können wir uns nicht leisten",
    "Die Deadline ist morgen",
    "Das ist nicht, was ich bestellt habe",
    "Wir verlieren Kunden",
    "Die Zahlen stimmen nicht",
    "Niemand hat mich informiert",
    "Das kann nicht dein Ernst sein",
    "Wer ist dafür verantwortlich",
    "Das ist ein Desaster",
    "Das ist kompletter Unsinn!",
    "So kommen wir nie zu einem Ergebnis!",
    "Jetzt reicht es mir aber!",
    "Ich werde das so nicht unterschreiben!",
    "Da müssen Sie mich falsch verstanden haben!",
    "Das können Sie doch nicht ernst meinen!",
    "Sie widersprechen sich permanent!",
    "Das habe ich von Anfang an gesagt!",
    "Moment mal, so war das nicht abgesprochen!",
    "Das ist absolut inakzeptabel!",
    "Ich lasse mich hier nicht unterbrechen!",
    "Diese Diskussion führt zu nichts!",
    "Das ist doch lächerlich!",
    "Wir drehen uns im Kreis!",
    "Mit Verlaub, das ist Schwachsinn!",
    "Ich protestiere entschieden!",
    "Das ist ein klarer Verstoß gegen die Vereinbarung!",
    "Ich bin fassungslos!",
    "Das werden wir so nicht akzeptieren!",
    "Ich will das im Protokoll festhalten!",
    "Hören Sie endlich auf, mich zu unterbrechen!",
    "Wir sollten zur Sachlichkeit zurückkehren!",
    "Das grenzt an Arbeitsverweigerung!",
    "Sie verdrehen die Tatsachen!",
    "Das ist doch Augenwischerei!",
    "Wir müssen die Reißleine ziehen!",
    "Da platzt mir gleich der Kragen!",
    "Das ist eine Farce!",
    "Ich fordere einen Beschluss hierzu!",
    "Das ist außerhalb Ihrer Kompetenz!",
    "Wer hat das denn entschieden?",
    "Seit wann machen wir das so?",
    "Das kann doch wohl nicht wahr sein!",
    "Ich erhebe formellen Einspruch!",
    "Das ist eine Unterstellung!",
    
    // Mobility/Betriebsrad Schrei-Phrasen
    "Ich will sofort ein Betriebsrad",
    "Der Obstkorb ist schon wieder leer",
    "Die Klimaanlage ist kaputt",
    "Die Arbeitsbelastung ist unmenschlich",
    "Ich brauche eine Gehaltserhöhung",
    "Das Betriebsrad wurde gestohlen",
    "Wer hat mein Betriebsrad beschädigt",
    "Die Rückenmassage ist ausgefallen",
    "Ich will einen höhenverstellbaren Schreibtisch",
    "Die Fahrradwerkstatt ist nie besetzt",
    "Die Ladestationen sind immer belegt",
    "Wann kommen endlich die neuen Betriebsräder",
    "Mein Parkplatz wurde schon wieder blockiert",
    "Ich finde nie einen freien Parkplatz",
    "Der Firmenwagen ist drei Monate überfällig",
    "Ich will auch einen Dienstwagen haben",
    "Die Tiefgarage ist komplett überfüllt",
    "Warum haben die Manager die besten Parkplätze",
    "Mein Auto wurde auf dem Firmenparkplatz beschädigt",
    "Die Ladestation ist wieder defekt",
    "Ich brauche einen größeren Firmenwagen",
    "Das Parkplatzmanagement ist eine Katastrophe",
    "Ich zahle nicht für einen Mitarbeiterparkplatz",
    "Die neuen E-Autos kommen viel zu spät",
    
    // GenZ Schrei-Phrasen
    "Die WLAN-Verbindung ist schon wieder weg",
    "Der Kaffee hier schmeckt wie Spülwasser",
    "Ich habe noch kein Feedback zu meiner Präsentation",
    "Das ist doch total boomer",
    "Wir brauchen endlich einen Discord-Server",
    "Die Ausbildungsinhalte sind komplett veraltet",
    "Niemand beantwortet meine Slack-Nachrichten",
    "Der TikTok-Account ist peinlich umgesetzt",
    "Das Azubi-Gehalt reicht vorne und hinten nicht",
    "Die Vier-Tage-Woche funktioniert überall sonst",
    "Die Verbotskultur hier ist unerträglich",
    "Die mentale Gesundheit wird komplett ignoriert",
    "No cap, das Meeting ist voll unnötig",
    "Slay, ich habe das Projekt in der Hälfte der Zeit fertig",
    "Fr fr, die Arbeitszeiten sind nicht vibing",
    "Das ist so cringe wie ihr das Thema angeht",
    "Sheesh, schon wieder Überstunden",
    "Der Obstkorb braucht dringend ein Update - wo sind die Açai-Beeren?",
    "Ich kann nicht mit diesem legacy System arbeiten, istg",
    "Warum ist die Mittagspause nicht flexibel? So sus",
    "Die Company braucht mehr side quests für Azubis",
    "Yeet die alten Prozesse aus dem Fenster",
    "Der Dresscode ist literally not it",
    "Based take: Wir brauchen mehr remote Tage",
    "This ain't it chief, die Prozesse sind komplett kaputt",
    "Bin literally am sterben durch diese Meetings",
    "Ain't no way ihr denkt ich arbeite Freitags",
    "Touch grass, niemand nutzt E-Mail in 2023",
    "Die Deadline hat mich ghosted, nicht umgekehrt",
    "Rizz up die Arbeitskultur oder ich bin out",
    "Der Betriebsrat gibt pure NPC energy",
    "Warum so tryhard bei Kleinigkeiten",
    "Betriebsräder? That's mid, gebt uns E-Scooter",
    "Main character behavior vom Management",
    "Ist der Dresscode ein social experiment",
    "Die legacy Systeme sind uncooked frfr",
    "DAS IST SO EIN BOOMER-MOVE!",
    "ICH BIN BUCHSTÄBLICH AM AUSRASTEN!",
    "WARUM SIND WIR NICHT AUF TIKTOK?",
    "DIE DEADLINES SIND KOMPLETT SUS!",
    "WIR BRAUCHEN MEHR REMOTE-OPTIONEN!",
    "DIESE TECHNIK IST STRAIGHT UP TRASH!",
    "DIGGA, DAS GEHT GAR NICHT KLAR!",
    "SHEESH, WIE KANN MAN SO LOST SEIN?",
    "DAS IST EIN KOMPLETTER VIBE-KILLER!",
    "SORRY NOT SORRY, ABER DAS IST CRINGE!",
    "KANN BITTE JEMAND DEN WLAN-ROUTER NEUSTARTEN?",
    "ICH KANN NICHT MEHR, ICH BIN LITERALLY DEAD!",
    "HASHTAG BETRIEBSRATPROBLEME!",
    "OK BOOMER, ABER HÖRT MAL ZU!",
    "WER HAT DIESE BASIC IDEE APPROVED?",
    "SLAY! ABER HÖRT MIR ENDLICH ZU!",
    "ICH BIN SO DONE MIT DIESEM MEETING!",
    "DAS IST NICHT DER VIBE, DEN WIR BRAUCHEN!",
    "NO CAP, DAS IST DER SCHLECHTESTE PLAN EVER!",
    "WARUM HABEN WIR KEIN COLD BREW IM OFFICE?",
    "DAS IST LITERALLY SO CRINGE",
    "ICH KANN NICHT MEHR MIT DIESEN BOOMER-PROZESSEN",
    "SHEESH WAS WAR DAS FÜR EINE ENTSCHEIDUNG",
    "DIGGA WIR BRAUCHEN BESSERES WLAN HIER",
    "STOP THE CAP, DAS IST NICHT DER MOVE",
    "SLAY QUEEN SLAY! ABER HÖRT MICH MAL AN",
    "THIS AIN'T IT CHIEF! WIR MÜSSEN DAS ÄNDERN",
    "KEIN FRONT ABER DAS IST KOMPLETTER NONSENSE",
    "ICH BIN LITERALLY AM AUSRASTEN",
    "YEET DIESE IDEE DIREKT IN DEN MÜLL",
    "DAS HAT MAJOR RED FLAG VIBES",
    "FR FR WARUM HÖRT MIR KEINER ZU",
    "ICH BIN SO DONE MIT DIESEM PROJEKT",
    "EMOTIONAL DAMAGE! WAS WAR DAS FÜR EIN FEEDBACK",
    "TOUCH GRASS LEUTE! WIR LEBEN NICHT MEHR IN 2010",
    "MAIN CHARACTER ENERGY HIER ABER KEINER MACHT WAS",
    "BASED? NEIN, DAS IST KOMPLETT MID",
    "KEIN CAP, DAS IST DER SCHLECHTESTE PLAN EVER",
    "ICH BRAUCH EINEN VIBE CHECK NACH DIESEM MEETING",
    "NOT ME DEALING MIT DIESEM WORKFLOW",
    "WARUM SIND WIR NICHT AUF TIKTOK?",
    "IST DAS EINE CHALLENGE ODER WAS?",
    "HAT HIER JEMAND DEN ICED COFFEE WEGGEKLAUT?",
    "WIR BRAUCHEN EINE FOUR-DAY-WORK-WEEK",
    "DIE CORPORATE ENERGY IST ZU STRONG HIER",
    
    // Apple/MacOS Kritik Schrei-Phrasen
    "APPLE-HARDWARE IST KOMPLETT ÜBERBEWERTET!",
    "WIR VERSCHWENDEN UNSER BUDGET MIT DIESEN TEUREN MACS!",
    "MACOS IST FÜR ENTWICKLER EINE ABSOLUTE KATASTROPHE!",
    "DIE PERFORMANCE VON DOCKER AUF MACOS IST EIN WITZ!",
    "JEDES UPDATE VON MACOS ZERSTÖRT UNSERE ENTWICKLUNGSUMGEBUNG!",
    "APPLE ZWINGT UNS IN IHR GESCHLOSSENES ÖKOSYSTEM!",
    "MIT WINDOWS ODER LINUX WÄREN WIR DOPPELT SO PRODUKTIV!",
    "XCODE IST DIE HÖLLE AUF ERDEN!",
    "DIESE STÄNDIGEN BERECHTIGUNGSDIALOGE MACHEN MICH WAHNSINNIG!",
    "WIR ZAHLEN TAUSENDE FÜR MACS UND KÖNNEN NICHT MAL ANSTÄNDIG DARAUF ENTWICKELN!",
    "MIT DEM PREIS EINES MACBOOK PRO KÖNNTEN WIR DREI WINDOWS-MASCHINEN KAUFEN!",
    "APPLE HAT KEINE AHNUNG WAS ENTWICKLER WIRKLICH BRAUCHEN!",
    "DER APP STORE IST DAS BÜROKRATISCHSTE SYSTEM DER WELT!",
    "WARUM KÖNNEN WIR NICHT EINFACH AUF VERNÜNFTIGEN LINUX-MASCHINEN ARBEITEN?",
    "DIE APPLE-HARDWARE ÜBERHITZT BEI JEDER KOMPLEXEN ENTWICKLUNGSAUFGABE!",
    "ICH KANN DIESEN HIPSTER-KULT UM APPLE NICHT MEHR ERTRAGEN!",
    "VIRTUELLE MASCHINEN AUF MACOS LAUFEN WIE EINE SCHNECKE!",
    "DIESE MAC-TASTATUREN SIND FÜR PROGRAMMIERER VÖLLIG UNGEEIGNET!",
    "APPLE ZWINGT UNS ZAHLREICHEN WORKAROUNDS FÜR EINFACHSTE AUFGABEN!",
    "WIR VERLIEREN STUNDEN MIT DER FEHLERBEHEBUNG VON MACOS-SPEZIFISCHEN PROBLEMEN!",
    
    // Cursor und KI Kritik-Schrei-Phrasen (neu)
    "CURSOR IST KEINE IDE, ES IST EIN SPIELZEUG!",
    "DIE KI HALLUZINIERT MEHR ALS EIN STARTUP-GRÜNDER NACH DREI TAGEN OHNE SCHLAF!",
    "WIR HABEN 20.000 EURO FÜR DIESE NUTZLOSE KI-LIZENZ AUSGEGEBEN!",
    "WARUM FUNKTIONIERT DIE CODE-VERVOLLSTÄNDIGUNG NICHT EINMAL BEI UNSEREN EIGENEN KLASSEN?!",
    "CURSOR HAT GERADE MEINEN GESAMTEN ARBEITSTAG GELÖSCHT!",
    "DIE KI HAT UNSERE DATENBANK DURCH FALSCHEN CODE ZERSTÖRT!",
    "WIR BRAUCHEN EINEN DEBUGGER, KEINEN CHATBOT MIT SYNTAX-HIGHLIGHTING!",
    "ICH MUSSTE DEN GANZEN KI-CODE WEGWERFEN UND NEU SCHREIBEN!",
    "DAS IST DAS DRITTE MAL HEUTE, DASS CURSOR ABSTÜRZT!",
    "UNSERE TECHNISCHEN SCHULDEN DURCH KI-CODE SIND EXPLODIERT!",
    "WER HAT DIESEN CURSOR-SCHWACHSINN ANGESCHAFFT?!",
    "DIESE KI KENNT NICHT EINMAL DIE BASICS UNSERER EIGENEN ARCHITEKTUR!",
    "CURSOR BENUTZT MEHR RAM ALS UNSER GESAMTES PRODUKTIONSSYSTEM!",
    "ICH BIN KEIN PROMPT-ENGINEER, ICH BIN ENTWICKLER!",
    "DIE KI GENERIERT CODE, DER VOR 10 JAHREN VERALTET WAR!",
    "WARUM EMPFIEHLT UNS DIE KI LIBRARIES, DIE LÄNGST DEPRECATED SIND?!",
    "VSCODE IST KOSTENLOS UND 100-MAL STABILER ALS CURSOR!",
    "DAS IST KEINE FUNKTIONSVORSCHLAG, DAS IST DIGITALER MÜLL!",
    "ICH HABE DIE KI DREI MAL NACH DERSELBEN FUNKTION GEFRAGT UND DREI VÖLLIG VERSCHIEDENE ANTWORTEN BEKOMMEN!",
    "WIR BEZAHLEN UNSEREN CODE MIT UNSERER PRIVATSPHÄRE!",
    "DER GANZE CODE WIRD AUF FREMDE SERVER HOCHGELADEN - HALLO DSGVO-VERSTOSS!",
    "WIR SIND ZU ALPHA-TESTERN EINER HALBGAREN KI DEGRADIERT WORDEN!",
    "DIE KI HAT GERADE EINEN SICHERHEITSFEHLER GENERIERT, DER UNS HACKEN KÖNNTE!",
    "CURSOR VERSPRICHT PRODUKTIVITÄT UND LIEFERT INSTABILITÄT!",
    "NEIN, CURSOR IST KEINE INNOVATION, ES IST EIN MISSGLÜCKTES EXPERIMENT!",
    "CURSOR GEHÖRT IN DIE SPIELZEUGABTEILUNG, NICHT IN PROFESSIONELLE ENTWICKLUNGSUMGEBUNGEN!",
    "ICH MUSS MICH BEI DEN KOLLEGEN ENTSCHULDIGEN, WEIL ICH CURSOR EMPFOHLEN HABE!",
    "LASST UNS ZURÜCK ZU PROFESSIONELLEN TOOLS WECHSELN!",
    "DAS IST DIE LETZTE WOCHE, DIE ICH MIT DIESEM KI-SPIELZEUG VERSCHWENDE!",
    "ECHTE SOFTWAREENTWICKLUNG BRAUCHT ECHTE WERKZEUGE, NICHT EIN AUFGEMOTZTES CHATGPT!"
  ]
};

// Hilfsfunktion, um zufällige Phrasen zu erhalten
const getRandomGenZPhrases = (count = 5) => {
  // Da wir keine spezifischen GenZ-Phrasen mehr haben, nehmen wir zufällige normale Phrasen
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * meetingPhrases.normal.length);
    result.push(meetingPhrases.normal[randomIndex]);
  }
  
  return result;
};

// Hilfsfunktion, um zufällige Teilnehmer-Phrasen zu erhalten
const getRandomParticipantPhrases = (count = 5) => {
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * meetingPhrases.normal.length);
    result.push(meetingPhrases.normal[randomIndex]);
  }
  
  return result;
};

// Exports für andere Dateien
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    meetingPhrases,
    getRandomGenZPhrases,
    getRandomParticipantPhrases
  };
} 
// Für Browser-Umgebung als globale Variablen verfügbar machen
else if (typeof window !== 'undefined') {
  window.meetingPhrases = meetingPhrases;
  window.getRandomGenZPhrases = getRandomGenZPhrases;
  window.getRandomParticipantPhrases = getRandomParticipantPhrases;
} 