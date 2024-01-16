from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    make_response,
)
import os


def open_and_save_blogs():
    global blogs
    global blog_names
    blogs = []
    blog_names = []
    for filename in os.listdir("blogs"):
        if filename.endswith(".txt"):
            file_path = os.path.join("blogs", filename)
            with open(file_path, "r") as file:
                blog_name = filename[:-4]  # Remove the file extension
                blog_content = file.read()
                blogs.append(blog_content)
                blog_names.append(blog_name)


open_and_save_blogs()

app = Flask(__name__)


@app.route("/")
def main():
    return render_template("main.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/blogs")
def blog_list():
    return render_template("blogs.html", blog_names=blog_names)


@app.errorhandler(404)
def unknown(e):
    return render_template("unknown.html"), 404


@app.route("/blog")
def blog():
    blog = request.args.get("")
    index = blog_names.index(blog)
    if blog is None:
        return redirect("/blogs")
    elif index == -1:
        return redirect("/blogs")
    else:
        return render_template("blog.html", blog=blogs[index])


@app.route("/ielugums")
def ielugums():
    info = request.args.get("")
    if info is None:
        return render_template("ielugums.html")
    elif info == "naksu_fr":
        return render_template("ielugums_accepted.html")


if __name__ == "__main__":
    app.run()
