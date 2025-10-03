# Anleitung: Automatisierung des erweiterten KI-Quiz mit Make.com

Dieses Dokument beschreibt, wie Sie die Automatisierung für Ihr erweiterten KI-Reifegrad-Quiz in Make.com einrichten. Das Szenario empfängt umfassende Daten aus dem HTML-Prototyp, lässt eine detaillierte personalisierte Empfehlung von GPT erstellen und versendet diese automatisch per E-Mail.

## Übersicht des Make.com-Szenarios

Das Szenario besteht aus drei Hauptmodulen:

1. **Webhooks (Custom Webhook)**: Dient als Auslöser. Es empfängt die erweiterten Quiz-Daten, die vom HTML-Formular gesendet werden.
2. **OpenAI (Create a Completion)**: Nimmt die Daten vom Webhook entgegen, fügt sie in einen speziellen Prompt ein und lässt GPT eine hochpersonalisierte E-Mail formulieren.
3. **Gmail (Send an email)**: Versendet die von GPT generierte Antwort an den Nutzer.

## Erweiterte Datenstruktur

Das Quiz sammelt jetzt folgende Informationen:

### Grunddaten
- `userName`: Name des Teilnehmers
- `companyName`: Name der Kanzlei
- `website`: Webseite der Kanzlei (optional)
- `userEmail`: E-Mail-Adresse für die Analyse
- `teamSize`: Anzahl der Mitarbeiter (1-5, 6-15, 16-50, 50+)

### Analyse-Daten
- `digitalizationLevel`: Aktueller Digitalisierungsgrad (basic, intermediate, advanced)
- `routineTime`: Täglicher Zeitaufwand für Routineaufgaben (low, medium, high)
- `clientCommunication`: Art der Mandantenkommunikation (traditional, mixed, digital)
- `mainChallenge`: Größte betriebliche Herausforderung (capacity, efficiency, quality, growth)
- `aiExperience`: Bisherige KI-Erfahrung (none, basic, regular, advanced)

### Fokus-Daten
- `selectedPath`: Gewählter Optimierungsbereich (workflow, communication, legal)
- `pathDetail`: Spezifischer Schmerzpunkt je nach Pfad

## Schritt 1: Webhook als Auslöser erstellen

1. Erstellen Sie ein neues Szenario in Make.com.
2. Wählen Sie als erstes Modul **Webhooks** und dann den Auslöser **Custom webhook**.
3. Klicken Sie auf **Add**, um einen neuen Webhook zu erstellen. Geben Sie ihm einen aussagekräftigen Namen (z.B. "Webnativ Quiz Extended").
4. Kopieren Sie die angezeigte Webhook-URL. Diese URL muss in die `script.js`-Datei des HTML-Prototyps eingefügt werden (in der Funktion `makeWebhookCall`).
5. Klicken Sie auf **Re-determine data structure**, damit Make auf Testdaten wartet. Füllen Sie das HTML-Quiz einmal komplett aus und senden Sie es ab. Make.com erkennt dadurch automatisch die erweiterte Datenstruktur.

## Schritt 2: OpenAI (GPT) zur erweiterten Textgenerierung einrichten

1. Fügen Sie ein neues Modul hinzu und wählen Sie **OpenAI**.
2. Wählen Sie die Aktion **Create a Completion**.
3. Verbinden Sie Ihren OpenAI-Account. Sie benötigen einen API-Schlüssel von platform.openai.com.
4. Konfigurieren Sie die Aktion wie folgt:
   - **Method**: `Create a Chat Completion`
   - **Model**: `gpt-4-turbo` (oder ein anderes aktuelles Modell)
   - **Messages**: Fügen Sie eine "Role: `System`" und eine "Role: `User`" hinzu.
     - **System-Nachricht**: `Du bist ein Experte für die Digitalisierung von Kanzleien und agierst als Berater für die Firma Webnativ. Du erstellst hochpersonalisierte Analysen basierend auf umfassenden Kanzlei-Daten.`
     - **User-Nachricht**: Kopieren Sie den untenstehenden erweiterten Prompt in dieses Feld.

### Erweiterter Prompt für das OpenAI-Modul

```text
Erstelle eine personalisierte KI-Potenzialanalyse als professionelle E-Mail für:

**KONTAKTDATEN:**
- Name: {{1.userName}}
- Kanzlei: {{1.companyName}}
- Webseite: {{1.website}}
- E-Mail: {{1.userEmail}}

**KANZLEI-PROFIL:**
- Mitarbeiterzahl: {{1.teamSize}}
- Aktueller Digitalisierungsgrad: {{1.digitalizationLevel}}
- Täglicher Zeitaufwand für Routineaufgaben: {{1.routineTime}}
- Mandantenkommunikation: {{1.clientCommunication}}
- Hauptherausforderung: {{1.mainChallenge}}
- KI-Erfahrung: {{1.aiExperience}}

**ANALYSE-FOKUS:**
- Gewählter Optimierungsbereich: {{1.selectedPath}}
- Spezifischer Schmerzpunkt: {{1.pathDetail}}

**ANWEISUNGEN:**
Erstelle basierend auf diesen umfassenden Informationen eine professionelle und hochpersonalisierte E-Mail.

**BETREFF:** Ihre persönliche KI-Potenzialanalyse von Webnativ

**E-MAIL-STRUKTUR:**

1. **Persönliche Anrede:** 
   - Nutze den Namen und zeige Verständnis für die spezifische Situation
   - Referenziere die Kanzleigröße und den aktuellen Digitalisierungsgrad

2. **Situationsanalyse:** 
   - Fasse die wichtigsten Erkenntnisse zusammen
   - Verbinde Digitalisierungsgrad, Herausforderungen und Zeitaufwand
   - Zeige Verständnis für die gewählten Prioritäten

3. **Konkrete Handlungsempfehlungen:**
   - Basierend auf dem gewählten Pfad und spezifischen Problem
   - Berücksichtige den aktuellen Digitalisierungsgrad und die KI-Erfahrung
   - Leite zu den passenden Webnativ-Produkten über:
     * **Workflow-Agenten**: Für interne Prozesse, Automatisierung, Effizienzsteigerung
     * **Voice-Agenten**: Für Mandantenkommunikation, 24/7-Erreichbarkeit, Entlastung
     * **Web-App für Anwälte**: Für Schriftsätze, Recherche, Fallbearbeitung, Konsistenz

4. **Potenzial-Aufzeigung:**
   - Zeige konkrete, messbare Verbesserungen auf
   - Nutze die Informationen über Routinezeit für Berechnungen
   - Verbinde mit der Hauptherausforderung

5. **Nächste Schritte:**
   - Lade zu einem kostenlosen, unverbindlichen Beratungsgespräch ein
   - Erwähne, dass die Lösung auf die spezifische Kanzleisituation zugeschnitten wird

**PERSONALISIERUNGS-REGELN:**
- Bei `digitalizationLevel: basic` → Sanfter Einstieg, Grundlagen erklären
- Bei `digitalizationLevel: advanced` → Direkt zu fortgeschrittenen Lösungen
- Bei `aiExperience: none` → KI-Vorteile erklären, Ängste nehmen
- Bei `aiExperience: advanced` → Auf bestehende Erfahrungen aufbauen
- Bei `routineTime: high` → Zeitersparnis stark betonen
- Bei `mainChallenge: capacity` → Entlastung und Skalierung fokussieren
- Bei `mainChallenge: efficiency` → Prozessoptimierung hervorheben

**STIL:** Professionell, beratend, lösungsorientiert, vertrauensbildend. Der konkrete Mehrwert steht im Vordergrund.
**LÄNGE:** 450-550 Wörter
```

## Schritt 3: Gmail zum Versenden der erweiterten E-Mail konfigurieren

1. Fügen Sie ein weiteres Modul hinzu und wählen Sie **Gmail**.
2. Wählen Sie die Aktion **Send an email**.
3. Verbinden Sie Ihren Google-Account.
4. Konfigurieren Sie die Felder:
   - **To**: `{{1.userEmail}}`
   - **Subject**: `Ihre persönliche KI-Potenzialanalyse von Webnativ`
   - **Content**: `{{2.choices[].message.content}}` (die GPT-generierte E-Mail)
   - **From**: Ihre gewünschte Absenderadresse

## Schritt 4: Erweiterte Tests und Optimierung

### Testszenarien
Testen Sie das Szenario mit verschiedenen Kombinationen:

1. **Einsteiger-Kanzlei**: Grundausstattung, keine KI-Erfahrung, hoher Routineaufwand
2. **Fortgeschrittene Kanzlei**: Gute Digitalisierung, erste KI-Versuche, Effizienz-Fokus
3. **Große Kanzlei**: Sehr fortgeschritten, regelmäßige KI-Nutzung, Skalierungs-Herausforderungen

### Qualitätskontrolle
- Prüfen Sie, ob GPT alle Datenfelder sinnvoll nutzt
- Achten Sie auf die Personalisierung basierend auf Digitalisierungsgrad und KI-Erfahrung
- Stellen Sie sicher, dass die Produktempfehlungen zum gewählten Pfad passen

## Schritt 5: Aktivierung und Monitoring

1. Speichern Sie Ihr Szenario.
2. Führen Sie mehrere Testläufe durch.
3. Aktivieren Sie das Szenario für den Live-Betrieb.
4. Überwachen Sie die ersten Durchläufe und optimieren Sie bei Bedarf den GPT-Prompt.

## Erweiterte Funktionen (Optional)

### Lead-Scoring
Sie können basierend auf den gesammelten Daten ein Lead-Scoring implementieren:
- Hohe Priorität: `routineTime: high` + `digitalizationLevel: basic` + `teamSize: 6+`
- Mittlere Priorität: Gemischte Werte
- Niedrige Priorität: `digitalizationLevel: advanced` + `aiExperience: advanced`

### CRM-Integration
Erweitern Sie das Szenario um ein CRM-Modul (z.B. HubSpot, Pipedrive), um die Leads automatisch zu erfassen und zu kategorisieren.

### Follow-up-Automatisierung
Richten Sie zeitverzögerte Follow-up-E-Mails ein, falls der Lead nicht innerhalb von 3-5 Tagen antwortet.

---

Mit dieser erweiterten Automatisierung haben Sie einen hochprofessionellen Lead-Magneten, der detaillierte Einblicke in die Bedürfnisse Ihrer potenziellen Kunden liefert und entsprechend personalisierte Empfehlungen ausspricht.
