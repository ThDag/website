
const newTaskButton = document.getElementById("newTaskButton");
const testButton = document.getElementById("testButton");


class todoObject {
  constructor(id) {
    // it's not possible to have a value when the to-do is first created
    // this.value = undefined;
    this.id = id;
    this.htmlElement = document.querySelector(`[data-todoid="${id}"] .todoInputTag`)
    this.isCompleted = false;
  }
}

const inventory = [];

let newestTodoId = 0;

newTaskButton.addEventListener("click", () => {

  newestTodoId += 1;

  let newTaskTemplate = `
  <div class="todo" data-todoid="${newestTodoId}"><div class="todoCheckBox"><svg class="checkBoxTickContainer invisible" height="32" width="32" viewBox="0 0 100 100"><path class="linePath checkBoxTickPath" d="M 10 50 Q 30 60, 40 90 Q 50 50, 90 10" /></svg></div><input class="todoInputTag" type="text" placeholder="to-do"></div>`

  // let todos = document.getElementById("todos").innerHTML;
  document.getElementById("todos").insertAdjacentHTML("afterbegin", newTaskTemplate)

  newObj = new todoObject(newestTodoId);
  inventory.push(newObj);

})


todos.addEventListener("click", (event) => {

  // console.log(event.target.classList)

  // complete task
  if (event.target.className === "todoCheckBox") {
    console.log("completed todo id;", event.target.parentElement.dataset.todoid)

    let todoId = event.target.parentElement.dataset.todoid;
    itemFromInventory = inventory.find(item => String(item.id) === String(todoId));

    // this code down there doesn't work for some reason; it doesn't get the string instead gives <empty string>
    let todoText = itemFromInventory.htmlElement.value

    let todoHtmlElement = itemFromInventory.htmlElement.parentElement;
    // let todoText = document.querySelector(`[data-todoid="${event.target.parentElement.dataset.todoid}"] .todoInputTag`).value;


    event.target.parentElement.remove()

    // adds todo to the html and updates the value(text inside) to be what it was.
    document.getElementById("completedTodos").prepend(todoHtmlElement);
    document.querySelector(`[data-todoid="${todoId}"] .todoInputTag`).value = todoText;

    itemFromInventory.htmlElement.parentElement.querySelector(".checkBoxTickContainer").classList.remove("invisible")
    itemFromInventory.htmlElement.parentElement.querySelector(".checkBoxTickContainer").classList.add("visible")
    console.log(itemFromInventory.htmlElement.parentElement.querySelector(".checkBoxTickContainer"))
  }
})


testButton.addEventListener("click", () => {
  const bruhmoment = inventory.find(item => item.id === 2);
  console.log(bruhmoment.htmlElement.value);
  // console.log(bruhmoment.htmlElement.value);
  // console.log(document.querySelector('[data-todoid="2"] .todoInputTag').value);
})
