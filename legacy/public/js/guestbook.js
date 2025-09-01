const form = document.getElementById("guestbook-form");
const entriesDiv = document.getElementById("entries");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
        alert("Thanks for signing!");
        form.reset();
        loadEntries();
    } else {
        alert(result.error || "Something went wrong.");
    }
});

async function loadEntries() {
    const res = await fetch("/api/guestbook");
    const entries = await res.json();
}

document.addEventListener("DOMContentLoaded", () => {
    loadEntries();
});
