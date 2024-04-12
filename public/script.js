
const hitPointsValue = document.querySelector('.hitPoints__value');

const buttonAdd = document.getElementById("button__hp-add");
const buttonRemove = document.getElementById("button__hp-remove");

buttonAdd.addEventListener("click", function () { setHitPoints('add') });
buttonRemove.addEventListener("click", function () { setHitPoints('remove') });


function setHitPoints(change) {  
  // Отключает кнопки
  buttonAdd.classList.add('button_type_disabled');
  buttonRemove.classList.add('button_type_disabled');
  buttonAdd.setAttribute("disabled", "");
  buttonRemove.setAttribute("disabled", "");

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      change: change,
    }),
  })
    .then(function(response) {
      if (!response.ok) { return Promise.reject(`Ошибка: ${response.status}`); }
      return response.json();
    })
    .then(function(data) {
      // Выводит новое значение HP
      hitPointsValue.textContent = JSON.parse(data.hitPoints);
    })
    .finally(function() {
      // Включает обратно кнопки
      buttonAdd.classList.remove('button_type_disabled');
      buttonRemove.classList.remove('button_type_disabled');
      buttonAdd.removeAttribute("disabled");
      buttonRemove.removeAttribute("disabled");
    });
}
