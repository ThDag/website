
const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Clear button
const btn = document.getElementById("mainButton");
btn.addEventListener('click', () => {
  console.log("this button does nothing currently")

});

// initialColoring
let activeButton = 4;
let initialColoring = function(activeButton) {
  document.getElementById(activeButton).style.backgroundColor = "red";
}
initialColoring(activeButton)

// grid click processing 
let gridClick = function(e) {
  if (String(e.target.id) === String(activeButton)) {

    activeButton = Math.floor(Math.random() * 17);
    document.getElementById(e.target.id).style.backgroundColor = "darkseagreen";
    document.getElementById(activeButton).style.backgroundColor = "red";

  }
  else {
    console.log("wrong button")
  }
}


const gridButtons = document.querySelectorAll(".item")

gridButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log("target:");
    // console.log(e.target.id);
    gridClick(e);
  })
})



