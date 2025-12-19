
const newTaskButton = document.getElementById("newTaskButton");
const deleteTaskButton = document.getElementById("deleteTaskButton");
const todos = document.getElementById('todos')

// console.log(document.getElementById("todos").children);
// let jfds = document.getElementsByClassName('todo')
// console.log(jfds)


let newestTodoId = 0;

newTaskButton.addEventListener("click", () => {
  let todoText = "this is a test";

  newestTodoId += 1;
  // let newTaskTemplate = `
  //     <div class="todo" data-todoid="${newestTodoId}">
  //       <span class="todoCheckBox"></span>
  //       <span class="todoText">${todoText} ${newestTodoId}</span>
  //     </div>`

  let newTaskTemplate = `
  <div class="todo" data-todoid="${newestTodoId}"><span class="todoCheckBox"></span><input class="todoInputTag" type="text" placeholder="to-do" value="${todoText} ${newestTodoId}"></div>`

  let todos = document.getElementById("todos").innerHTML;
  document.getElementById("todos").innerHTML = `${todos} ${newTaskTemplate}`

})


todos.addEventListener("click", (event) => {

  // complete task
  if (event.target.className === "todoCheckBox") {
    console.log(event.target.parentElement.dataset.todoid)
    event.target.parentElement.remove()
  }
})
