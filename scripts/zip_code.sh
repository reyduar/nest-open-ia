#!/bin/bash

ZIP_FILE="damc-api-open-ia.zip"

cd ..
zip -r $ZIP_FILE . -x "node_modules/*" -x "dist/*"  -x "generated/*" -x "scripts/*"

echo "File $ZIP_FILE has been successfully created."