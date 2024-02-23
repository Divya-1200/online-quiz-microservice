FROM python:3.8-slim-buster

WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Copy the Flask application code into the container
COPY . .

# Expose the port on which the Flask app will run
EXPOSE 3008

# Command to run the Flask application
CMD [ "python3", "app.py" ]
