# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the Pipfile and Pipfile.lock into the container
COPY Pipfile Pipfile.lock ./

# Install pipenv and other dependencies
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  && \
  pip install --upgrade pip && \
  pip install pipenv && \
  pipenv install --system --deploy --ignore-pipfile && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 8000 for Django
EXPOSE 8000

# Set environment variables for Django
ENV PYTHONUNBUFFERED=1
ENV DJANGO_ENV=production

# Collect static files
RUN python manage.py collectstatic --noinput

# Run the command to start Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi"]
