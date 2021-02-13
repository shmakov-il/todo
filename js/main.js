'use strict';

// Зададим переменные
const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

// Создадим массив для хранения дел
const todoData = [

];

// Создаем функцию render
const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const newElement = document.createElement('li');
    newElement.classList.add('todo-item');
    newElement.innerHTML =
    '<span class="text-todo">' + item.value + '</span>' + 
    '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' + 
    '</div>';

    if (item.value === '' || !item.value.trim()) {
      return;
    }
    
    todoControl.reset();

    if (item.completed) {
    todoCompleted.append(newElement);
    } else {
      todoList.append(newElement);
    }
    
    const buttomComplete = newElement.querySelector('.todo-complete');
    buttomComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    const buttonRemove = newElement.querySelector('.todo-remove');
    buttonRemove.addEventListener('click', function () {
      item.remove = !item.remove;
      
        const deleteElementArray = todoData.find( function(item) {
          return item.remove === true;
        });
        todoData.splice(todoData.indexOf(deleteElementArray), 1);
        console.log(deleteElementArray);
        if (deleteElementArray.remove === true) {
          console.log(0);
        } 
    });
    
    

  });
};

// Обрабатываем форму
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    comleted: false,
    remove: false
  };

  todoData.push(newTodo);

  render();
});



render();

