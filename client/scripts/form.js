submitButton = document.getElementById("mainSubmitButton")
nameInput = document.getElementById("name")
messageInput = document.getElementById("theMessage")
form = document.querySelector("form")

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
    const response = await fetch("http://localhost:3000", {
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

  // if (event.target === submitButton) {
  //   console.log("submit clicked")
  //   sendMessageToBackend()
  // }

  // else { }

})
