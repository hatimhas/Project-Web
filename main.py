from flask import Flask, request, jsonify, render_template
from morse import Morse
app = Flask(__name__)


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



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)