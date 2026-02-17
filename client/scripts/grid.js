
const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = {
  yellow: "#ffd100",
  lightYellow: "#ffee32",
  lightBlack: "#333533",
  darkBlack: "#202020",
  darkWhite: "#d6d6d6",
};


const btn = document.getElementsByClassName("mainButton")[0];
const doesNothingText = document.getElementsByClassName("thisDoesNothing")[0];
const scoreElement = document.getElementsByClassName("scoreNumber")[0];
const youLose = document.getElementsByClassName("youLose")[0];

let score = 0;

console.log(btn)

btn.addEventListener('click', () => {
  console.log("this button does nothing currently");
  doesNothingText.style.animation = "textShake 0.3s 2 linear, fadeInOut 0.6s";
  setTimeout(() => {
    doesNothingText.style.removeProperty("animation");

  }, "600");
});



// initialColoring
activeButton = Math.floor(Math.random() * 16) + 1;
let initialColoring = function(activeButton) {
  document.getElementById(activeButton).style.backgroundColor = "red";
}
initialColoring(activeButton)

// grid click processing 
let gridClick = function(e) {
  // if the click is correct
  if (String(e.target.id) === String(activeButton)) {


    // makes sure the next random number isn't the same one as before
    do {
      activeButton = Math.floor(Math.random() * 16) + 1;
      console.log(activeButton)
    } while (String(activeButton) === String(e.target.id))
    console.log(activeButton)
    document.getElementById(e.target.id).style.backgroundColor = colors.darkWhite;
    document.getElementById(activeButton).style.backgroundColor = colors.yellow;
    score = score + 1;

  }
  else {
    console.log("wrong button")

    score = 0;

    youLose.style.animation = "fadeInOutFaster 2s";
    youLose.style.pointerEvents = "all";
    setTimeout(() => {
      youLose.style.removeProperty("animation");
      youLose.style.pointerEvents = "none";
    }, 2000)
  }
  scoreElement.innerText = String(score)
}


// grid each button EventListener
const gridButtons = document.querySelectorAll(".item")
gridButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log("target:");
    // console.log(e.target.id);
    gridClick(e);
  })
})



