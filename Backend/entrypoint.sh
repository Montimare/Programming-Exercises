#!/bin/bash

echo "makemigrations..."
python manage.py makemigrations

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Seed database
echo "Seeding database..."
python manage.py seed_db

# Start server
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000