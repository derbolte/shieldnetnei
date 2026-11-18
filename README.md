# ShieldNetNei PWA v0.2

## Inhalt
- index.html: Oberfläche
- style.css: Cyber-Security-Design
- app.js: Demo-Interaktionen und Deutsch/Englisch-Umschaltung
- manifest.webmanifest: Web-App-Metadaten
- sw.js: Offline-Caching
- icons/: App-Symbole

## Lokal testen
Ein Service Worker benötigt eine sichere Umgebung (HTTPS oder localhost). Einfaches Öffnen per file:// aktiviert ihn nicht.

## Veröffentlichen
Lade den gesamten Inhalt dieses Ordners unverändert auf einen statischen HTTPS-Webhost hoch. Die Dateien müssen im selben Verzeichnis liegen; der Ordner icons muss mit hochgeladen werden. Danach die HTTPS-Adresse in Safari öffnen und über Teilen > Zum Home-Bildschirm > Als Web-App öffnen > Hinzufügen installieren.

## Sicherheitsgrenze
Dies ist ein UI-/PWA-Prototyp. Die Demo-Regeln prüfen ausschließlich die Beispiel-Domains ads.example, tracker.example und malware.example. Es findet keine echte DNS-Filterung, Malware-Erkennung, VPN- oder Gerätesicherung statt. Vor einem Produktivbetrieb sind ein echter Filterdienst, Sicherheitsprüfung, Datenschutzkonzept und sichere Infrastruktur nötig.
