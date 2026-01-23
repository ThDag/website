
const mainImage = document.getElementById("mainImage")

const url = "https://dog.ceo/api/breeds/image/random"


response = fetch(url)
  .then(response => response.json())
  .then(data => {

    console.log(data)
    mainImage.src = data.message;

  })
  .catch(error => console.log("sike sorry", error))


