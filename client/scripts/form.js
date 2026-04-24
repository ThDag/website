
const submitButton = document.getElementById("mainSubmitButton")
const nameInput = document.getElementById("name")
const messageInput = document.getElementById("theMessage")
const form = document.querySelector("form")
const submitAlert = document.getElementById("submitAlert")
const submitAlertInnerAlert = document.getElementById("submitAlertInnerAlert")

form.addEventListener("submit", (event) => {
  event.preventDefault(); // <--- THIS STOPS THE RELOAD
  sendMessageToBackend()
  nameInput.value = "";
  messageInput.value = "";
})

async function sendMessageToBackend() {
  let isError = false;
  let errorText = ""

  let bodyData = {
    name: nameInput.value,
    message: messageInput.value
  }

  try {
    const response = await fetch("/api/form/", {
      method: "POST",
      body: JSON.stringify(bodyData)
    })

    const result = await response.text()
    console.log(result)
  }
  catch (error) {
    errorText = error
    console.error(error)
    isError = true;
  }


  if (isError) {
    submitAlertInnerAlert.textContent = `Unable to send message \n Error: ${errorText}`
  }


  submitAlert.classList.remove("invisible")
  setTimeout(() => {
    submitAlert.classList.add("invisible");
    submitAlertInnerAlert.textContent = `Message Sent.`;
  }, 1000)




}

document.addEventListener("click", (event) => {


})
