const messageArea = document.getElementById("messageArea")

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
  }

  setTimeout(() => alert.remove(), 5000)
})
