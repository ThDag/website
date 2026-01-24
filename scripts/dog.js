
const mainImage = document.getElementById("mainImage");
const dogBreeds = document.querySelector(".dogBreeds");


const randomDogUrl = "https://dog.ceo/api/breeds/image/random";
const breedListUrl = "https://dog.ceo/api/breeds/list/all";

const breedListArray = [];

fetch(randomDogUrl)
  .then(response => response.json())
  .then(data => {

    mainImage.src = data.message;

  })
  .catch(error => console.log("sike sorry", error))


function htmlizeArray(array) {
  console.log(array)
}

fetch(breedListUrl)
  .then(response => response.json())
  .then(data => breedListArray.push(...Object.keys(data.message)))
  .then(console.log(breedListArray))
  .catch(error => console.log("errorr", error))


