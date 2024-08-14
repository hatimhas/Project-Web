import pygame
import time

# Initialize Pygame mixer
pygame.mixer.init()

# Load sound files
dot_sound = pygame.mixer.Sound('static/assets/dot.wav')
dash_sound = pygame.mixer.Sound('static/assets/dash.wav')

def play_morse_code(morse_code):
    for char in morse_code:
        if char == '.':
            dot_sound.play()
            time.sleep(0.2)  # Short pause after dot
        elif char == '-':
            dash_sound.play()
            time.sleep(0.6)  # Longer pause after dash
        elif char == ' ':
            time.sleep(0.4)  # Pause between letters
        elif char == '/':
            time.sleep(1)  # Pause between words
        # Add other conditions if needed

