

async function handleFormRequest(data) {
  // this just calls the n8n webhook
  const url = "http://host.docker.internal:5678/webhook/59f8c12c"

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();

  } catch (error) {
    const result = error

  }


  console.log("n8n hook activated")
  console.log("form.js-result:", result)
  return result
}

export default handleFormRequest

