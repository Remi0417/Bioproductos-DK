#!/usr/bin/env bash
# Script que ejecuta Render cada vez que publica una versión nueva del backend.
set -o errexit

pip install -r requirements.txt

# Copia el CSS/JS del admin a staticfiles/ para que WhiteNoise lo sirva.
python manage.py collectstatic --noinput

# Crea o actualiza las tablas en el PostgreSQL de Render.
python manage.py migrate --noinput

# La primera vez crea el usuario del admin con DJANGO_SUPERUSER_USERNAME,
# DJANGO_SUPERUSER_EMAIL y DJANGO_SUPERUSER_PASSWORD (variables de Render).
# Si ya existe, no hace nada.
if [ -n "${DJANGO_SUPERUSER_USERNAME:-}" ]; then
  python manage.py createsuperuser --noinput || echo "El superusuario ya existe."
fi
