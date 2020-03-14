document.addEventListener('DOMContentLoaded', () =>{
  const apptsList = document.querySelector('#appointments-list')
})

fetch('http://localhost:3000/massage_therapsists', {method: 'get'})
.then(resp =>resp.json())
.then(therapistsDataJson => {
  therapistsDataJson.forEach(therapist =>{
    const newTherapist = new MassageTherapist(therapist)

  })
})  

document.addEventListener('DOMContentLoaded', () => {
    const endpoint = 'http://localhost:3000/api/v1/appointments';
    fetch(endpoint)
      .then(res => res.json())
      .then(json => json.forEach(appointment => {
        const newAppt = new Appointment(appointment);
        apptsList.innerHTML += newAppt.renderDetails();
      })
    );
  });