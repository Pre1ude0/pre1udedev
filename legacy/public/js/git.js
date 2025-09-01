document.addEventListener("DOMContentLoaded", function () {
    const commitBox = document.getElementById("commit-box");
    const closeButton = document.getElementById("close-btn");

    fetch(
        "https://api.github.com/repos/Pre1ude0/pre1udedev/commits?per_page=1"
    )
        .then((res) => res.json())
        .then((res) => {
            const commitMessage = res[0].commit.message;
            const commitDate = new Date(res[0].commit.author.date).toDateString();
            const commitLink = res[0].html_url;

            document.getElementById("commit-message").innerText = commitMessage;
            document.getElementById("commit-date").innerText = commitDate;
            document.getElementById("commit-link").href = commitLink;
        });

    closeButton.addEventListener("click", function () {
        commitBox.classList.add("hidden");
    });
});
