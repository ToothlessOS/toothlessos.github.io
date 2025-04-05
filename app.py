from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer


template_folder = path.abspath('./src')

app = Flask(__name__, template_folder=template_folder)
app.config['FREEZER_DESTINATION'] = 'docs'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(app)

@app.cli.command()
def freeze():
    freezer.freeze()

@app.cli.command()
def serve():
    freezer.run()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tools/<name>/')
def tools(name):
    return render_template(f'tools/{name}.html')

@app.route('/pages/<name>/')
def pages(name):
    return render_template(f'pages/{name}.html')

if __name__ == '__main__':
    app.run(port=8080)