// Quiz-Daten und Zustand
let quizData = {
    userName: '',
    companyName: '',
    website: '',
    teamSize: '',
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
    'main-question',
    'workflow-path',     // Index 5
    'communication-path', // Index 6  
    'legal-path',        // Index 7
    'email-screen',
    'results-screen'
];

// Screen-Navigation
function nextScreen() {
    const current = document.getElementById(screens[currentScreen]);
    current.classList.remove('active');
    
    // Spezielle Logik für Pfad-Auswahl
    if (currentScreen === 4) { // main-question
        // Springe zum entsprechenden Pfad basierend auf der Auswahl
        if (quizData.selectedPath === 'workflow') {
            currentScreen = 5; // workflow-path
        } else if (quizData.selectedPath === 'communication') {
            currentScreen = 6; // communication-path
        } else if (quizData.selectedPath === 'legal') {
            currentScreen = 7; // legal-path
        }
    } else if (currentScreen >= 5 && currentScreen <= 7) {
        // Von den Pfad-Screens direkt zur E-Mail-Eingabe
        currentScreen = 8; // email-screen
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
    if (currentScreen === 4 && userName && teamSize) {
        const mainQuestion = document.getElementById('personalizedMainQuestion');
        mainQuestion.textContent = `${userName}, wenn Sie einen Bereich Ihrer Kanzlei mit ${teamSize} Mitarbeitern sofort verbessern könnten, welcher wäre das?`;
    }
    
    // E-Mail-Titel personalisieren
    if (currentScreen === 8 && userName) {
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

// Beispiel-Funktion für GPT-Prompt-Generierung
function generateGPTPrompt(data) {
    let prompt = `Du bist ein Experte für Kanzlei-Digitalisierung. Erstelle eine personalisierte KI-Potenzialanalyse für:

Name: ${data.userName}
Kanzlei: ${data.companyName}
Webseite: ${data.website}
Mitarbeiterzahl: ${data.teamSize}
Hauptfokus: ${data.selectedPath}
Spezifisches Problem: ${data.pathDetail}

Basierend auf diesen Informationen, erstelle eine professionelle E-Mail mit:

1. Persönlicher Begrüßung
2. Zusammenfassung der identifizierten Herausforderungen
3. 2-3 konkrete Handlungsempfehlungen
4. Verweis auf die passenden Webnativ-Produkte:
   - Workflow-Agenten (für interne Prozesse)
   - Voice-Agenten (für Mandantenkommunikation)  
   - Web-App für Anwälte (für Schriftsätze und Recherche)
5. Call-to-Action für ein Beratungsgespräch

Ton: Professionell, beratend, lösungsorientiert
Länge: 300-400 Wörter`;

    return prompt;
}

// Debug-Funktion
function showQuizData() {
    console.log('Aktuelle Quiz-Daten:', quizData);
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
