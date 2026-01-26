
const mainImage = document.getElementById("mainImage");
const dogBreeds = document.querySelector(".dogBreeds");
const selectedBreedsBadges = document.querySelector(".selectedBreedsBadges");

const randomDogUrl = "https://dog.ceo/api/breeds/image/random";
const breedListUrl = "https://dog.ceo/api/breeds/list/all";

// list of selected breeds in index form from the breedlistArray
let selectedBreeds = [];


fetch(randomDogUrl)
  .then(response => response.json())
  .then(data => {

    mainImage.src = data.message;

  })
  .catch(error => console.log("sike sorry", error))

const breedListArray = [];
fetch(breedListUrl)
  .then(response => response.json())
  .then(data => breedListArray.push(...Object.keys(data.message)))
  .then(console.log(breedListArray))
  .catch(error => console.log("errorr", error))


function htmlizeBadgeArray(array) {
  // takes a list of ids, returns a html string of dog breed names in pill shaped badges
  let htmlizedArray = array.map((item) => {
    return `<span class="badge fw-medium rounded-pill text-primary border border-2 border-primary">${breedListArray[Number(item)]}</span>`
  })

  return htmlizedArray.join(" ")

}

document.addEventListener("click", (event) => {

  if (event.target.matches(".breedListItem")) {

    if (!event.target.matches(".active")) {
      selectedBreeds.push(event.target.dataset.breedid)
    }

    else if (event.target.matches(".active")) {
      // this is the only way to remove something from an array with the value
      selectedBreeds = selectedBreeds.filter(item => item !== event.target.dataset.breedid)
    }

    event.target.classList.toggle("active")
    selectedBreedsBadges.innerHTML = htmlizeBadgeArray(selectedBreeds)
  }
  // console.log(selectedBreeds)

})
