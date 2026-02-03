'use strict';

const main = document.getElementById('main');
const addBtn = document.getElementById('add-btn');
const options = {
  duration: 250,
  easing: 'ease',
};
let checkboxes = [];
let textareas = [];
let all = [];
let rect = [];
let todos = [];


function loadTodos() {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  for (let i = 0; i < todos.length; i++) {
    addBtn.insertAdjacentHTML('beforebegin', `<div class="todo"><input type="checkbox" class="checkbox" ${todos[i].checked ? "checked" : ""}><textarea rows="1" >${todos[i].text}</textarea><button class="del-btn"></button></div>`);
  };
  getTodos();
};

function saveTodos() {
  todos = [];
  for (let i = 0; i < textareas.length; i++) {
    todos.push({
      text: textareas[i].value,
      checked: checkboxes[i].checked,
    });
  };
  localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
  checkboxes = document.querySelectorAll('.checkbox');
  textareas = document.querySelectorAll('textarea');
  all = document.querySelectorAll("main > *")
};

function adjustHeight() {
  textareas.forEach(el => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  });
};

function animation() {
  all.forEach((e, i) => e.animate({
    transform: [`translate(0, ${rect[i] - e.getBoundingClientRect().y}px)`, `translate(0, 0)`],
  }, options));
  getTodos();
  saveTodos();
};

loadTodos();
adjustHeight();

main.addEventListener('click', (e) => {
  rect = Object.fromEntries(Object.entries(all).map(([i, e]) => [i, e.getBoundingClientRect().y]));
  if (e.target.id === 'add-btn') {
    addBtn.insertAdjacentHTML('beforebegin', `<div class="todo new"><input type="checkbox" class="checkbox"><textarea rows="1"></textarea><button class="del-btn"></button></div>`);
    animation();
  } else if (e.target.classList.contains('del-btn')) {
    e.target.parentElement.classList.toggle('del');
    setTimeout(() => {
      e.target.parentElement.remove();
      animation();
    }, 125);
  };
});

window.addEventListener('resize', adjustHeight);

document.addEventListener('input', () => {
  saveTodos();
  adjustHeight();
});