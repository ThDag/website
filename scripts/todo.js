
const newTaskButton = document.getElementById("newTaskButton");
const testButton = document.getElementById("testButton");


class todoObject {
  constructor(id) {
    // it's not possible to have a value when the to-do is first created
    // this.value = undefined;
    this.id = id;
    this.htmlElement = document.querySelector(`[data-todoid="${id}"]`)
    this.isCompleted = false;
  }
}

const inventory = [];

let newestTodoId = 0;

newTaskButton.addEventListener("click", () => {

  newestTodoId += 1;

  let newTaskTemplate = `
  <div class="todo" data-todoid="${newestTodoId}"><div class="todoCheckBox"><svg class="checkBoxTickContainer" height="32" width="32" viewBox="0 0 100 100"><path class="linePath checkBoxTickPath invisible" d="M 10 50 Q 30 60, 40 90 Q 50 50, 90 10" /></svg></div><input class="todoInputTag" type="text" placeholder="to-do"></div>`

  document.getElementById("todos").insertAdjacentHTML("afterbegin", newTaskTemplate)

  newObj = new todoObject(newestTodoId);
  inventory.push(newObj);

})


todosContainer = document.querySelector("#todosContainer")
todosContainer.addEventListener("click", (event) => {

  // console.log(event.target.classList)

  // complete task
  if (event.target.className === "todoCheckBox") {
    console.log("completed todo id;", event.target.parentElement.dataset.todoid)

    let todoId = event.target.parentElement.dataset.todoid;
    let itemFromInventory = inventory.find(item => String(item.id) === String(todoId));


    itemFromInventory.htmlElement.querySelector(".checkBoxTickPath").classList.add("tickUpAnimation")


    // let todoText = itemFromInventory.htmlElement.querySelector(".todoInputTag").value
    //
    // let todoHtmlElement = itemFromInventory.htmlElement;
    // // let todoText = document.querySelector(`[data-todoid="${event.target.parentElement.dataset.todoid}"] .todoInputTag`).value;
    //
    // event.target.parentElement.remove()
    //
    // // adds todo to the html and updates the value(text inside) to be what it was.
    // document.getElementById("completedTodos").prepend(todoHtmlElement);
    // itemFromInventory.htmlElement.querySelector(".todoInputTag").value = todoText;
    //
    // itemFromInventory.htmlElement.querySelector(".checkBoxTickContainer").classList.remove("invisible")
    // console.log(itemFromInventory.htmlElement.querySelector(".checkBoxTickContainer"))
  }
})


todosContainer.addEventListener("animationend", (event) => {

  console.log(event)
  if (event.animationName === "tickUp") {

    let todoId = event.target.parentElement.parentElement.parentElement.dataset.todoid;
    let itemFromInventory = inventory.find(item => String(item.id) === String(todoId));

    let todoText = itemFromInventory.htmlElement.querySelector(".todoInputTag").value

    let todoHtmlElement = itemFromInventory.htmlElement;


    // adds todo to the html and updates the value(text inside) to be what it was.
    document.getElementById("completedTodos").prepend(todoHtmlElement);
    itemFromInventory.htmlElement.querySelector(".todoInputTag").value = todoText;

    itemFromInventory.htmlElement.querySelector(".checkBoxTickPath").classList.remove("tickUpAnimation", "invisible")

    // console.log(itemFromInventory.htmlElement.querySelector(".checkBoxTickContainer"))

  }


})


testButton.addEventListener("click", () => {
  const bruhmoment = inventory.find(item => item.id === 2);
  console.log(bruhmoment.htmlElement.value);
  // console.log(bruhmoment.htmlElement.value);
  // console.log(document.querySelector('[data-todoid="2"] .todoInputTag').value);
})
