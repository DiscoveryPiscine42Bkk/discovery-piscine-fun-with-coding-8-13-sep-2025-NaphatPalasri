window.onload = function () {
  loadTodos();
};

document.getElementById("newBtn").addEventListener("click", function () {
  let task = prompt("Enter your new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
    saveTodos();
  }
});

function addTodo(text) {
  let todoDiv = document.createElement("div");
  todoDiv.className = "todo";
  todoDiv.textContent = text;

  todoDiv.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      todoDiv.remove();
      saveTodos();
    }
  });

  let list = document.getElementById("ft_list");
  list.insertBefore(todoDiv, list.firstChild);
}

function saveTodos() {
  let todos = [];
  document.querySelectorAll(".todo").forEach(todo => {
    todos.push(todo.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=" + 72460*60;
}

function loadTodos() {
  let cookies = document.cookie.split("; ");
  let todoCookie = cookies.find(row => row.startsWith("todos="));
  if (todoCookie) {
    let todos = JSON.parse(decodeURIComponent(todoCookie.split("=")[1]));
    todos.forEach(todo => addTodo(todo));
  }
}