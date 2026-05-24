const messageArea = document.getElementById("messageArea")
const loginStatus = document.getElementById("loginStatus")

window.addEventListener("personalbin-response", (e) => {
  const { status, task, message, textbox } = e.detail

  messageArea.innerHTML = ""

  const alert = document.createElement("div")
  alert.className = `alert alert-${status === "success" ? "success" : "danger"} alert-dismissible fade show`
  alert.role = "alert"
  alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
  messageArea.appendChild(alert)

  if (status === "success" && task === "signup" && textbox != null) {
    document.getElementById("mainTextBox").value = textbox
    const match = message.match(/as (.+)$/)
    if (match) {
      loginStatus.textContent = `Logged in as ${match[1]}`
    }
  }

  if (status === "unsuccessful") {
    loginStatus.textContent = "Not logged in"
  }

  setTimeout(() => alert.remove(), 5000)
})
