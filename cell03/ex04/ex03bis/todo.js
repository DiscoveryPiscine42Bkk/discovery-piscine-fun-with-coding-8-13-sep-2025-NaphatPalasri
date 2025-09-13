$(document).ready(function () {

  loadTodos();

  $("#newBtn").click(function () {
    let task = prompt("Enter your new TO DO:");
    if (task && task.trim() !== "") {
      addTodo(task.trim());
      saveTodos();
    }
  });

  function addTodo(text) {
    let $todoDiv = $("<div></div>")
      .addClass("todo")
      .text(text)
      .click(function () {
        if (confirm("Do you want to remove this TO DO?")) {
          $(this).remove();
          saveTodos();
        }
      });
      $("#ft_list").prepend($todoDiv);
  }

  function saveTodos() {
    let todos = [];
    $(".todo").each(function () {
      todos.push($(this).text());
    });
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=" + (72460 * 60);}

  function loadTodos() {
    let cookies = document.cookie.split("; ");
    let todoCookie = cookies.find(row => row.startsWith("todos="));
    if (todoCookie) {
      let todos = JSON.parse(decodeURIComponent(todoCookie.split("=")[1]));
      todos.forEach(todo => addTodo(todo));
    }
  }
});