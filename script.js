const formTodoElement = document.querySelector(".task-form")
const inputsForm = document.querySelectorAll('#input-element')
const coverLayerElement = document.querySelector(".cover-layer")
const btnOpenFormElement = document.querySelector(".new-task")
const iconClose = document.querySelector(".icon-close")
const form = document.getElementById("form");
const validate1 = document.getElementById("input-element")
const validate2 = document.getElementById("input-element2")
const validate3 = document.getElementById("input-element3")
const task = document.getElementById("task")
const task2 = document.getElementById("task2")
const task3 = document.getElementById("task3")
const status1 = document.querySelector(".status")
const title = document.querySelector(".title")
const countTodos = document.querySelector(".count")
const todo = document.getElementById("Todo")
const doing = document.getElementById("Doing")
const finished = document.getElementById("Finished")
const btnSubmitForm = document.querySelector(".btn-submit")
const todosItemFolder = document.querySelector(".todos--item__folder")

const statusTodo = document.querySelectorAll("input[name=status]")

console.log(statusTodo)

const getCurrentDate = () => {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const yyyy = today.getFullYear()

    today = mm + "/" + dd + "/" + yyyy
    return today
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});


let formValidation = () => {
    if (validate1.value === "") {
        validate1.style.border = "1px solid red"
    }
    else {
        validate1.style.border = "1px solid green"
    }
    if (validate2.value === "") {
        validate2.style.border = "1px solid red"
    }
    else {
        validate2.style.border = "1px solid green"
    }
    if (validate3.value === "") {
        validate3.style.border = "1px solid red"
    }
    else {
        validate3.style.border = "1px solid green"
    }
    if (validate1.value != "" & validate2.value != "" & validate3.value != "") {
        acceptData()
    }

};
let data = [];

let acceptData = () => {
    data.push({
        category: validate1.value,
        title: validate2.value,
        content: validate3.value,
        time: getCurrentDate(),
        state: statusTodo.value,
    });

    localStorage.setItem("data", JSON.stringify(data))
    createTasks()
};
let findSelected = () => {
    let selected = document.querySelector("input[name=status]:checked");
    statusTodo1()
    console.log(selected)
}
function statusTodo1() {
    statusTodo.forEach(statusTodo => {
        statusTodo.addEventListener("change",
            findSelected);
    })
}

let createTasks = () => {
    task.innerHTML = "";
    task2.innerHTML = "";
    task3.innerHTML = "";
    data.map((x, y) => {
        return (
            task.innerHTML += `
            <div class="todos--item__component" id=${y} >
                <div class="todos--component__header">
                    <a href="">${x.category}</a>
                    <div class="todos--component__icon">
                    <i onclick="editTask(this)" class="fa-solid fa-pen"></i>
                    <i onClick ="deleteTask(this)" class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <div class="todos--component__title">${x.title}</div>
                <div class="todos--component__line"></div>
                <h6>${x.content}</h6>
                <div class="todos--component__footer">
                <i class="fa-solid fa-clock"></i>
                <p>${x.time}</p>
                </div>
                </div>
                `);
    })

    resetForm()
};

let deleteTask = (e) => {
    e.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data))
}


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement.parentElement;
    let selectedTask1 = e.parentElement.parentElement;
    displayForm(true)
    function hehe() {
        status1.style.display = "flex"
        // isEdit = true
        title.innerHTML = "Edit to do"
    }

    validate1.value = selectedTask1.children[0].innerHTML;
    validate2.value = selectedTask.children[1].innerHTML;
    validate3.value = selectedTask.children[3].innerHTML;
    hehe()
    deleteTask(e);

}

let resetForm = () => {
    validate1.value = "";
    validate2.value = "";
    validate3.value = "";
};

const displayForm = (status) => {
    formTodoElement.style.display = status ? "block" : "none"
    coverLayerElement.style.display = status ? "block" : "none"
    status1.style.display = "none"
    // title.innerHTML = "Add new todo"
}

btnOpenFormElement.addEventListener("click", () => {
    displayForm(true)
})

iconClose.addEventListener("click", () => {
    displayForm(false)
    // if (isEdit) {
    // isEdit = false
    title.innerText = "Add New Todo"
    btnSubmitForm.innerText = "Submit"
    status1.style.display = "none"
    // }
});
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks()
})();
