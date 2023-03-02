const formTodoElement = document.querySelector('.task-form')
const coverLayerElement = document.querySelector('.cover-layer')
const btnOpenFormElement = document.querySelector('.new-task')
const iconClose = document.querySelector('.icon-close')
const form = document.getElementById("form");
const validate1 = document.getElementById("input-element")
const validate2 = document.getElementById("input-element2")
const validate3 = document.getElementById("input-element3")
const task = document.getElementById("task")
const status1 = document.querySelector('.status')
const title = document.querySelector(".title")
const countData = document.querySelector(".count")
const todo = document.getElementById("todo")
const doing = document.getElementById("doing")
const finished = document.getElementById("finished")


const getCurrentDate = () => {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    today = mm + '/' + dd + '/' + yyyy
    return today
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});


let formValidation = () => {
    if (validate1.value === "") {
        validate1.style.border = '1px solid red'
    }
    else {
        validate1.style.border = '1px solid green'
    }
    if (validate2.value === "") {
        validate2.style.border = '1px solid red'
    }
    else {
        validate2.style.border = '1px solid green'
    }
    if (validate3.value === "") {
        validate3.style.border = '1px solid red'
    }
    else {
        validate3.style.border = '1px solid green'
    }
    if (validate1.value != "" & validate2.value != "" & validate3.value != "") {
        acceptData()
    }

};
let data = {};

let acceptData = () => {
    data["category"] = validate1.value;
    data["title"] = validate2.value;
    data["content"] = validate3.value;
    data["time"] = getCurrentDate();
    data["status"] = '';
    createTasks()
}

let createTasks = () => {
    task.innerHTML += `
    <div class="todos--item__component" >
        <div class="todos--component__header">
            <a href="">${data.category}</a>
            <div class="todos--component__icon">
            <i onclick="editTask(this)" class="fa-solid fa-pen"></i>
            <i onClick ="deleteTask(this)" class="fa-solid fa-trash"></i>
            </div>
        </div>
        <div class="todos--component__title">${data.title}</div>
        <div class="todos--component__line"></div>
        <h6>${data.content}</h6>
        <div class="todos--component__footer">
            <i class="fa-solid fa-clock"></i>
            <p>${data.time}</p>
        </div>
        </div>
    `

    resetForm()
};

const TODO_TYPE = 'TODO_TYPE'
const TODO_DOING_TYPE = 'TODO_DOING_TYPE'
const TODO_FINISHED_TYPE = 'TODO_FINISHED_TYPE'

// const render = () => {
//     let htmlTodos = ''
//     let htmlTodosDoing = ''
//     let htmlTodosFinished = ''

//     const countCategoryTodo = {
//         todo: 0,
//         doing: 0,
//         finished: 0,
//     }

//     data.forEach((todo) => {
//         switch (todo.status) {
//             case TODO_TYPE: {
//                 htmlTodos += createTasks()
//                 countCategoryTodo.todo += 1
//                 break
//             }
//             case TODO_DOING_TYPE: {
//                 htmlTodosDoing += createTasks()
//                 countCategoryTodo.doing += 1

//                 break
//             }
//             case TODO_FINISHED_TYPE: {
//                 htmlTodosFinished += createTasks()
//                 countCategoryTodo.finished += 1
//                 break
//             }
//         }
//     })
//     todo.innerHTML = htmlTodos
//     doing.innerHTML = htmlTodosDoing
//     finished.innerHTML = htmlTodosFinished

//     countData.forEach((categoryTodoCount) => {
//         categoryTodoCount.innerText = countCategoryTodo[categoryTodoCount.id]
//     })
// }
// render()


let deleteTask = (e) => {
    e.parentElement.parentElement.parentElement.remove()
}


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement.parentElement;
    let selectedTask1 = e.parentElement.parentElement;
    let selectedTask2 = e.parentElement.parentElement.parentElement.parentElement;
    displayForm(true)
    function hehe() {
        status1.style.display = "flex"
        isEdit = true
        title.innerHTML = "Edit to do"
    }

    validate1.value = selectedTask1.children[0].innerHTML;
    validate2.value = selectedTask.children[1].innerHTML;
    validate3.value = selectedTask.children[3].innerHTML;
    hehe()
    selectedTask.remove()
}

let resetForm = () => {
    validate1.value = "";
    validate2.value = "";
    validate3.value = "";
};

const displayForm = (status) => {
    formTodoElement.style.display = status ? 'block' : 'none'
    coverLayerElement.style.display = status ? 'block' : 'none'
    status1.style.display = "none"
    title.innerHTML = "Add new todo"
}

btnOpenFormElement.addEventListener('click', () => {
    displayForm(true)
})

iconClose.addEventListener('click', () => {
    displayForm(false)
    if (isEdit) {
        isEdit = false
        titleForm.innerText = 'Add New Todo'
        btnSubmitForm.innerText = 'Submit'
        status.style.display = 'none'
        clearFormTodoValue()
    }
});

