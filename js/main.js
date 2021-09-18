class Task{
    constructor(id, title, desc){
        this.id = id;
        this.title = title;
        this.desc = desc;
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
        console.log('asd');
        listAdded.innerHTML = `<h3 class='msj__notasks'>Ninguna tarea para hacer</h3>`;
    }
}

function showTasks(tasks, list){
    tasks.forEach((task) => {
        listAdded.innerHTML += `
            <div id=${task.id} class='task'>
                <h3 class='task__title'>${task.title}</h3>
                <p class='task__desc'>${task.desc}</p>
                <button class='task__button' onclick=passToDoing(${task.id})>PASS TO ${list.toUpperCase()}</button>
                <button class='task__button' onclick=deleteTask(${task.id})>DELETE</button>
            </div>
        `;
    });
}

function passToDoing(task){
    console.log('Pasando tarea ' + task + ' a DOING');
}

let listAdded = document.getElementById('taskAdded');
let tasks = JSON.parse(localStorage.getItem('tasks'));
if(tasks == null || tasks.length == 0){
    tasks = [];
    listAdded.innerHTML = `<h3 class='msj__notasks'>Ninguna tarea para hacer</h3>`;
}else{
    showTasks(tasks, 'doing');
}
function addTask(){
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if(title != '' && desc != ''){
        let task = new Task(0, title, desc);
        tasks.push(task);
        let id = tasks.length;
        task.id = id;
        let taskJSON = JSON.stringify(tasks);
        console.log(taskJSON);
        localStorage.setItem('tasks', taskJSON);
        listAdded.innerHTML = '';
        showTasks(tasks, 'doing');
    }else{
        alert('No ingreso ningun dato');
    }
    
    console.log(tasks);
}
