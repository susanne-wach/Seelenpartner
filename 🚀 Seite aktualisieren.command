#!/bin/bash
# ═══════════════════════════════════════════════
# SUSANNE WACHTER – Seelenpartner Homepage
# Automatisches Update auf susanne-wachter.at
# ═══════════════════════════════════════════════

# Wechsle in den richtigen Ordner
cd "/Users/susannewachter/Documents/Firma/Seelenpartner-Homepage"

echo ""
echo "🔄 Lade Änderungen hoch..."
echo ""

# Alle Änderungen hinzufügen
git add .

# Commit mit aktuellem Datum & Uhrzeit
git commit -m "Update $(date '+%d.%m.%Y um %H:%M Uhr')"

# Push zu GitHub (und damit live auf susanne-wachter.at)
git push origin main

echo ""
echo "══════════════════════════════════════════"
echo "✅ Deine Seite ist jetzt live!"
echo "🌐 https://susanne-wachter.at"
echo "══════════════════════════════════════════"
echo ""
echo "Dieses Fenster kannst du jetzt schließen."
echo ""

# Warte auf Tastendruck bevor das Fenster sich schließt
read -p "Drücke Enter zum Beenden..."
