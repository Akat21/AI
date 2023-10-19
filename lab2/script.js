const addButton = document.getElementById("add-btn");

const todoList = [];

const addTodo = () => {
    const todoNameInputElement = document.getElementById("add-input");
    const name = todoNameInputElement.value;
    todoList.push({id: todoList.length, name: name, checked: false})
    draw();
}

addButton.addEventListener("click", addTodo);

const todoNameInputElement = document.getElementById("add-input");
todoNameInputElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTodo();
    }
});

const draw = (name) =>{
    const todoListContainer = document.getElementsByClassName("todo-items-container")[0];
    const item = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const p = document.createElement("p");
    item.className = "todo-item-container";

    todoList.map((todoList) => {
        p.innerText = todoList.name;
        checkbox.checked = todoList.checked;
        
        item.appendChild(checkbox);
        item.appendChild(p);

        todoListContainer.appendChild(item);
    })
}


