@echo off
REM Script para iniciar Cerberus v2 en desarrollo (Windows)

echo.
echo 🐕‍🦺 Cerberus v2 - Development Server
echo ====================================

REM Verificar que estamos en el directorio correcto
if not exist "app.py" (
    echo ❌ Error: app.py no encontrado
    echo Ejecuta este script desde el raíz del proyecto
    pause
    exit /b 1
)

REM Verificar que frontend/dist existe
if not exist "frontend\dist" (
    echo 📦 Compilando frontend...
    cd frontend
    call npm run build
    cd ..
)

REM Iniciar Flask
echo.
echo 🚀 Iniciando Flask en http://localhost:5000
echo 📖 Documentación en REACT_MIGRATION.md
echo.
python app.py
pause
