
const submitButton = document.getElementById("mainSubmitButton")
const nameInput = document.getElementById("name")
const messageInput = document.getElementById("theMessage")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault(); // <--- THIS STOPS THE RELOAD
  sendMessageToBackend()
})

async function sendMessageToBackend() {

  let bodyData = {
    name: nameInput.value,
    message: messageInput.value
  }

  try {
    const response = await fetch("/api/", {
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

document.addEventListener("click", (event) => {


})
