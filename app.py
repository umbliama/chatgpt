from flask import Flask, render_template, request
import openai
from flask_assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)

css_bundle = Bundle('css/style.css', output='gen/style.css', filters='cssmin')
js_bundle = Bundle('js/main.js', output='gen/main.js', filters='jsmin')


openai.api_key = ""
model_engine = "text-davinci-002"

assets.register('css_all', css_bundle)
assets.register('js_all', js_bundle)

zodiac_signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra',
    'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html",zodiac_signs = zodiac_signs)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == "POST":
        zodiac_sign = request.form.get("zodiac_sign")
        horoscope = generate_horoscope(zodiac_sign)
        return horoscope

    
def generate_horoscope(zodiac_sign):
    prompt = f"Generate a horoscope for {zodiac_sign} start with words it's horoscope for {zodiac_sign}."
    response = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=128,
        n=1,
        stop=None,
        temperature=0.5,
    )
    horoscope = response.choices[0].text.strip()
    return horoscope

