#!/bin/sh
set -eu
SOURCE_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
mkdir -p "$HOME/Desktop/Informe DK - Evidencias"
cp "$SOURCE_DIR/informeparaprogra.docx" "$HOME/Desktop/informeparaprogra.docx"
cp -R "$SOURCE_DIR/." "$HOME/Desktop/Informe DK - Evidencias/"
printf 'Informe copiado a: %s\n' "$HOME/Desktop/informeparaprogra.docx"
printf 'Evidencias copiadas a: %s\n' "$HOME/Desktop/Informe DK - Evidencias"
