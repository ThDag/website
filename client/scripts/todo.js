
const newTaskButton = document.getElementById("newTaskButton");
// const testButton = document.getElementById("testButton");


class todoObject {
  constructor(id) {
    this.id = id;
    this.htmlElement = document.querySelector(`[data-todoid="${id}"]`)
    this.isCompleted = false;
  }
}


const inventory = [];

// the first empty todo initilazation
inventory.push(new todoObject(1))
let newestTodoId = 1;

newTaskButton.addEventListener("click", () => {

  newestTodoId += 1;

  let newTaskTemplate = `
  <div class="todo" data-todoid="${newestTodoId}"><div class="todoCheckBox"><svg class="checkBoxTickContainer" height="50" width="50" viewBox="0 0 100 100"></svg></div><input class="todoInputTag" type="text" placeholder="to-do"></div>`

  document.getElementById("todos").insertAdjacentHTML("afterbegin", newTaskTemplate)

  newObj = new todoObject(newestTodoId);
  inventory.push(newObj);

})


todosContainer = document.querySelector("#todosContainer")
todosContainer.addEventListener("click", (event) => {

  // complete task
  if (event.target.className === "todoCheckBox") {
    console.log("completed todo id;", event.target.parentElement.dataset.todoid)

    let todoId = event.target.parentElement.dataset.todoid;
    let itemFromInventory = inventory.find(item => String(item.id) === String(todoId));


    itemFromInventory.htmlElement.querySelector(".checkBoxTickContainer").insertAdjacentHTML("afterbegin", '<path class="linePath checkBoxTickPath tickUpAnimation" d="M 10 50 Q 30 60, 40 80 Q 50 50, 90 10" />')

  }
})


todosContainer.addEventListener("animationend", (event) => {

  if (event.animationName === "tickUp") {
    setTimeout(() => {

      let todoId = event.target.closest(".todo").dataset.todoid;

      let itemFromInventory = inventory.find(item => String(item.id) === String(todoId));

      let todoHtmlElement = itemFromInventory.htmlElement;
      let todoText = itemFromInventory.htmlElement.querySelector(".todoInputTag").value

      // adds todo to the html and updates the value(text inside) to be what it was.
      document.getElementById("completedTodos").prepend(todoHtmlElement);
      itemFromInventory.htmlElement.querySelector(".todoInputTag").value = todoText;

      // since this is the end result where the tick is just visible we remove the animation; otherwise it keeps looping itself and this fucntion
      itemFromInventory.htmlElement.querySelector(".checkBoxTickPath").classList.remove("tickUpAnimation")


    }, 300)
  }

})

