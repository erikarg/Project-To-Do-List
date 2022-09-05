const createTaskButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const tasks = document.getElementsByTagName('li');

function createTask() {
  const items = document.createElement('li');
  if (input.value.length > 0) {
    items.innerHTML = input.value;
    items.id = 'tasks';
    list.appendChild(items);
  }
  input.value = null;
}
createTaskButton.addEventListener('click', createTask);

function changeBackgroundColor(event) {
  const selectedTask = event.target;
  for (let index = 0; index < tasks.length; index += 1) {
    if (tasks[index].className.includes('selected')) {
      tasks[index].classList.remove('selected');
    }
  }
  if (selectedTask !== list.id) {
    selectedTask.className += 'selected';
  }
}

list.addEventListener('click', changeBackgroundColor);

function lineThrough(event) {
  const selectedEvent = event.target;
  if (selectedEvent !== list.id && selectedEvent.className.includes('completed')) {
    selectedEvent.classList.remove('completed');
  } else if (selectedEvent !== list.id) {
    selectedEvent.className += ' completed';
  }
}
list.addEventListener('dblclick', lineThrough);

const eraseAllButton = document.getElementById('apaga-tudo');

function eraseAll() {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
eraseAllButton.addEventListener('click', eraseAll);

const eraseFinishedButton = document.getElementById('remover-finalizados');

function eraseFinished() {
  eraseFinishedButton.addEventListener('click', () => {
    const finishedTasks = document.querySelectorAll('li');
    for (let index = 0; index < finishedTasks.length; index += 1) {
      if (finishedTasks[index].className.includes('completed')) {
        list.removeChild(finishedTasks[index]);
      }
    }
  });
}
eraseFinished();

function saveTasks() {
  const options = document.querySelectorAll('li');
  const task = [];
  for (let index = 0; index < options.length; index += 1) {
    task.push(options[index].outerHTML);
  }
  localStorage.setItem('taskList', JSON.stringify(task));
}

window.onload = () => {
  if (localStorage.length !== 0) {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    for (let index = 0; index < taskList.length; index += 1) {
      list.innerHTML += taskList[index];
    }
  }
};

const saveListButton = document.getElementById('salvar-tarefas');
saveListButton.addEventListener('click', saveTasks);
