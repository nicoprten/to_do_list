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
    $('#erased').delay(2750).slideUp(800);
}else{
    showTasks(tasks);
}


function deleteTask(id){
    let containerID = document.getElementById(id);
    $(`#${id}`).animate({opacity: '0'}, 1500);
    tasks = tasks.filter(task => 
        task.id != id
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(tasks.length === 0 || tasks.length === null){
        popUps.innerHTML = `<h3 class='msj__notasks'>Task eliminated...</h3>`;
        popUps.style.display = 'block';
        $('#erased').delay(2750).slideUp(800);
    }
}

function showTasks(tasks){
    listAdded.innerHTML = '';
    listDoing.innerHTML = '';
    listDone.innerHTML = '';
    let container = '';
    let buttonPass = '';
    tasks.forEach((task) => {
        if(task.status == 'added'){
            container = document.getElementById('added');
            buttonPass = `<button class='task__button' onclick=passToDoing(${task.id})>PASS TO DOING</button>`;
            buttonPass += `<button class='task__button' onclick=passToDone(${task.id})>PASS TO DONE</button>`;
        }else if(task.status == 'doing'){
            container = document.getElementById('doing');
            buttonPass = `<button class='task__button' onclick=passToAdded(${task.id})>PASS TO ADDED</button>`;
            buttonPass += `<button class='task__button' onclick=passToDone(${task.id})>PASS TO DONE</button>`;
        }else{
            container = document.getElementById('done');
            buttonPass = `<button class='task__button' onclick=passToAdded(${task.id})>PASS TO ADDED</button>`;
            buttonPass += `<button class='task__button' onclick=passToDoing(${task.id})>PASS TO DOING</button>`;
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

function passToDoing(id){
    tasks.filter(task => task.id === id).map(task => task.status = 'doing');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
};
function passToDone(id){
    tasks.filter(task => task.id === id).map(task => task.status = 'done');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
};
function passToAdded(id){
    tasks.filter(task => task.id === id).map(task => task.status = 'added');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(tasks);
};

function addTask(){
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if(title !== '' && desc !== ''){
        let task = new Task(0, title, desc, 'added');
        tasks.push(task);
        let id = Date.now();
        task.id = id;
        let taskJSON = JSON.stringify(tasks);
        localStorage.setItem('tasks', taskJSON);
        showTasks(tasks);
    }else{
        alert('Enter a task please.');
    }
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
};

// Get de feriados no laborables 
// TODO obtener el año actual

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
    if(proxFeriado.length === 0 && mes !== 12){
        proxFeriado = feriados.filter(feriado => feriado.mes === mes + 1);
        popUps.innerHTML += `<h3 class='msj__notasks'>Próximo feriado: ${proxFeriado[0].motivo} ${proxFeriado[0].dia}/${proxFeriado[0].mes}.</h3>`;
    }else if(mes === 12 && dia > 25){
        popUps.innerHTML += `<h3 class='msj__notasks'>Próximo feriado: Año Nuevo 1/1</h3>`;
    }else{
        popUps.innerHTML += `<h3 class='msj__notasks'>Próximo feriado: ${proxFeriado[0].motivo} ${proxFeriado[0].dia}/${proxFeriado[0].mes}.</h3>`;
    }
};