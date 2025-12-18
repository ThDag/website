const body = document.getElementById("body");
console.log(body);

const newTaskButton = document.getElementById("newTaskButton");
console.log(todos);




newTaskButton.addEventListener("click", () => {

  let todoText = "this is a test";
  console.log("working")

  let newTaskTemplate = `
      <div class="todo" id="todo"><span class="todoCheckBox"></span><span class="todoText">${todoText}</span></div>
`


  let todos = document.getElementById("todos").innerHTML;
  document.getElementById("todos").innerHTML = `${todos} ${newTaskTemplate}`



})

