// Quiz-Daten und Zustand
let quizData = {
    userName: '',
    companyName: '',
    website: '',
    practiceType: '',        // Neu: Steuerberater, Rechtsanwalt oder gemischt
    teamSize: '',
    digitalizationLevel: '',
    routineTime: '',
    clientCommunication: '',
    mainChallenge: '',
    aiExperience: '',
    selectedPath: '',
    pathDetail: '',
    userEmail: ''
};

let currentScreen = 0;
const screens = [
    'welcome-screen',
    'personal-data', 
    'company-info',
    'practice-type',          // Index 3 - Neu hinzugefügt
    'team-size',              // Index 4
    'digitalization-level',   // Index 5
    'routine-time',           // Index 6
    'client-communication',   // Index 7
    'main-challenge',         // Index 8
    'ai-experience',          // Index 9
    'main-question',          // Index 10
    'workflow-path',          // Index 11
    'communication-path',     // Index 12
    'legal-path',            // Index 13
    'email-screen',          // Index 14
    'results-screen'         // Index 15
];

// Screen-Navigation
function nextScreen() {
    const current = document.getElementById(screens[currentScreen]);
    current.classList.remove('active');
    
    // Spezielle Logik für Pfad-Auswahl
    if (currentScreen === 10) { // main-question
        // Springe zum entsprechenden Pfad basierend auf der Auswahl
        if (quizData.selectedPath === 'workflow') {
            currentScreen = 11; // workflow-path
        } else if (quizData.selectedPath === 'communication') {
            currentScreen = 12; // communication-path
        } else if (quizData.selectedPath === 'legal') {
            currentScreen = 13; // legal-path
        }
    } else if (currentScreen >= 11 && currentScreen <= 13) {
        // Von den Pfad-Screens direkt zur E-Mail-Eingabe
        currentScreen = 14; // email-screen
    } else {
        currentScreen++;
    }
    
    const next = document.getElementById(screens[currentScreen]);
    next.classList.add('active');
    
    // Personalisierung aktualisieren
    updatePersonalization();
}

// Personalisierung der Inhalte
function updatePersonalization() {
    const userName = quizData.userName;
    const teamSize = quizData.teamSize;
    const practiceType = quizData.practiceType;
    
    // Branchenspezifische Anpassungen
    if (practiceType) {
        updateBranchSpecificContent(practiceType);
    }
    
    // Hauptfrage personalisieren
    if (currentScreen === 10 && userName && teamSize) {
        const mainQuestion = document.getElementById('personalizedMainQuestion');
        mainQuestion.textContent = `${userName}, wenn Sie einen Bereich Ihrer Kanzlei mit ${teamSize} Mitarbeitern sofort verbessern könnten, welcher wäre das?`;
    }
    
    // E-Mail-Titel personalisieren
    if (currentScreen === 14 && userName) {
        const emailTitle = document.getElementById('personalizedEmailTitle');
        emailTitle.textContent = `Fast geschafft, ${userName}!`;
    }
}

// Branchenspezifische Inhalte anpassen
function updateBranchSpecificContent(practiceType) {
    // Routineaufgaben-Frage anpassen
    if (currentScreen === 6) { // routine-time
        const question = document.getElementById('routineTimeQuestion');
        const explanation = document.getElementById('routineTimeExplanation');
        
        if (practiceType === 'tax') {
            question.textContent = 'Wie viel Zeit verbringt Ihr Team täglich mit Routineaufgaben?';
            explanation.textContent = 'Denken Sie an Mandantenstammdaten, Belege erfassen, Lohnabrechnungen, Jahresabschlüsse.';
        } else if (practiceType === 'law') {
            question.textContent = 'Wie viel Zeit verbringt Ihr Team täglich mit Routineaufgaben?';
            explanation.textContent = 'Denken Sie an Aktenanlage, Fristenüberwachung, Schriftsatzerstellung, Recherche.';
        }
    }
    
    // Mandantenkommunikation anpassen
    if (currentScreen === 7) { // client-communication
        const question = document.getElementById('clientCommQuestion');
        const explanation = document.getElementById('clientCommExplanation');
        
        if (practiceType === 'tax') {
            question.textContent = 'Wie läuft die Kommunikation mit Ihren Mandanten hauptsächlich ab?';
            explanation.textContent = 'Besonders während der Steuerperioden ist eine effiziente Kommunikation entscheidend.';
        } else if (practiceType === 'law') {
            question.textContent = 'Wie läuft die Kommunikation mit Ihren Mandanten hauptsächlich ab?';
            explanation.textContent = 'Gerade bei laufenden Verfahren ist eine schnelle und zuverlässige Kommunikation wichtig.';
        }
    }
    
    // Hauptherausforderung anpassen
    if (currentScreen === 8) { // main-challenge
        const question = document.getElementById('mainChallengeQuestion');
        const explanation = document.getElementById('mainChallengeExplanation');
        
        if (practiceType === 'tax') {
            question.textContent = 'Was ist aktuell Ihre größte betriebliche Herausforderung?';
            explanation.textContent = 'Denken Sie an Steuerfristen, Mandantenbetreuung, Digitalisierung der Buchhaltung.';
        } else if (practiceType === 'law') {
            question.textContent = 'Was ist aktuell Ihre größte betriebliche Herausforderung?';
            explanation.textContent = 'Denken Sie an Fallbearbeitung, Recherche-Aufwand, Mandantenakquise, Prozessführung.';
        }
    }
    
    // Workflow-Details anpassen
    if (currentScreen === 11 && practiceType) { // workflow-path
        updateWorkflowOptions(practiceType);
    }
    
    // Kommunikations-Details anpassen
    if (currentScreen === 12 && practiceType) { // communication-path
        updateCommunicationOptions(practiceType);
    }
    
    // Legal-Details anpassen
    if (currentScreen === 13 && practiceType) { // legal-path
        updateLegalOptions(practiceType);
    }
}

// Workflow-Optionen branchenspezifisch anpassen
function updateWorkflowOptions(practiceType) {
    const container = document.getElementById('workflowOptions');
    const question = document.getElementById('workflowDetailQuestion');
    
    if (practiceType === 'tax') {
        question.textContent = 'Welche dieser Aufgaben bindet bei Ihnen die meisten Ressourcen?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectWorkflowDetail('stammdaten')">Pflege und Aktualisierung von Mandantenstammdaten</button>
            <button class="option-btn" onclick="selectWorkflowDetail('belege')">Erfassung und Sortierung von Belegen und Unterlagen</button>
            <button class="option-btn" onclick="selectWorkflowDetail('lohnabrechnung')">Erstellung von Lohn- und Gehaltsabrechnungen</button>
            <button class="option-btn" onclick="selectWorkflowDetail('jahresabschluss')">Vorbereitung und Erstellung von Jahresabschlüssen</button>
        `;
    } else if (practiceType === 'law') {
        question.textContent = 'Welche dieser Aufgaben frisst aktuell die meiste Zeit?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectWorkflowDetail('aktenanlage')">Anlage neuer Mandate und Aktenführung</button>
            <button class="option-btn" onclick="selectWorkflowDetail('fristen')">Überwachung von Fristen und Terminen</button>
            <button class="option-btn" onclick="selectWorkflowDetail('schriftsaetze')">Erstellung von Schriftsätzen und Anträgen</button>
            <button class="option-btn" onclick="selectWorkflowDetail('recherche')">Rechtliche Recherche und Fallvorbereitung</button>
        `;
    } else { // mixed
        question.textContent = 'Welche dieser Aufgaben frisst aktuell die meiste Zeit?';
        // Behalte die ursprünglichen allgemeinen Optionen
    }
}

// Kommunikations-Optionen branchenspezifisch anpassen
function updateCommunicationOptions(practiceType) {
    const container = document.getElementById('communicationOptions');
    const question = document.getElementById('communicationDetailQuestion');
    
    if (practiceType === 'tax') {
        question.textContent = 'Was ist dabei die größte Herausforderung für Ihr Team?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectCommunicationDetail('steuerperioden')">Überlastung während der Steuerperioden (März, Mai, Juli)</button>
            <button class="option-btn" onclick="selectCommunicationDetail('unterlagen')">Ständige Nachfragen nach fehlenden Unterlagen und Belegen</button>
            <button class="option-btn" onclick="selectCommunicationDetail('termine')">Terminkoordination für Besprechungen und Unterschriften</button>
            <button class="option-btn" onclick="selectCommunicationDetail('status')">Mandanten fragen regelmäßig nach dem Status ihrer Steuererklärung</button>
        `;
    } else if (practiceType === 'law') {
        question.textContent = 'Was ist dabei die größte Herausforderung für Ihr Team?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectCommunicationDetail('dringlichkeit')">Mandanten erwarten sofortige Antworten bei dringenden Rechtsfragen</button>
            <button class="option-btn" onclick="selectCommunicationDetail('verfahrensstatus')">Ständige Nachfragen zum Status laufender Verfahren</button>
            <button class="option-btn" onclick="selectCommunicationDetail('termine')">Koordination von Gerichtsterminen und Besprechungen</button>
            <button class="option-btn" onclick="selectCommunicationDetail('erreichbarkeit')">Mandanten beschweren sich über mangelnde Erreichbarkeit</button>
        `;
    } else { // mixed
        question.textContent = 'Was ist dabei die größte Herausforderung für Ihr Team?';
        // Behalte die ursprünglichen allgemeinen Optionen
    }
}

// Legal-Optionen branchenspezifisch anpassen
function updateLegalOptions(practiceType) {
    const container = document.getElementById('legalOptions');
    const question = document.getElementById('legalDetailQuestion');
    
    if (practiceType === 'tax') {
        question.textContent = 'Wo sehen Sie den größten Hebel für eine Effizienzsteigerung?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectLegalDetail('steuerrecht')">Bei der Recherche aktueller steuerrechtlicher Änderungen</button>
            <button class="option-btn" onclick="selectLegalDetail('vorlagen')">Bei der Erstellung standardisierter Vorlagen und Checklisten</button>
            <button class="option-btn" onclick="selectLegalDetail('pruefung')">Bei der Plausibilitätsprüfung und Fehlersuche in Steuererklärungen</button>
            <button class="option-btn" onclick="selectLegalDetail('beratung')">Bei der Vorbereitung von Steuerberatungsgesprächen</button>
        `;
    } else if (practiceType === 'law') {
        question.textContent = 'Wo sehen Sie den größten Hebel für eine Effizienzsteigerung?';
        container.innerHTML = `
            <button class="option-btn" onclick="selectLegalDetail('recherche')">Bei der Recherche nach ähnlichen, bereits bearbeiteten Fällen</button>
            <button class="option-btn" onclick="selectLegalDetail('rechtsprechung')">Bei der Suche nach aktueller Rechtsprechung zu einem Fall</button>
            <button class="option-btn" onclick="selectLegalDetail('formulierung')">Beim Formulieren von Schriftsätzen im einheitlichen Kanzleistil</button>
            <button class="option-btn" onclick="selectLegalDetail('analyse')">Bei der Analyse und Bewertung komplexer Rechtsfragen</button>
        `;
    } else { // mixed
        question.textContent = 'Wo sehen Sie den größten Hebel für eine Effizienzsteigerung?';
        // Behalte die ursprünglichen allgemeinen Optionen
    }
}

// Event Listeners für Eingabefelder
document.addEventListener('DOMContentLoaded', function() {
    // Name-Eingabe
    const nameInput = document.getElementById('userName');
    const nameNext = document.getElementById('nameNext');
    
    nameInput.addEventListener('input', function() {
        quizData.userName = this.value.trim();
        nameNext.disabled = quizData.userName.length < 2;
    });
    
    // Firmen-Eingabe
    const companyInput = document.getElementById('companyName');
    const websiteInput = document.getElementById('website');
    
    companyInput.addEventListener('input', function() {
        quizData.companyName = this.value.trim();
    });
    
    websiteInput.addEventListener('input', function() {
        quizData.website = this.value.trim();
    });
    
    // E-Mail-Eingabe
    const emailInput = document.getElementById('userEmail');
    const emailNext = document.getElementById('emailNext');
    
    emailInput.addEventListener('input', function() {
        quizData.userEmail = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailNext.disabled = !emailRegex.test(quizData.userEmail);
    });
});

// Kanzlei-Art auswählen
function selectPracticeType(type) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#practice-type .option-btn-large').forEach(btn => {
        btn.style.borderColor = '#e0e0e0';
        btn.style.background = 'white';
    });
    
    // Ausgewählten Button markieren
    event.target.style.borderColor = '#667eea';
    event.target.style.background = '#f8f9ff';
    quizData.practiceType = type;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 800);
}

// Team-Größe auswählen
function selectTeamSize(size) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#team-size .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.teamSize = size;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Digitalisierungsgrad auswählen
function selectDigitalizationLevel(level) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#digitalization-level .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.digitalizationLevel = level;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Routine-Zeit auswählen
function selectRoutineTime(time) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#routine-time .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.routineTime = time;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Mandantenkommunikation auswählen
function selectClientCommunication(communication) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#client-communication .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.clientCommunication = communication;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Hauptherausforderung auswählen
function selectMainChallenge(challenge) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#main-challenge .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.mainChallenge = challenge;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// KI-Erfahrung auswählen
function selectAIExperience(experience) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#ai-experience .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Ausgewählten Button markieren
    event.target.classList.add('selected');
    quizData.aiExperience = experience;
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Pfad auswählen
function selectPath(path) {
    quizData.selectedPath = path;
    
    // Alle Buttons zurücksetzen
    document.querySelectorAll('#main-question .option-btn-large').forEach(btn => {
        btn.style.borderColor = '#e0e0e0';
        btn.style.background = 'white';
    });
    
    // Ausgewählten Button markieren
    event.target.style.borderColor = '#667eea';
    event.target.style.background = '#f8f9ff';
    
    // Nach kurzer Verzögerung weiter
    setTimeout(() => {
        nextScreen();
    }, 800);
}

// Workflow-Details
function selectWorkflowDetail(detail) {
    quizData.pathDetail = detail;
    
    // Button-Feedback
    event.target.classList.add('selected');
    
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Kommunikations-Details
function selectCommunicationDetail(detail) {
    quizData.pathDetail = detail;
    
    // Button-Feedback
    event.target.classList.add('selected');
    
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Rechtliche Details
function selectLegalDetail(detail) {
    quizData.pathDetail = detail;
    
    // Button-Feedback
    event.target.classList.add('selected');
    
    setTimeout(() => {
        nextScreen();
    }, 500);
}

// Ergebnisse generieren
function generateResults() {
    // E-Mail bestätigen
    document.getElementById('confirmEmail').textContent = quizData.userEmail;
    
    // Simuliere API-Call für die Ergebnisgenerierung
    console.log('Quiz-Daten für Make.com/GPT:', quizData);
    
    // Hier würde normalerweise der Webhook zu Make.com ausgelöst werden
    // makeWebhookCall(quizData);
    
    nextScreen();
}

// Simulierte Make.com Webhook-Funktion
function makeWebhookCall(data) {
    // In der echten Implementierung würde hier der Aufruf zu Make.com erfolgen
    const webhookUrl = 'https://hook.eu1.make.com/your-webhook-url';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Make.com Response:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Erweiterte GPT-Prompt-Generierung mit allen neuen Daten
function generateGPTPrompt(data) {
    let prompt = `Du bist ein Experte für Kanzlei-Digitalisierung und agierst als Berater für die Firma Webnativ. Erstelle eine personalisierte KI-Potenzialanalyse für:

**KONTAKTDATEN:**
Name: ${data.userName}
Kanzlei: ${data.companyName}
Webseite: ${data.website}
E-Mail: ${data.userEmail}

**KANZLEI-PROFIL:**
Kanzlei-Art: ${data.practiceType} (tax=Steuerberatung, law=Rechtsberatung, mixed=Gemischt)
Mitarbeiterzahl: ${data.teamSize}
Aktueller Digitalisierungsgrad: ${data.digitalizationLevel}
Täglicher Zeitaufwand für Routineaufgaben: ${data.routineTime}
Mandantenkommunikation: ${data.clientCommunication}
Hauptherausforderung: ${data.mainChallenge}
KI-Erfahrung: ${data.aiExperience}

**ANALYSE-FOKUS:**
Gewählter Optimierungsbereich: ${data.selectedPath}
Spezifischer Schmerzpunkt: ${data.pathDetail}

**ANWEISUNGEN:**
Erstelle basierend auf diesen umfassenden Informationen eine professionelle und hochpersonalisierte E-Mail.

**BETREFF:** Ihre persönliche KI-Potenzialanalyse von Webnativ

**E-MAIL-STRUKTUR:**
1. **Persönliche Anrede:** Nutze den Namen und zeige, dass du die spezifische Situation verstanden hast
2. **Situationsanalyse:** Fasse die wichtigsten Erkenntnisse aus den Antworten zusammen (Digitalisierungsgrad, Herausforderungen, etc.)
3. **Konkrete Handlungsempfehlungen:** 
   - Basierend auf dem gewählten Pfad (${data.selectedPath}) und dem spezifischen Problem
   - Berücksichtige den aktuellen Digitalisierungsgrad und die KI-Erfahrung
   - Leite zu den passenden Webnativ-Produkten über:
     * Workflow-Agenten (für interne Prozesse und Automatisierung)
     * Voice-Agenten (für Mandantenkommunikation und Erreichbarkeit)
     * Web-App für Anwälte (für Schriftsätze, Recherche und Fallbearbeitung)
4. **Potenzial-Aufzeigung:** Zeige konkrete Verbesserungen auf (Zeitersparnis, Effizienzsteigerung, etc.)
5. **Call-to-Action:** Lade zu einem kostenlosen Beratungsgespräch ein

**BRANCHENSPEZIFISCHE REGELN:**
- Bei practiceType "tax" (Steuerberatung):
  * Fokus auf Steuerfristen, Mandantenstammdaten, Belege, Jahresabschlüsse
  * Betone Zeitersparnis während Steuerperioden (März, Mai, Juli)
  * Workflow-Agenten für Buchhaltungsautomatisierung hervorheben
  * Voice-Agenten für Entlastung bei Standardfragen zu Steuererklärungen
  
- Bei practiceType "law" (Rechtsberatung):
  * Fokus auf Fallbearbeitung, Recherche, Schriftsätze, Fristenüberwachung
  * Betone Effizienz bei Rechtsprechungsrecherche und Fallanalyse
  * Web-App für Anwälte als Hauptprodukt positionieren
  * Voice-Agenten für Mandantenbetreuung und Terminkoordination
  
- Bei practiceType "mixed" (Gemischte Kanzlei):
  * Ausgewogene Darstellung beider Bereiche
  * Betone Synergien zwischen Steuer- und Rechtsberatung
  * Alle drei Produkte gleichwertig präsentieren

**PERSONALISIERUNGS-REGELN:**
- Bei digitalizationLevel "basic" → Sanfter Einstieg, Grundlagen erklären
- Bei digitalizationLevel "advanced" → Direkt zu fortgeschrittenen Lösungen
- Bei aiExperience "none" → KI-Vorteile erklären, Ängste nehmen
- Bei aiExperience "advanced" → Auf bestehende Erfahrungen aufbauen
- Bei routineTime "high" → Zeitersparnis stark betonen
- Bei mainChallenge "capacity" → Entlastung und Skalierung fokussieren
- Bei mainChallenge "efficiency" → Prozessoptimierung hervorheben

**STIL:** Professionell, beratend, lösungsorientiert, nicht zu werblich. Der konkrete Mehrwert steht im Vordergrund.
**LÄNGE:** 500-600 Wörter`;

    return prompt;
}

// Erweiterte Debug-Funktion
function showQuizData() {
    console.log('Vollständige Quiz-Daten:', quizData);
    console.log('Aktueller Screen:', currentScreen, '(' + screens[currentScreen] + ')');
}

// Tastatur-Navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeScreen = document.querySelector('.screen.active');
        const primaryButton = activeScreen.querySelector('.btn-primary:not(:disabled)');
        if (primaryButton) {
            primaryButton.click();
        }
    }
});

// Smooth Scrolling für mobile Geräte
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Bei jedem Screen-Wechsel nach oben scrollen
const originalNextScreen = nextScreen;
nextScreen = function() {
    originalNextScreen();
    scrollToTop();
};

// Fortschrittsanzeige aktualisieren
function updateProgress() {
    const progressBars = document.querySelectorAll('.progress');
    const totalScreens = screens.length - 1; // Minus Willkommensseite
    const currentProgress = Math.round((currentScreen / totalScreens) * 100);
    
    progressBars.forEach(bar => {
        bar.style.width = currentProgress + '%';
    });
}
