"use strict";
document.addEventListener('DOMContentLoaded',()=>{
  CreateTodoApp(document.getElementById('todos'),title.toUpperCase(),key)
})
// searchBar
const searchBar = document.getElementById("searchBar");
const filterContainer = document.getElementById('filterContainer');

searchBar.addEventListener("keyup", (e) => {
   const searchString = e.target.value;
  const filteredTodos = todoArray.filter((name)  => {
    return( name.name.includes(searchString) || name.id.includes(searchString)
    )
  })
 console.log(filteredTodos)
});

let todoArray = [];
let key = "todos";
let title='todo aplication';
const CreateTitleApp = (title) => {
  const appTitle = document.createElement("h1");
  appTitle.innerHTML = title;
  appTitle.classList.add("text-center");
  return appTitle;
};
const CreateFormApp = () => {
  const form = document.createElement("form");
  form.classList.add("input-group", "mb-3");

  const wrap = document.createElement("div");
  wrap.classList.add("input-group-append");

  const input = document.createElement("input");
  input.classList.add("form-control");
  input.placeholder = "Введите задачи на день";

  const addButton = document.createElement("button");
  addButton.textContent = "ADD TODO";
  addButton.classList.add("btn", "btn-warning");

  wrap.append(addButton);
  form.append(input);
  form.append(wrap);

  return {
    form,
    input,
    addButton,
  };
};
const CreateTodoListApp = () => {
  const list = document.createElement("ul");
  list.classList.add("list-group");

  return list;
};
const CreateTodoItemApp = (name) => {
  const Itemtodo = document.createElement("li");
  Itemtodo.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mt-3"
  );
  Itemtodo.textContent = name;
  const randomId = Math.random() * 15.75;
  Itemtodo.id = randomId.toFixed(2);
  const btnWrap = document.createElement("div");
  const doneButton = document.createElement("button");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Задача выполнена";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить задачу";

  btnWrap.append(doneButton, deleteButton);
  Itemtodo.append(btnWrap);

  return {
    Itemtodo,
    deleteButton,
    doneButton,
    btnWrap,
  };
};
const changeItemDone = (arr, item) => {
  arr.map((obj) => {
    if ((obj.id === item.id) & (obj.done === false)) {
      obj.done = true;
    } else if ((obj.id === item.id) & (obj.done === true)) {
      obj.done = false;
    }
  });
};
const completeTodoItem = (item, btn) => {
  btn.addEventListener("click", () => {
    todoArray = JSON.parse(localStorage.getItem(key));
    item.classList.toggle("bg-success");
    changeItemDone(todoArray, item);

    localStorage.setItem(key, JSON.stringify(todoArray));
  });
};
const deleteTodoItem = (item, btn) => {
  btn.addEventListener("click", () => {
    if (confirm("Вы уверены что хотите удалить задачу?")) {
      todoArray = JSON.parse(localStorage.getItem(key));
      const newList = todoArray.filter((obj) => obj.id !== item.id);
      localStorage.setItem(key, JSON.stringify(newList));
      item.remove();
    }
  });
};
const CreateTodoApp = (container, title, key) => {
  const appTitle = CreateTitleApp(title);
  const appForm = CreateFormApp();
  const appList = CreateTodoListApp();

  container.append(appTitle, appForm.form, appList);

  if (localStorage.getItem(key)) {
    todoArray = JSON.parse(localStorage.getItem(key));

    for (const obj of todoArray) {
      const todoItem = CreateTodoItemApp(appForm.input.value);

      todoItem.Itemtodo.textContent = obj.name;
      todoItem.Itemtodo.id = obj.id;

      if (obj.done == true) {
        todoItem.Itemtodo.classList.add("bg-success");
      } else {
        todoItem.Itemtodo.classList.remove("bg-success");
      }

      completeTodoItem(todoItem.Itemtodo, todoItem.doneButton);
      deleteTodoItem(todoItem.Itemtodo, todoItem.deleteButton);

      appList.append(todoItem.Itemtodo);
      todoItem.Itemtodo.append(todoItem.btnWrap);
    }
  }

  appForm.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoItem = CreateTodoItemApp(appForm.input.value);
    if (!appForm.input.value) {
      return;
    }

    completeTodoItem(todoItem.Itemtodo, todoItem.doneButton);
    deleteTodoItem(todoItem.Itemtodo, todoItem.deleteButton);

    let localStorageData = localStorage.getItem(key);
    if (localStorageData == null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(localStorageData);
    }

    const createItemObj = (arr) => {
      const itemObj = {};
      itemObj.name = appForm.input.value;
      itemObj.id = todoItem.Itemtodo.id;
      itemObj.done = false;

      arr.push(itemObj);
    };
    createItemObj(todoArray);
    localStorage.setItem(key, JSON.stringify(todoArray));

    appList.append(todoItem.Itemtodo);
    appForm.input.value = "";
  });
};
