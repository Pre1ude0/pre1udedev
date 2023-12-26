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

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/blogs")
def blogs():
    return render_template("blogs.html")

@app.errorhandler(404)
def unknown(e):
    return render_template("unknown.html"), 404


if __name__ == "__main__":
    app.run()
