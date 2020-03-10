document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'http://localhost:3000/appointments';
    fetch(endPoint)
      .then(res => res.json())
      .then(json =>
        json.forEach(appointment => {
          const markup = `
          <li>
            <h3>${appointment}
              <button>edit</button>
            </h3>
          </li>`;
  
          document.querySelector('#appointment-list').innerHTML += markup;
        })
      );
  });