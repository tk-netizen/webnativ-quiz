// Quiz-Daten und Zustand
let quizData = {
    userName: '',
    companyName: '',
    website: '',
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
    'team-size',
    'digitalization-level',    // Index 4
    'routine-time',           // Index 5
    'client-communication',   // Index 6
    'main-challenge',         // Index 7
    'ai-experience',          // Index 8
    'main-question',          // Index 9
    'workflow-path',          // Index 10
    'communication-path',     // Index 11
    'legal-path',            // Index 12
    'email-screen',          // Index 13
    'results-screen'         // Index 14
];

// Screen-Navigation
function nextScreen() {
    const current = document.getElementById(screens[currentScreen]);
    current.classList.remove('active');
    
    // Spezielle Logik für Pfad-Auswahl
    if (currentScreen === 9) { // main-question
        // Springe zum entsprechenden Pfad basierend auf der Auswahl
        if (quizData.selectedPath === 'workflow') {
            currentScreen = 10; // workflow-path
        } else if (quizData.selectedPath === 'communication') {
            currentScreen = 11; // communication-path
        } else if (quizData.selectedPath === 'legal') {
            currentScreen = 12; // legal-path
        }
    } else if (currentScreen >= 10 && currentScreen <= 12) {
        // Von den Pfad-Screens direkt zur E-Mail-Eingabe
        currentScreen = 13; // email-screen
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
    
    // Hauptfrage personalisieren
    if (currentScreen === 9 && userName && teamSize) {
        const mainQuestion = document.getElementById('personalizedMainQuestion');
        mainQuestion.textContent = `${userName}, wenn Sie einen Bereich Ihrer Kanzlei mit ${teamSize} Mitarbeitern sofort verbessern könnten, welcher wäre das?`;
    }
    
    // E-Mail-Titel personalisieren
    if (currentScreen === 13 && userName) {
        const emailTitle = document.getElementById('personalizedEmailTitle');
        emailTitle.textContent = `Fast geschafft, ${userName}!`;
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

**STIL:** Professionell, beratend, lösungsorientiert, nicht zu werblich. Der Mehrwert für den Kunden steht im Vordergrund.
**LÄNGE:** 400-500 Wörter`;

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
