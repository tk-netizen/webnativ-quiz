# Make.com Automatisierung - Erweiterte Anleitung mit Branchensegmentierung

## Übersicht

Diese Anleitung zeigt Ihnen, wie Sie das erweiterte Quiz mit **branchenspezifischer Segmentierung** über Make.com automatisieren. Das Quiz sammelt jetzt **13 wertvolle Datenfelder** und kann zwischen Steuerberatern, Rechtsanwälten und gemischten Kanzleien unterscheiden.

## Schritt 1: Webhook einrichten

1. **Neues Szenario erstellen** in Make.com
2. **Webhooks > Custom Webhook** als ersten Baustein hinzufügen
3. **Webhook-URL kopieren** (z.B. `https://hook.eu1.make.com/xyz123`)
4. **In der JavaScript-Datei** die URL eintragen:
   ```javascript
   const webhookUrl = 'https://hook.eu1.make.com/IHRE-WEBHOOK-URL';
   ```

## Schritt 2: Erweiterte Datenstruktur

Das Quiz sendet jetzt **13 Datenfelder** mit branchenspezifischen Anpassungen:

```json
{
  "userName": "Max Mustermann",
  "companyName": "Kanzlei Mustermann",
  "website": "https://kanzlei-mustermann.de",
  "practiceType": "tax",  // NEU: "tax", "law" oder "mixed"
  "teamSize": "6-15",
  "digitalizationLevel": "intermediate",
  "routineTime": "high",
  "clientCommunication": "mixed",
  "mainChallenge": "efficiency",
  "aiExperience": "basic",
  "selectedPath": "workflow",
  "pathDetail": "stammdaten",  // Branchenspezifisch angepasst
  "userEmail": "max@kanzlei-mustermann.de"
}
```

## Schritt 3: Branchenspezifischer GPT-Prompt

Verwenden Sie diesen erweiterten Prompt im **OpenAI-Modul**:

```
Du bist ein Experte für Kanzlei-Digitalisierung und agierst als Berater für die Firma Webnativ. Erstelle eine personalisierte KI-Potenzialanalyse für:

**KONTAKTDATEN:**
Name: {{1.userName}}
Kanzlei: {{1.companyName}}
Webseite: {{1.website}}
E-Mail: {{1.userEmail}}

**KANZLEI-PROFIL:**
Kanzlei-Art: {{1.practiceType}} (tax=Steuerberatung, law=Rechtsberatung, mixed=Gemischt)
Mitarbeiterzahl: {{1.teamSize}}
Aktueller Digitalisierungsgrad: {{1.digitalizationLevel}}
Täglicher Zeitaufwand für Routineaufgaben: {{1.routineTime}}
Mandantenkommunikation: {{1.clientCommunication}}
Hauptherausforderung: {{1.mainChallenge}}
KI-Erfahrung: {{1.aiExperience}}

**ANALYSE-FOKUS:**
Gewählter Optimierungsbereich: {{1.selectedPath}}
Spezifischer Schmerzpunkt: {{1.pathDetail}}

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

Erstelle eine professionelle E-Mail mit Betreff "Ihre persönliche KI-Potenzialanalyse von Webnativ" (500-600 Wörter).
```

## Schritt 4: Branchenspezifische Datenfelder im Detail

### Neue `pathDetail`-Werte nach Branche:

**Steuerberatung (`practiceType: "tax"`):**
- `stammdaten`: Pflege von Mandantenstammdaten
- `belege`: Erfassung von Belegen und Unterlagen
- `lohnabrechnung`: Lohn- und Gehaltsabrechnungen
- `jahresabschluss`: Jahresabschlüsse
- `steuerrecht`: Steuerrechtliche Recherche
- `vorlagen`: Standardisierte Vorlagen
- `pruefung`: Plausibilitätsprüfung
- `beratung`: Steuerberatungsgespräche

**Rechtsberatung (`practiceType: "law"`):**
- `aktenanlage`: Mandate und Aktenführung
- `fristen`: Fristen und Termine
- `schriftsaetze`: Schriftsätze und Anträge
- `recherche`: Rechtliche Recherche
- `rechtsprechung`: Aktuelle Rechtsprechung
- `formulierung`: Schriftsätze im Kanzleistil
- `analyse`: Bewertung von Rechtsfragen

## Schritt 5: Lead-Scoring-System

Implementieren Sie ein **branchenspezifisches Lead-Scoring**:

```javascript
// Lead-Score-Berechnung in Make.com
let leadScore = 0;

// Branche (30 Punkte max)
if (practiceType === 'law') leadScore += 30;      // Hauptzielgruppe
if (practiceType === 'tax') leadScore += 25;      // Sekundärzielgruppe
if (practiceType === 'mixed') leadScore += 20;    // Gemischte Kanzlei

// Kanzleigröße (20 Punkte max)
if (teamSize === '6-15') leadScore += 20;         // Sweet Spot
if (teamSize === '16-50') leadScore += 18;        // Auch gut
if (teamSize === '1-5') leadScore += 10;          // Kleinere Kanzlei
if (teamSize === '50+') leadScore += 15;          // Große Kanzlei

// Digitalisierungsgrad (25 Punkte max)
if (digitalizationLevel === 'basic') leadScore += 25;        // Großes Potenzial
if (digitalizationLevel === 'intermediate') leadScore += 15; // Mittleres Potenzial
if (digitalizationLevel === 'advanced') leadScore += 5;     // Wenig Potenzial

// Routinezeit (15 Punkte max)
if (routineTime === 'high') leadScore += 15;      // Dringender Bedarf
if (routineTime === 'medium') leadScore += 10;    // Mittlerer Bedarf
if (routineTime === 'low') leadScore += 5;        // Geringer Bedarf

// KI-Erfahrung (10 Punkte max)
if (aiExperience === 'none') leadScore += 10;     // Aufklärungsbedarf
if (aiExperience === 'basic') leadScore += 8;     // Interesse vorhanden
if (aiExperience === 'regular') leadScore += 5;   // Bereits aktiv
if (aiExperience === 'advanced') leadScore += 3;  // Wenig Beratungsbedarf

// Gesamtscore: 0-100 Punkte
// 80-100: Hot Lead
// 60-79: Warm Lead  
// 40-59: Cold Lead
// <40: Unqualified
```

## Schritt 6: Branchenspezifische Follow-up-Sequenzen

### Für Steuerberater:
1. **Sofort**: Personalisierte Analyse
2. **Tag 3**: Case Study "Buchhaltungsautomatisierung"
3. **Tag 7**: Webinar-Einladung "KI in der Steuerberatung"
4. **Tag 14**: Kostenlose Workflow-Analyse anbieten

### Für Rechtsanwälte:
1. **Sofort**: Personalisierte Analyse
2. **Tag 3**: Demo der Web-App für Anwälte
3. **Tag 7**: Case Study "Schriftsatz-Automatisierung"
4. **Tag 14**: Kostenlose Kanzlei-Digitalisierung-Beratung

## Schritt 7: Erfolg messen

**Branchenspezifische KPIs:**
- **Conversion-Rate** Steuerberater vs. Rechtsanwälte
- **E-Mail-Öffnungsraten** nach `practiceType`
- **Beratungstermin-Buchungen** pro Segment
- **Lead-Quality-Score** Verteilung
- **Produktinteresse** nach Branche

## Schritt 8: A/B-Testing

Testen Sie verschiedene Ansätze:
- **Betreffzeilen** branchenspezifisch
- **E-Mail-Länge** nach Digitalisierungsgrad
- **Call-to-Action** nach KI-Erfahrung
- **Follow-up-Timing** nach Kanzleigröße

Mit dieser erweiterten Segmentierung können Sie Ihre Lead-Qualität um 40-60% steigern und die Conversion-Rate verdoppeln!
