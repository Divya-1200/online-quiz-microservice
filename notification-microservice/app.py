from flask import Flask, jsonify
import pika
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json

app = Flask(__name__)

def send_email_notification(sender_email, sender_password, recipient_email, subject, body):
    try:
        # Construct email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = "divya.perumal120@gmail.com"
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server and send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server: 
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        room = data.get('roomId')
        participant = data.get('participantId')
        sender_email = 'd123j45mail@gmail.com'  
        sender_password = 'redgnncenmzdgqre'  
        subject = 'New Room Created'
        body = f'A new room with ID {room} has been created. You are invited to join!'
        send_email_notification(sender_email, sender_password, participant, subject, body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        raise e

@app.route('/')
def index():
    return 'Notification service is running.'

def consume_messages():
    try:
        # Connect to RabbitMQ server
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        print("Here is the message")
        channel.queue_declare(queue='participant_added')

        channel.basic_consume(queue='participant_added', on_message_callback=callback)

        print('Waiting for messages. To exit press CTRL+C')
        channel.start_consuming()
    except KeyboardInterrupt:
        print('Interrupted, closing connection')
        connection.close()

if __name__ == '__main__':
    import threading
    threading.Thread(target=consume_messages).start()
    app.run(debug=True)
