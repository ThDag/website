
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

  updateValue() {
    // it is necessary to update value to get the text written in the input box.
  }
}

const inventory = [];

let newestTodoId = 0;

newTaskButton.addEventListener("click", () => {

  newestTodoId += 1;

  let newTaskTemplate = `
  <div class="todo" data-todoid="${newestTodoId}"><span class="todoCheckBox"></span><input class="todoInputTag" type="text" placeholder="to-do"></div>`

  let todos = document.getElementById("todos").innerHTML;
  document.getElementById("todos").innerHTML = `${todos} ${newTaskTemplate}`

  newObj = new todoObject(newestTodoId);
  inventory.push(newObj);

})


todos.addEventListener("click", (event) => {

  // complete task
  if (event.target.className === "todoCheckBox") {
    console.log(event.target.parentElement.dataset.todoid)

    let todoId = event.target.parentElement.dataset.todoid;

    let completedTodosHtml = document.getElementById("completedTodos").innerHTML;
    console.log(completedTodosHtml)
    let todoHtml = inventory.find(item => String(item.id) === String(todoId)).htmlElement.parentElement.outerHTML;
    console.log(todoHtml)
    let todoText = document.querySelector(`[data-todoid="${event.target.parentElement.dataset.todoid}"] .todoInputTag`).value;
    // let odoText = inventory.find(item => String(item.id) === String(todoId)).htmlElement.value;
    // console.log(odoText)


    event.target.parentElement.remove()

    // adds todo to the html and updates the value(text inside) to be what it was.
    document.getElementById("completedTodos").innerHTML = `${completedTodosHtml}${todoHtml}`;
    document.querySelector(`[data-todoid="${event.target.parentElement.dataset.todoid}"] .todoInputTag`).value = todoText;
  }
})


testButton.addEventListener("click", () => {
  const bruhmoment = inventory.find(item => item.id === 2);
  console.log(bruhmoment.htmlElement);
  // console.log(bruhmoment.htmlElement.value);
  // console.log(document.querySelector('[data-todoid="2"] .todoInputTag').value);
})
