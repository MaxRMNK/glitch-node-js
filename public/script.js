
const hitPointsValue = document.querySelector('.hitPoints__value');

const buttonAdd = document.getElementById("button__hp-add");
const buttonRemove = document.getElementById("button__hp-remove");

buttonAdd.addEventListener("click", function () { setHitPoints('add') });
buttonRemove.addEventListener("click", function () { setHitPoints('remove') });

function editHitPoints() {
  const dataHitPoints = localStorage.getItem('dataHitPoints');

  if (dataHitPoints) {
    const data = JSON.parse(dataHitPoints);

    if(Number.isInteger(data.hitPoints)) {
      hitPointsValue.textContent = data.hitPoints;
      return
    }
  }

  hitPointsValue.textContent = 10;
  localStorage.setItem('dataHitPoints', JSON.stringify({ hitPoints: 10 }) );
}
editHitPoints();


function setHitPoints(change) {
  const dataHitPoints = localStorage.getItem('dataHitPoints');

  let newHitPoints = 0;

  if (dataHitPoints) {
    const data = JSON.parse(dataHitPoints);

    if(Number.isInteger(data.hitPoints)) {
      
      if (change === 'add') {
        newHitPoints = data.hitPoints + 10;
      } else if (change === 'remove' && data.hitPoints >= 10) {
        newHitPoints = data.hitPoints - 10;
      }
    }
  }

  localStorage.setItem('dataHitPoints', JSON.stringify({ hitPoints: newHitPoints }) );
  hitPointsValue.textContent = newHitPoints;
}



/*
function setHitPoints(change) {
  console.log('setHitPoints points: ', change);
  
  buttonAdd.classList.add('button_type_disabled');
  buttonRemove.classList.add('button_type_disabled');

  buttonAdd.setAttribute("disabled", "");
  buttonRemove.setAttribute("disabled", "");

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({
    //   hitPoints: 20
    // }),
    body: JSON.stringify({ 
      change: change,
    }),
  })
    .then(function(response) {
    //   console.log('then 1, response', response);
      if (!response.ok) { return Promise.reject(`Ошибка: ${response.status}`); }
    //   return response;
      return response.json();
    })
    .then(function(data) {
      hitPointsValue.textContent = JSON.parse(data.hitPoints);
    //   hitPointsValue.textContent = '50';
    //   console.log('then 2, data', data);
    })
    .finally(function() {
      buttonAdd.classList.remove('button_type_disabled');
      buttonRemove.classList.remove('button_type_disabled');

      buttonAdd.removeAttribute("disabled");
      buttonRemove.removeAttribute("disabled");
    });
}
*/
