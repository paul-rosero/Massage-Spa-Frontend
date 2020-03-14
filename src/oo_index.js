document.addEventListener('DOMContentLoaded', () => {
    const endpoint = 'http://localhost:3000/api/v1/appointments';
    fetch(endpoint)
      .then(res => res.json())
      .then(json => json.forEach(appointment => {
        const newAppt = new Appointment(appointment);
        document.querySelector('#appointment-list').innerHTML += newAppt.renderDetails();
      })
    );
  });