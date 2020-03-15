document.addEventListener('DOMContentLoaded', () =>{
  fetch('http://localhost:3000/api/v1/massage_therapists', {method: 'GET'})
  .then(resp =>resp.json())
  .then(therapistsDataJson => {
    therapistsDataJson.forEach(therapist =>{
      const therapistsList = document.querySelector('#all-therapists-list')
      const newTherapist = new MassageTherapist(therapist)
      therapistsList.innerHTML += newTherapist.renderSpan()
    })
  })  
})
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/v1/appointments', {method: 'GET'})
    .then(res => res.json())
    .then(json => json.forEach(appointment => {
      const apptsList = document.querySelector('#appointments-list')
      const newAppt = new Appointment(appointment);
      apptsList.innerHTML += newAppt.renderDetails();
    }))
  })




  