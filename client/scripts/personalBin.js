const form = document.querySelector("form")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

form.addEventListener("submit", (event) => {
  event.preventDefault(); // <--- THIS STOPS THE RELOAD
  logIn()
  nameInput.value = "";
  messageInput.value = "";
})


async function logIn() {


  let bodyData = {
    name: usernameInput.value,
    password: hash(passwordInput.value)
  }

  try {
    const response = fetch("/api/binlogin/", {
      method: "POST",
      body: JSON.stringify(bodyData)
    })

    const result = await response.text()
    console.log(result)
  }
  catch (error) {
    console.error(error)

  }
}

async function hash(msg) {
  const bytes = new TextEncoder().encode(msg);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);

  // The "old" way to get a hex string
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
