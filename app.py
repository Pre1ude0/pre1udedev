from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)


@app.route("/")
def main():
    return render_template("main.html")


@app.route("/.well-known/acme-challenge/MdTW8IzYdFuKQWAekjWk1q2sP6sJAQhSczvPl1ovXZM")
def ssl():
    return "MdTW8IzYdFuKQWAekjWk1q2sP6sJAQhSczvPl1ovXZM.xc9It2P3kCFnFCqMekQ-90CRf6tm3amb_WKVXc-QmMA"


if __name__ == "__main__":
    app.run()
