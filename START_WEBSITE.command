#!/bin/bash
cd "$(dirname "$0")"
echo "========================================================="
echo "   Murali Granites & Marbles - Local Studio Launcher"
echo "========================================================="
echo ""
echo "Starting local studio server..."

if command -v python3 &>/dev/null; then
    open "http://localhost:8092/"
    python3 scripts/serve.py
elif command -v python &>/dev/null; then
    open "http://localhost:8092/"
    python scripts/serve.py
elif command -v npx &>/dev/null; then
    open "http://localhost:8092/"
    npx serve -l 8092 -s .
else
    echo "Please install Python or Node.js to run this website locally."
    read -p "Press enter to exit"
fi
