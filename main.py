from flask import Flask, request, jsonify, render_template, redirect, url_for
from morse import Morse
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:dbpassword@localhost/myfirstdbsite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Contact {self.name}>'

with app.app_context():
    db.create_all() 

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/morse')
def morse():
    return render_template('morse.html', input_text='', output_text='')

@app.route('/morse-process', methods=['POST'])
def morse_process():
    data = request.get_json()
    input_text = data.get('inputText', '')
    morse_instance = Morse(input_text)
    
    if morse_instance.is_morse_code():
        output_text = morse_instance.decodeMorse()
    else:
        output_text = morse_instance.encodeString()
        
    return jsonify({'outputText': output_text})

@app.route('/play-morse', methods=['POST'])
def play_morse():
    data = request.get_json()
    input_text = data.get('inputText')
    output_text = data.get('outputText')
    
    morse_instance = Morse(input_text or output_text)
    
    morse_instance.play_morse_code(input_text, output_text)
    
    return jsonify({"status": "Playing Morse Code"})

@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    message = request.form['message']

    new_contact = Contact(name=name, email=email, phone=phone, message=message)
    db.session.add(new_contact)
    db.session.commit()

    return redirect(url_for("home"))  

@app.route('/tic_toe')
def tic_toe():
    return render_template('tic-toe.html', input_text='', output_text='')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)