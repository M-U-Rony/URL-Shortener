const btn = document.getElementById("copybtn");

btn.addEventListener("click",()=> {

    let inputField = document.getElementById("shortUrl");

    navigator.clipboard.writeText(inputField.value)
        .then(() => {
            this.innerText = "Copied!";
            setTimeout(() => this.innerText = "Copy", 2000); // Reset after 2s
        })
        .catch(err => console.error("Error copying text:", err));
})
