const addButton = document.getElementById("add-btn");
const searchButton = document.getElementById("search-btn");
const todoListContainer = document.getElementsByClassName("todo-items-container")[0];

const todoList = [];

const addTodo = () => {
    const todoNameInputElement = document.getElementById("add-input");
    const todoDateInputElement = document.getElementById("date-input");
    const date = todoDateInputElement.value;
    const name = todoNameInputElement.value;
    if (name === "") {
        alert("Dodaj nazwę swojego elementu TODO listy!");
        return;
    } else {
        todoList.push({id: todoList.length, name: name, date: date, checked: false})
        todoNameInputElement.value = "";
        draw();
    }
}

const findTodo = () => {
    const todoSearchInputElement = document.getElementById("search-input");
    const search = todoSearchInputElement.value;
    draw();
    if (search === ""){
        alert("Wpisz nazwę elementu TODO listy, którego szukasz!");
        return;
    } else {
        const names = document.getElementsByClassName("name-display");
        Array.from(names).forEach((name) => {
            if (name.innerText.includes(search)){
                name.innerHTML = name.innerText.replace(new RegExp(search, 'g'), `<mark>${search}</mark>`);
            }
        });
        todoSearchInputElement.value = "";
    }
}

searchButton.addEventListener("click", findTodo);

addButton.addEventListener("click", addTodo);

const todoNameInputElement = document.getElementById("add-input");
todoNameInputElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTodo();
    }
});

const todoSearchInputElement = document.getElementById("search-input");
todoSearchInputElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        findTodo();
    }
});

const draw = () =>{
    todoListContainer.innerHTML = "";

    todoList.map((todoListItem) => {
        const item = document.createElement("div");
        item.className = "todo-item-container";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todoListItem.checked;

        const name = document.createElement("p");
        name.className = "name-display";
        name.innerText = todoListItem.name;

        const date = document.createElement("p");
        date.className = "date-display";
        date.innerText = todoListItem.date;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        const deleteIcon = document.createElement("span");
        deleteIcon.className = "material-symbols-outlined";
        deleteIcon.textContent = "close";
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click", () => {
            const idx = todoList.findIndex(item => item.id === todoListItem.id);
            todoList.splice(idx, 1);
            draw();
        });
        
        item.appendChild(checkbox);
        item.appendChild(name);
        item.appendChild(date);
        item.appendChild(deleteButton);

        todoListContainer.appendChild(item);
    })
}


