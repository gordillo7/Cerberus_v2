#!/bin/bash
# Script para iniciar Cerberus v2 en desarrollo

echo "🐕‍🦺 Cerberus v2 - Development Server"
echo "===================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "app.py" ]; then
    echo "❌ Error: app.py no encontrado"
    echo "Ejecuta este script desde el raíz del proyecto"
    exit 1
fi

# Verificar que frontend/dist existe
if [ ! -d "frontend/dist" ]; then
    echo "📦 Compilando frontend..."
    cd frontend
    npm run build
    cd ..
fi

# Iniciar Flask
echo "🚀 Iniciando Flask en http://localhost:5000"
python app.py
