from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("main.html")


if __name__ == "__main__":
    app.run()
