_# Anleitung: Automatisierung des KI-Quiz mit Make.com_

_Dieses Dokument beschreibt, wie Sie die Automatisierung für Ihr KI-Reifegrad-Quiz in Make.com einrichten. Das Szenario empfängt die Daten aus dem HTML-Prototyp, lässt eine personalisierte Empfehlung von GPT erstellen und versendet diese automatisch per E-Mail._

_## Übersicht des Make.com-Szenarios_

_Das Szenario besteht aus drei Hauptmodulen:_

_1.  **_Webhooks (Custom Webhook)_**: Dient als Auslöser. Es empfängt die Quiz-Daten, die vom HTML-Formular gesendet werden._
_2.  **_OpenAI (Create a Completion)_**: Nimmt die Daten vom Webhook entgegen, fügt sie in einen speziellen Prompt ein und lässt GPT eine personalisierte E-Mail formulieren._
_3.  **_Gmail (Send an email)_**: Versendet die von GPT generierte Antwort an den Nutzer._

_## Schritt 1: Webhook als Auslöser erstellen_

_1.  Erstellen Sie ein neues Szenario in Make.com._
_2.  Wählen Sie als erstes Modul **_Webhooks_** und dann den Auslöser **_Custom webhook_**._
_3.  Klicken Sie auf **_Add_**, um einen neuen Webhook zu erstellen. Geben Sie ihm einen aussagekräftigen Namen (z.B. "Webnativ Quiz")._
_4.  Kopieren Sie die angezeigte Webhook-URL. Diese URL muss in die `script.js`-Datei des HTML-Prototyps eingefügt werden (in der Funktion `makeWebhookCall`)._
_5.  Klicken Sie auf **_Re-determine data structure_**, damit Make auf Testdaten wartet. Füllen Sie das HTML-Quiz einmal komplett aus und senden Sie es ab. Make.com erkennt dadurch automatisch die Datenstruktur (userName, companyName etc.)._

_## Schritt 2: OpenAI (GPT) zur Textgenerierung einrichten_

_1.  Fügen Sie ein neues Modul hinzu und wählen Sie **_OpenAI_**._
_2.  Wählen Sie die Aktion **_Create a Completion_**._
_3.  Verbinden Sie Ihren OpenAI-Account. Sie benötigen einen API-Schlüssel von platform.openai.com._
_4.  Konfigurieren Sie die Aktion wie folgt:_
    *   **_Method_**: `Create a Chat Completion`
    *   **_Model_**: `gpt-4-turbo` (oder ein anderes aktuelles Modell)
    *   **_Messages_**: Fügen Sie eine "Role: `System`" und eine "Role: `User`" hinzu.
        *   **_System-Nachricht_**: `Du bist ein Experte für die Digitalisierung von Kanzleien und agierst als Berater für die Firma Webnativ.`
        *   **_User-Nachricht_**: Kopieren Sie den untenstehenden Prompt in dieses Feld. Ersetzen Sie die Platzhalter `[Daten vom Webhook]` durch die entsprechenden Variablen aus dem Webhook-Modul (z.B., `1. userName`, `1. companyName`)._

_### Prompt für das OpenAI-Modul_

_```text_
_Erstelle eine personalisierte KI-Potenzialanalyse als E-Mail für:_

_**_Kontaktdaten:_**_
_- Name: {{1.userName}}_
_- Kanzlei: {{1.companyName}}_
_- Webseite: {{1.website}}_
_- E-Mail: {{1.userEmail}}_

_**_Analyse-Ergebnisse:_**_
_- Mitarbeiterzahl: {{1.teamSize}}_
_- Gewählter Optimierungsbereich: {{1.selectedPath}}_
_- Spezifischer Schmerzpunkt: {{1.pathDetail}}_

_**_Anweisungen für die E-Mail:_**_
_Erstelle basierend auf diesen Informationen eine professionelle und persönliche E-Mail._

_**_Betreff:_** Ihre persönliche KI-Potenzialanalyse von Webnativ_

_**_Inhalt:_**_
_1.  **_Persönliche Anrede:_** Sprich den Nutzer direkt mit seinem Namen an (z.B. "Sehr geehrter Herr {{1.userName}},")._
_2.  **_Zusammenfassung:_** Fasse die identifizierte Herausforderung basierend auf dem "Optimierungsbereich" und dem "Schmerzpunkt" kurz und prägnant zusammen. Zeige Verständnis für die Situation._
_3.  **_Konkrete Handlungsempfehlungen:_** Formuliere 2-3 konkrete, umsetzbare Empfehlungen. Leite diese Empfehlungen direkt zu den Webnativ-Produkten über:_
    *   _Wenn der Pfad `workflow` war, fokussiere dich auf den **_Workflow-Agenten_**._
    *   _Wenn der Pfad `communication` war, stelle den **_Voice-Agenten_** in den Vordergrund._
    *   _Wenn der Pfad `legal` war, präsentiere die **_Web-App für Anwälte_** als Lösung._
_4.  **_Abschluss & Call-to-Action:_** Beende die E-Mail mit einem freundlichen Gruß und einem klaren Call-to-Action, z.B. das Angebot eines kostenlosen und unverbindlichen Beratungsgesprächs._

_**_Stil & Ton:_** Professionell, beratend, lösungsorientiert und nicht zu werblich. Der Mehrwert für den potenziellen Kunden muss im Vordergrund stehen._
_```_

_## Schritt 3: Gmail zum Versenden der E-Mail konfigurieren_

_1.  Fügen Sie ein weiteres Modul hinzu und wählen Sie **_Gmail_**._
_2.  Wählen Sie die Aktion **_Send an email_**._
_3.  Verbinden Sie Ihren Google-Account._
_4.  Konfigurieren Sie die Felder:_
    *   **_To_**: Fügen Sie hier die E-Mail-Variable aus dem Webhook-Modul ein (`1. userEmail`)._
    *   **_Subject_**: Sie können den Betreff aus der GPT-Antwort extrahieren oder manuell eintragen (z.B. "Ihre persönliche KI-Potenzialanalyse von Webnativ")._
    *   **_Content_**: Fügen Sie hier die Antwort (den generierten E-Mail-Text) aus dem OpenAI-Modul ein (`choices[].message.content`)._
    *   **_From_**: Wählen Sie Ihre gewünschte Absenderadresse._

_## Schritt 4: Testen und Aktivieren_

_1.  Speichern Sie Ihr Szenario._
_2.  Klicken Sie auf **_Run once_**._
_3.  Füllen Sie das HTML-Quiz erneut aus und senden Sie es ab._
_4.  Beobachten Sie, wie die Daten durch das Make-Szenario fließen. Wenn alles korrekt konfiguriert ist, sollten Sie kurz darauf die personalisierte E-Mail in Ihrem Posteingang (der im Quiz angegebenen Adresse) finden._
_5.  Wenn alles funktioniert, aktivieren Sie das Szenario, damit es dauerhaft läuft._

_---_

_Mit diesen Schritten haben Sie einen voll funktionsfähigen Prototyp Ihres Lead-Magneten erstellt. Sie können den HTML/CSS/JS-Code nun auf Ihrer Webseite einbinden und mit dem Sammeln von qualifizierten Leads beginnen._
_
