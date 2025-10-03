# KI-Reifegrad-Quiz für Kanzleien | Webnativ

Ein interaktiver Lead-Magnet-Quiz, der KMU-Kanzleien (Steuerberater & Rechtsanwälte) dabei hilft, ihren KI-Digitalisierungsgrad zu bewerten und personalisierte Handlungsempfehlungen zu erhalten.

## 🎯 Überblick

Dieses Quiz führt potenzielle Kunden durch eine strukturierte Analyse ihrer aktuellen Digitalisierungssituation und generiert automatisch personalisierte Empfehlungen für die drei Webnativ-Kernprodukte:

- **Workflow-Agenten**: Automatisierung interner Prozesse
- **Voice-Agenten**: Intelligente Mandantenkommunikation 
- **Web-App für Anwälte**: KI-gestützte Schriftsatzerstellung

## 🚀 Features

- **Responsive Design**: Optimiert für Desktop und mobile Geräte
- **Dynamische Pfade**: Intelligente Fragenlogik basierend auf Nutzerantworten
- **Personalisierung**: Anpassung der Inhalte an Name und Kanzleigröße
- **Make.com Integration**: Automatische Verarbeitung und E-Mail-Versand
- **GPT-Integration**: KI-generierte, personalisierte Handlungsempfehlungen

## 📁 Projektstruktur

```
webnativ-quiz/
├── index.html          # Haupt-HTML-Datei mit Quiz-Struktur
├── style.css           # CSS-Styling und responsive Design
├── script.js           # JavaScript-Logik für Quiz-Navigation
├── Anleitung.md        # Detaillierte Setup-Anleitung für Make.com
└── README.md           # Diese Datei
```

## 🛠️ Installation & Setup

### 1. Lokaler Test
```bash
# Repository klonen
git clone https://github.com/IHR-USERNAME/webnativ-quiz.git
cd webnativ-quiz

# index.html in Browser öffnen
open index.html  # macOS
start index.html # Windows
```

### 2. Make.com Automatisierung einrichten

Folgen Sie der detaillierten Anleitung in `Anleitung.md` um:
- Webhook-Empfang zu konfigurieren
- OpenAI/GPT-Integration einzurichten
- Gmail-Versand zu automatisieren

### 3. Live-Deployment

**Option A: GitHub Pages (kostenlos)**
1. Gehen Sie zu Repository Settings
2. Scrollen Sie zu "Pages"
3. Wählen Sie "Deploy from a branch" → "main"
4. Ihr Quiz ist verfügbar unter: `https://IHR-USERNAME.github.io/webnativ-quiz`

**Option B: Eigene Website**
- Laden Sie die Dateien auf Ihren Webserver hoch
- Passen Sie die Webhook-URL in `script.js` an

## ⚙️ Konfiguration

### Webhook-URL anpassen
In `script.js`, Zeile ~95:
```javascript
const webhookUrl = 'https://hook.eu1.make.com/IHRE-WEBHOOK-URL';
```

### Styling anpassen
Die Farbpalette und das Design können in `style.css` angepasst werden. Das aktuelle Design verwendet:
- Primärfarben: Blau-Violett Gradient (#667eea → #764ba2)
- Hintergrund: Gradient-Design
- Schriftart: Segoe UI (System-Font)

## 📊 Quiz-Ablauf

1. **Willkommensseite**: Einführung und Nutzen-Kommunikation
2. **Persönliche Daten**: Name, Kanzlei, Webseite, Mitarbeiterzahl
3. **Hauptfrage**: Auswahl des Optimierungsbereichs (3 Pfade)
4. **Vertiefung**: Spezifische Fragen je nach gewähltem Pfad
5. **E-Mail-Eingabe**: Lead-Generierung
6. **Bestätigung**: Erfolgsmeldung und nächste Schritte

## 🔧 Technische Details

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Responsive**: Mobile-First Design mit CSS Grid/Flexbox
- **Animationen**: CSS-Transitions für smooth UX
- **API-Integration**: Fetch API für Webhook-Calls
- **Validierung**: Client-side Eingabevalidierung

## 📈 Analytics & Tracking

Für Conversion-Tracking können Sie folgende Tools integrieren:
- Google Analytics 4
- Facebook Pixel
- LinkedIn Insight Tag

Fügen Sie die entsprechenden Tracking-Codes in `index.html` hinzu.

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie eine Pull Request

## 📄 Lizenz

Dieses Projekt ist für die interne Nutzung bei Webnativ bestimmt.

## 📞 Support

Bei Fragen zur Implementierung oder Anpassung:
- E-Mail: info@webnativ.de
- Dokumentation: Siehe `Anleitung.md`

---

**Entwickelt für Webnativ** - Ihre Digital-Agentur für KI-gestützte Kanzlei-Digitalisierung
