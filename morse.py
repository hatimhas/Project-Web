import pygame
import time

class Morse:
    def __init__(self, words):
        self.codes = {
            "0": "-----",
            "1": ".----",
            "2": "..---",
            "3": "...--",
            "4": "....-",
            "5": ".....",
            "6": "-....",
            "7": "--...",
            "8": "---..",
            "9": "----.",
            "a": ".-",
            "b": "-...",
            "c": "-.-.",
            "d": "-..",
            "e": ".",
            "f": "..-.",
            "g": "--.",
            "h": "....",
            "i": "..",
            "j": ".---",
            "k": "-.-",
            "l": ".-..",
            "m": "--",
            "n": "-.",
            "o": "---",
            "p": ".--.",
            "q": "--.-",
            "r": ".-.",
            "s": "...",
            "t": "-",
            "u": "..-",
            "v": "...-",
            "w": ".--",
            "x": "-..-",
            "y": "-.--",
            "z": "--..",
            ".": ".-.-.-",
            ",": "--..--",
            "?": "..--..",
            "!": "-.-.--",
            "-": "-....-",
            "/": "-..-.",
            "@": ".--.-.",
            "(": "-.--.",
            ")": "-.--.-",
            " ": "/"  # Update to use '/' as a visual separator for words
        }
        self.words = words
        
        pygame.mixer.init()
        self.dot_sound = pygame.mixer.Sound('static/assets/dot.wav')
        self.dash_sound = pygame.mixer.Sound('static/assets/dash.wav')

    def encodeString(self):
        letters = list(self.words)
        output = ""
        for letter in letters:
            if letter.lower() in self.codes:
                output += self.codes[letter.lower()] + " "
            else:
                continue
        return output.strip()

    def decodeMorse(self):
        # Split Morse code by ' / ' to separate words
        words = self.words.split(" / ")
        output = ""
        
        for word in words:
            letters = word.split()  # Split each word by single space to get individual Morse code letters
            for letter in letters:
                found = False
                for string, code in self.codes.items():
                    if letter == code:
                        output += string
                        found = True
                        break
                # If Morse code is not found, skip it
                if not found:
                    output += '?'  # Optional: add a placeholder for unknown Morse code
            output += " "  # Add space after each word

        return output.strip()  # Strip the trailing space
                
    def is_morse_code(self):
        morse_chars = set('.- /')  # Include '/' to account for space separators
        return all(char in morse_chars for char in self.words)  # Use self.words directly
    
    def play_morse_code(self, input_text, output_text):
        texts = [input_text, output_text]
        
        for text in texts:
            # Update self.words to the current text for is_morse_code to work
            self.words = text
            
            if not self.is_morse_code():
                continue

            for char in text:
                if char == '.':
                    self.dot_sound.play()
                    time.sleep(0.2)  # Short pause after dot
                elif char == '-':
                    self.dash_sound.play()
                    time.sleep(0.6)  # Longer pause after dash
                elif char == ' ':
                    time.sleep(0.4)  # Pause between letters
                elif char == '/':
                    time.sleep(1)  # Pause between words


