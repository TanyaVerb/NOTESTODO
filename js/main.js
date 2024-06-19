//Находим элементы на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

//Добавление задачи
form.addEventListener("submit", addTask);
//Удаление задачи
tasksList.addEventListener("click", deleteTask);
//Отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

let tasks = [];

//Функции
function addTask(event) {
  //отменяем отправку формы
  event.preventDefault();

  //достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  //Описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //Добавляем задачу в массив с задачами
  tasks.push(newTask);
  console.log(tasks);

  //Формируем CSS класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  //формируем разметку для новой задачи
  const taskHTML = `<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18" />
              </button>
              <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18" />
              </button>
            </div>
          </li>`;

  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  //Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  //Проверка, Если в списке задач более 1-го элемента, скрываем блокЭСписок дел пуст"
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  //Проверяем если клик был  НЕ по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;

  //Проверяем что клик был по кнопке "удалить задачу"
  const parentNode = event.target.closest(".list-group-item");

  //Определяем ID задачи
  const id = Number(parentNode.id);

  //_________________________________
  //   //Находим индекс задачи в массиве
  //   const index = tasks.findIndex((task) => task.id === id);

  //   //Удаляем задачу из массива с задачами
  //   tasks.splice(index, 1);

  //Удаляем задачу через фильтрацию массива
  tasks = tasks.filter((task) => task.id !== id);
  console.log(tasks);
  //___________________________________________________
  //Удаляем задачу из разметки
  parentNode.remove();
  //Если в списке задач один элемент, показываем блок "Список дел пуст"
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  //Проверяем что клик был  НЕ по кнопке "задача выполнена"
  if (event.target.dataset.action !== "done") return;
  //Проверяем что клик был по кнопке "задача выполнена"
  const parentNode = event.target.closest(".list-group-item");
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}
