#!/bin/bash -x

python ./server/manage.py makemigrations auth_app
python ./server/manage.py makemigrations gestion
python ./server/manage.py makemigrations serverConfig
python ./server/manage.py migrate --noinput || exit 1
python ./server/manage.py initUser
python ./server/manage.py runserver 0.0.0.0:8000

exec "$@"