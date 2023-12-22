from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    make_response,
)

app = Flask(__name__)


@app.route("/")
def main():
    return render_template("main.html")


@app.route("/.well-known/acme-challenge/zXGv5YEGm92Lf9VFRA2Lvt7q8_BJ-oVOIUbxKZXtVrI"
)
def ssl():
    response = make_response(
        "MdTW8IzYdFuKQWAekjWk1q2sP6sJAQhSczvPl1ovXZM.xc9It2P3kCFnFCqMekQ-90CRf6tm3amb_WKVXc-QmMA",
        200,
    )
    response.mimetype = "text/plain"
    return response


if __name__ == "__main__":
    app.run()
