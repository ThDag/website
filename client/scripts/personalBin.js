const form = document.querySelector("form")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const mainTextBox = document.getElementById("mainTextBox")
const submitChangesButton = document.getElementById("submitChangesButton")

form.addEventListener("submit", (event) => {
  event.preventDefault(); // <--- THIS STOPS THE RELOAD
  logInSignUp(event.submitter.name)
  usernameInput.value = "";
  passwordInput.value = "";
})

submitChangesButton.addEventListener("click", async () => {
  submitChanges()
})

// --------------- submit changes -------------------
async function submitChanges() {
  const mainText = mainTextBox.value;
  let bodyData = {
    textbox: mainText,
    action: "submitChanges"
  }

  try {
    const response = await fetch("/api/personalbin", {
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

// ------------------ logInSignUp ----------------------
async function logInSignUp(action) {
  let bodyData = {
    name: usernameInput.value,
    password: await hash(passwordInput.value),
    action: action
  }

  try {
    const response = await fetch("/api/personalbin", {
      method: "POST",
      body: JSON.stringify(bodyData)
    })

    const result = await response.text()
    const parsedResult = JSON.parse(result)
    console.log(parsedResult)
    mainTextBox.value = parsedResult.textbox

  }
  catch (error) {
    console.error(error)
  }
}

async function hash(msg) {
  const bytes = new TextEncoder().encode(msg);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);

  // The "old" way to get a hex string
  let finishedHash = Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return finishedHash
}
