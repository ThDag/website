
const secondHandElement = document.querySelector(".secondHand")
const minuteHandElement = document.querySelector(".minuteHand")
const hourHandElement = document.querySelector(".hourHand")
let secondHandStyles = window.getComputedStyle(secondHandElement)


function secondHandFunction() {

  // console.log(window.getComputedStyle(clockHand).rotate.slice(0, -3))
  // clockHand.style.rotate = `${parseInt(clockHandStyles.rotate) + 6}deg`

  let date = new Date();

  let secondsAngle = `${(date.getSeconds() * 6) + 90}deg`
  secondHandElement.style.rotate = secondsAngle;

  let minutesAngle = `${(date.getMinutes() * 6) + 90}deg`
  minuteHandElement.style.rotate = minutesAngle

  let hoursAngle = `${(date.getHours() * 6) + 90}deg`
  let hour = date.getHours();
  if (hour >= 12) {
    hour = hour - 12;
  }

  hoursAngle = `${hour * 30 + 90}deg`;

  hourHandElement.style.rotate = hoursAngle;


}

const secondInterval = setInterval(secondHandFunction, 1000);

