from flask import Flask, render_template, request, redirect, url_for, session
from threading import Thread

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("main.html")


def run():
    app.run(host="0.0.0.0", port=8080)


def start():
    t = Thread(target=run)
    t.start()

start()