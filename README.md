# salleyesmineClient Webprojekt

Dieses Webprojekt ermöglicht es Benutzern, einen Fragebogen zu beantworten, der ihre Gesundheit und Fitness bewertet. Basierend auf den Antworten erhalten die Benutzer eine detaillierte Rückmeldung zu ihrem Lebensstil. Es beinhaltet auch eine Verwaltung von Clients.

## Funktionen

1. *Accueil Seite*: Dies ist die Startseite, die zwei Hauptoptionen bietet:
   - *Formular ausfüllen*: Weiterleitung zum Fragebogenformular.
   - *Client-Liste anzeigen*: Weiterleitung zur Übersicht über alle gespeicherten Clients.
     ![Startseite](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_175612_localhost.jpeg?raw=true)

2. *Clients Seite*: Diese Seite listet alle gespeicherten Clients auf. Jeder Client kann bearbeitet oder gelöscht werden.
3. ![kundenliste](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_183957_localhost.jpeg?raw=true)

4. *Formular für Clients*: Auf dieser Seite können Benutzer ihre persönlichen Daten eingeben, wie Name, Geschlecht, Größe, Gewicht usw. Diese Daten werden anschließend zur Berechnung des idealen Gewichts und zur Ausgabe von Empfehlungen verwendet.
5. ![formClient](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_184510_localhost.jpeg)
6. ![Idealgewicht](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_184927_localhost.jpeg)

7. *Fragebogen Seite (Form Questions)*: Auf dieser Seite beantworten Benutzer eine Reihe von Fragen zu ihrem Lebensstil (Ernährung, Bewegung, Schlaf, Stressniveau, etc.). Basierend auf den Antworten wird ein Score berechnet und eine Gesundheitsbewertung ausgegeben.
8. ![formQuestions](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_18521_localhost.jpeg)
9. ![Ergebnis](https://github.com/Yas-maker29/Nes-project/blob/main/Bildschirmfoto_21-9-2025_185437_localhost.jpeg)

10. *Bearbeiten von Clients und Fragen*: Bestehende Clients können bearbeitet werden, sowohl ihre persönlichen Daten als auch ihre Antworten auf die Fragen. Änderungen werden in der Datenbank gespeichert.



## Verwendete Technologien und Tools

- *Angular*: Das Frontend des Projekts wurde mit Angular entwickelt, um eine reaktive Benutzeroberfläche und einfache Navigation zu ermöglichen. (Version  19.2.15)
- *TypeScript*: Die Anwendung wurde in TypeScript geschrieben, um eine statische Typisierung und eine bessere Entwicklungsumgebung zu bieten.
- *Bootstrap : Für das Design und die Benutzeroberfläche können CSS-Frameworks wie Bootstrap verwendet werden .
- *Backend (Node.js + Express)*: Ein Backend-Server (Express.js) ermöglicht die CRUD-Operationen auf den Client-Daten. Die Daten werden in einer MongoDB-Datenbank gespeichert.(node version  22.19.0 /  mangodb version 5.0.30)

## Verwendete Services

1. *SharedService (Frontend Service)*: Dieser Service kümmert sich um die Kommunikation zwischen der Frontend-Anwendung und dem Backend. Er ermöglicht das Abrufen, Erstellen, Bearbeiten und Löschen von Clients über HTTP-Anfragen.
   - addClient(client: any): Fügt einen neuen Client hinzu.
   - getClients(): Holt eine Liste aller Clients.
   - getClientById(id: string): Holt einen bestimmten Client basierend auf der ID.
   - updateClient(id: string, client: any): Aktualisiert die Daten eines Clients.
   - deleteClient(id: string): Löscht einen Client basierend auf der ID.

## CRUD-Operationen

Die grundlegenden CRUD-Operationen (Create, Read, Update, Delete) finden an folgenden Stellen statt:

1. *Create (Erstellen)*:
   - *FormClientComponent*: Benutzer können neue Clients hinzufügen, indem sie ihre Daten eingeben. Diese Daten werden über den SharedService an das Backend gesendet und gespeichert.
   
2. *Read (Lesen)*:
   - *ClientsComponent*: Zeigt eine Liste aller gespeicherten Clients an. Der SharedService wird verwendet, um die Daten vom Backend abzurufen.
   - *EditProcessComponent* und *FormQuestionsComponent*: Beim Bearbeiten eines Clients werden die Daten über getClientById(id) abgerufen und angezeigt.
   
3. *Update (Aktualisieren)*:
   - *EditClientComponent*: Benutzer können bestehende Client-Daten bearbeiten. Nach dem Bearbeiten werden die Daten mit updateClient(id, client) an das Backend gesendet.
   - *EditQuestionsComponent*: Benutzer können die Antworten auf die Fragen eines Clients bearbeiten und aktualisieren.

4. *Delete (Löschen)*:
   - *ClientsComponent*: Benutzer können Clients aus der Liste löschen, indem sie den Löschbutton verwenden. Dies wird durch den `deleteClient(id)`-Service-Aufruf realisiert.
## Installation

1. *Backend installieren*:
   - Gehe ins Backend-Verzeichnis.
   - Installiere die Abhängigkeiten: npm install.
   - Starte den Server: npm start.

2. *Frontend installieren*:
   - Gehe ins Frontend-Verzeichnis.
   - Installiere die Abhängigkeiten: npm install.
   - Starte die Anwendung: ng serve.
## Verzeichnisstruktur
meine Backend Projekt findet in salleyesmine statt.
meiner frontend Projekt findet in src statt.
## KI Verwendung
ChatGPT in	Planung, Codeoptimierung, README
