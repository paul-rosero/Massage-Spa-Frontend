document.addEventListener('DOMContentLoaded', () =>{
  const therapistsList = document.querySelector('#all-therapists-list')
  const apptsList = document.querySelector('#appointments-list')
  const apptInfoList = document.querySelector('#appointment-info-list')

  
  fetch('http://localhost:3000/api/v1/massage_therapists', {method: 'GET'})
  .then(resp =>resp.json())
  .then(therapistsDataJson => {
    therapistsDataJson.forEach(therapist =>{
      const newTherapist = new MassageTherapist(therapist)
      therapistsList.innerHTML += newTherapist.renderSpan()
    })
  })
  
  fetch('http://localhost:3000/api/v1/appointments', {method: 'GET'})
  .then(res => res.json())
  .then(json => json.forEach(appointment => {
    const newAppt = new Appointment(appointment);
    apptsList.innerHTML += newAppt.renderSpan();
  }))
  
  apptsList.addEventListener('click', (e) => {
    const clickedAppt = parseInt(e.target.dataset.id)
    const foundAppt = Appointment.findAppointment(clickedAppt)
    apptInfoList.innerHTML = foundAppt.renderDetails()
  })
})



  