submitButton = document.getElementById("mainSubmitButton")
nameInput = document.getElementById("name")
messageInput = document.getElementById("theMessage")


async function sendMessageToBackend(body) {
  try {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: body
    })

    const result = await response.json()
    console.log(result)
  }
  catch (error) {
    console.error(error)
  }
}

document.addEventListener("click", (event) => {

  if (event.target === submitButton) {
    console.log("submit clicked")

    let bodyData = {
      name: nameInput.value,
      message: messageInput.value
    }

    sendMessageToBackend(bodyData)
  }

  else { }

})
