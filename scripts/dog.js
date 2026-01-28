
const mainImage = document.getElementById("mainImage");
const mainImageFigcaption = document.getElementById("mainImageFigcaption");
const dogBreeds = document.querySelector(".dogBreeds");
const selectedBreedsBadges = document.querySelector(".selectedBreedsBadges");

const randomDogUrl = "https://dog.ceo/api/breeds/image/random";
const breedListUrl = "https://dog.ceo/api/breeds/list/all";

// list of selected breeds in index form from the breedlistArray
let selectedBreeds = [];

const breedListArray = [];
fetch(breedListUrl)
  .then(response => response.json())
  .then(data => breedListArray.push(...Object.keys(data.message)))
  .then(() => { handleHtmlOfBreeds(breedListArray) }) // this is to ensure this function runs after the previous .then statement
  .catch(error => console.error("error fetching breed list;", error))

function handleHtmlOfBreeds(array) {
  array = array.map((item, index) => {
    return `<li class="breedListItem list-group-item list-group-item-action" data-breedId="${index}">${item}</li>`
  })
  dogBreeds.innerHTML = array.join(" ")
}

// non-initial functions

function fetchDogImage(selectedBreeds) {
  if (selectedBreeds.length > 0) {
    let randomBreed = breedListArray[Number(selectedBreeds[Math.floor(Math.random() * selectedBreeds.length)])]
    fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random`)
      .then(response => response.json())
      .then(data => {
        mainImage.src = data.message;
      })
      .catch(error => console.error("sorry lol;", error))
  }
  else {
    fetch(randomDogUrl)
      .then(response => response.json())
      .then(data => {
        mainImage.src = data.message;
        // using regex to get breed name from the returned url and putting it in figcaption of image
        mainImageFigcaption.innerHTML = data.message.match(/(?<=breeds\/).*(?=\/)/)
      })
      .catch(error => console.error("sorry lol;", error))

  }
}

function handleHtmlOfBreedBadges(array) {
  // takes a list of ids, returns a html string of dog breed names in pill shaped badges
  let htmlizedArray = array.map((item) => {
    return `<span class="badge fw-medium fs-6 rounded-pill text-bg-primary ">${breedListArray[Number(item)]}</span>`
  })
  selectedBreedsBadges.innerHTML = htmlizedArray.join(" ")
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
    handleHtmlOfBreedBadges(selectedBreeds)
  }

  else if (event.target.matches(".fetchDogImageButton")) {
    fetchDogImage(selectedBreeds)
  }

  else if (event.target.matches(".clearButton")) {

    // removes the active class of selected breeds
    selectedBreeds.forEach((idOfBreed) => {
      dogBreeds.children[Number(idOfBreed)].classList.remove("active")
    })

    // removes the badges
    selectedBreeds = [];
    handleHtmlOfBreedBadges(selectedBreeds);



  }
})
