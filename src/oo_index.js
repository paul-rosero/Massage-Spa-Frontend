document.addEventListener('DOMContentLoaded', () => {
    const appointments = 'http://localhost:3000/api/v1/appointments';
    fetch(appointments)
      .then(res => res.json())
      .then(json => json.forEach(appointment => {
        const markup = `
        <li>
            <h4>Appointment ${appointment.id}</h4>
            <p>Massage Therapist: ${appointment.massage_therapist.name}</p>
            <p>Client: ${appointment.client.name}</p>
            <p>Modality:${appointment.modality}</p>
            <p>Appointment Time: ${appointment.appointment_time}</p>
            <p>Special Requests: ${appointment.special_request}</p><br>
        </li>`;

        document.querySelector('#appointment-list').innerHTML += markup;
      })
    );
  });