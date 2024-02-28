from flask import Flask, jsonify
import pika
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
import sys
import os
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
running = True
def send_email_notification(sender_email, sender_password, recipient_email, subject, body):
    try:
        # Construct email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server and send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server: 
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
            print("sent email")
    except Exception as e:
        print(f"Error sending email: {e}")

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        room = data.get('roomId')
        participantId = data.get('participantId')
        participant_api_url = f'http://localhost/api/users/{participantId}'
        response = requests.get(participant_api_url)
        if response.status_code == 200:
            participant_data = response.json()
            recipient_email = participant_data.get('email')
        sender_email = os.getenv("SENDER_EMAIL")
        sender_password = os.getenv("SENDER_PASSWORD")
        subject = 'New Room Created'
        body = f'A new room with ID {room} has been created. You are invited to join!'
        send_email_notification(sender_email, sender_password, recipient_email, subject, body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        raise e

@app.route('/')
def index():
    return 'Notification service is running.'

def consume_messages():
    global running
    try:
        # Connect to RabbitMQ server
        # params = pika.URLParameters('amqps://tyfodnmd:t0Ps2Jnw97Epl3YNe67zm2mjdDdir5Y8@rat.rmq2.cloudamqp.com/tyfodnmd')
        connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        channel = connection.channel()
        channel.queue_declare(queue='participant_added')
        channel.basic_consume(queue='participant_added', on_message_callback=callback)
        print('Waiting for messages. To exit press CTRL+C')
        while running:  
            channel.start_consuming()
    except KeyboardInterrupt:
        print('Interrupted, closing connection')
        running = False
        connection.close()

def signal_handler(sig, frame):
    print('Exiting...')
    global running
    running = False
    sys.exit(0)

if __name__ == '__main__':
    import threading
    threading.Thread(target=consume_messages).start()
    app.run(debug=True,port=3008)
