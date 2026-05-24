const form = document.querySelector("form")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const mainTextBox = document.getElementById("mainTextBox")
const submitChangesBtn = document.getElementById("submitChangesBtn")

form.addEventListener("submit", (event) => {
  event.preventDefault(); // <--- THIS STOPS THE RELOAD
  logInSignUp(event.submitter.name)
  usernameInput.value = "";
  passwordInput.value = "";
})

submitChangesBtn.addEventListener("click", async () => {
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
    const parsedResult = JSON.parse(result)
    // calls the ui change javascript (vibecoded idk what happens really)
    window.dispatchEvent(new CustomEvent("personalbin-response", { detail: parsedResult }))
    console.log(parsedResult)
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
    // calls the ui change javascript (vibecoded idk what happens really)
    window.dispatchEvent(new CustomEvent("personalbin-response", { detail: parsedResult }))
    if (parsedResult.status === "success") {
      mainTextBox.value = parsedResult.textbox
    }
    console.log(parsedResult)



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
