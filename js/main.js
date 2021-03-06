class Task{
    constructor(id, title, desc, status){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.status = status;
    }
};


let fecha = new Date();
let año = fecha.getFullYear();
let listAdded = document.getElementById('added');
let listDoing = document.getElementById('doing');
let listDone = document.getElementById('done');
let popUps = document.getElementById('erased');
let tasks = JSON.parse(localStorage.getItem('tasks'));
if(tasks === null || tasks.length === 0){
    tasks = [];
    popUps.innerHTML = `<h3 class='msj__notasks'>No other task to do...</h3>`;
    getFeriados();
    $('#erased').delay(3000).slideUp(800);
}else{
    showTasks(tasks);
    $('#erased').hide();
}

let inputs = [...document.getElementsByClassName('container__input')];
inputs[0].focus();

inputs.forEach((input) => {
    input.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            addTask();
        }
    })
})

function deleteTask(id){
    let containerID = document.getElementById(id);
    $(`#${id}`).hide();
    popUps.innerHTML = `<h3 class='msj__notasks'>Task eliminated...</h3>`;
    popUps.style.display = 'block';
    $('#erased').delay(1500).slideUp(800);
    tasks = tasks.filter(task => 
        task.id != id
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(tasks.length === 0 || tasks.length === null){
        listAdded.innerHTML = '';
        listDoing.innerHTML = '';
        listDone.innerHTML = '';
        popUps.innerHTML = `<h3 class='msj__notasks'>No other task to do...</h3>`;
        popUps.style.display = 'block';
        $('#erased').delay(1500).slideUp(800);
    }
}

function showTasks(tasks){
    listAdded.innerHTML = '';
    listDoing.innerHTML = '';
    listDone.innerHTML = '';
    let container = '';
    let buttonPass = '';
    tasks.forEach((task) => {
        if(task.status === 'added'){
            container = document.getElementById('added');
            buttonPass = `<button class='task__button' onclick=changeStatus(${task.id},doing)>TO DOING</button>`;
            buttonPass += `<button class='task__button' onclick=changeStatus(${task.id},done)>TO DONE</button>`;
        }else if(task.status === 'doing'){
            container = document.getElementById('doing');
            buttonPass = `<button class='task__button' onclick=changeStatus(${task.id},added)>TO ADDED</button>`;
            buttonPass += `<button class='task__button' onclick=changeStatus(${task.id},done)>TO DONE</button>`;
        }else{
            container = document.getElementById('done');
            buttonPass = `<button class='task__button' onclick=changeStatus(${task.id},added)>TO ADDED</button>`;
            buttonPass += `<button class='task__button' onclick=changeStatus(${task.id},doing)>TO DOING</button>`;
        }
        container.innerHTML += `
            <div id=${task.id} class='task'>
                <h3 class='task__title'>${task.title}</h3>
                <p class='task__desc'>${task.desc}</p>
                <div class='task__buttons'>
                    ${buttonPass}
                    <button class='task__button' onclick=deleteTask(${task.id})>DELETE</button>
                </div>
            </div>
        `;
    });
};

function changeStatus(id, status){
    tasks.filter(task => task.id === id).map(task => task.status = status.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
};

function addTask(){
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if(title !== '' && desc !== ''){
        let task = new Task(Date.now(), title, desc, 'added');
        tasks.push(task);
        let tasksJSON = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksJSON);
        showTasks(tasks);
    }else{
        popUps.innerHTML = `<h3 class='msj__notasks'>Enter a task please...</h3>`;
        popUps.style.display = 'block';
        $('#erased').delay(1500).slideUp(800);
    }
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
    inputs[0].focus();
};


function getFeriados(){
    fetch(`http://nolaborables.com.ar/api/v2/feriados/${año}`)
    .then(response => response.json())
    .then((feriados) => {
        mostrarProxFeriado(feriados);
    })
};
function mostrarProxFeriado(feriados){
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let proxFeriado = feriados.filter(feriado => feriado.mes === mes).filter(feriado => feriado.dia >= dia);
    if(proxFeriado.length === 0){
        if(mes !== 12){
            proxFeriado = feriados.filter(feriado => feriado.mes === mes + 1);
            popUps.innerHTML += `<h3 class='msj__notasks'>Next holiday in Argentina: ${proxFeriado[0].motivo} ${proxFeriado[0].dia}/${proxFeriado[0].mes}.</h3>`;
        }else if(dia > 25){
            popUps.innerHTML += `<h3 class='msj__notasks'>Next holiday in Argentina: Año Nuevo 1/1</h3>`;
        }
    }else{
        popUps.innerHTML += `<h3 class='msj__notasks'>Next holiday in Argentina: ${proxFeriado[0].motivo} ${proxFeriado[0].dia}/${proxFeriado[0].mes}.</h3>`;
    }
};