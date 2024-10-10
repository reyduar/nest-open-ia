#!/bin/bash

# Nombre del archivo ZIP
ZIP_FILE="damc-api-open-ia.zip"

# Comando para crear el archivo ZIP e incluir todos los archivos, incluidos los ocultos
cd ..
zip -r $ZIP_FILE . -x "node_modules/*" -x "dist/*"  -x "generated/*" -x "scripts/*"

# Mensaje de confirmación
echo "File $ZIP_FILE has been successfully created."