class Task{
    constructor(id, title, desc, status){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.status = status;
    }
};

function deleteTask(id){
    console.log(listAdded)
    let containerID = document.getElementById(id);
    containerID.remove();
    tasks = tasks.filter(task => 
        task.id != id
    );
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(tasks.length == 0){
        listAdded.innerHTML = `<h3 class='msj__notasks'>Ninguna tarea para hacer</h3>`;
    }
}

function showTasks(tasks){
    // let container = document.getElementById(list);
    // console.log(container);
    // let toWhere;
    // 
    //     toWhere = 'DOING'
    // }else{
    //     toWhere = 'DONE';
    // }
    listAdded.innerHTML = '';
    listDoing.innerHTML = '';
    listDone.innerHTML = '';
    let container = '';
    let buttonPass = '';
    tasks.forEach((task) => {
        if(task.status == 'added'){
            container = document.getElementById('added');
            buttonPass = `<button class='task__button' onclick=passToDoing(${task.id})>PASS TO DOING</button>`;
        }else if(task.status == 'doing'){
            container = document.getElementById('doing');
            buttonPass = `<button class='task__button' onclick=passToDone(${task.id})>PASS TO DONE</button>`;
        }else{
            container = document.getElementById('done');
            buttonPass = `<button class='task__button' onclick=passToDoing(${task.id})>PASS TO DOING</button>`;
        }
        container.innerHTML += `
            <div id=${task.id} class='task'>
                <h3 class='task__title'>${task.title}</h3>
                <p class='task__desc'>${task.desc}</p>
                ${buttonPass}
                <button class='task__button' onclick=deleteTask(${task.id})>DELETE</button>
            </div>
        `;
    });
}

function passToDoing(id){
    tasks.filter(task => task.id === id).map(task => task.status = 'doing');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
}
function passToDone(id){
    tasks.filter(task => task.id === id).map(task => task.status = 'done');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
}

// let tasksDoing = [];
let listAdded = document.getElementById('added');
let listDoing = document.getElementById('doing');
let listDone = document.getElementById('done');
let tasks = JSON.parse(localStorage.getItem('tasks'));
if(tasks == null || tasks.length == 0){
    tasks = [];
    listAdded.innerHTML = `<h3 class='msj__notasks'>Ninguna tarea para hacer</h3>`;
}else{
    // tasks.forEach((task)=>{
        showTasks(tasks);
    // })
}
function addTask(){
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if(title != '' && desc != ''){
        let task = new Task(0, title, desc, 'added');
        tasks.push(task);
        let id = Date.now();
        task.id = id;
        let taskJSON = JSON.stringify(tasks);
        localStorage.setItem('tasks', taskJSON);
        showTasks(tasks);
    }else{
        alert('No ingreso ningun dato');
    }
}
