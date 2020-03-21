document.addEventListener('DOMContentLoaded', () =>{
  const therapistsList = document.querySelector('#all-therapists-list')
  const apptsList = document.querySelector('#appointments-list')
  const apptInfoList = document.querySelector('#appointment-info-list')
  const apptForm = document.querySelector('#appointment-form')
  const clientNameInput = document.querySelector('#client-name-input')
  const therapistNameInput = document.querySelector('#therapist-name-input')
  const modalityInput = document.querySelector('#modality-input')
  const apptTimeInput = document.querySelector('#appointment-time-input')
  const specialRequestInput = document.querySelector('#special-request-input')

  
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

  apptInfoList.addEventListener('click', (e) => {
    if (e.target.className === 'edit' || e.target.dataset.action === 'edit') {
      const clickedAppt = parseInt(e.target.dataset.id);
      const foundAppt = Appointment.findAppointment(clickedAppt);

      clientNameInput.value = foundAppt.client.name
      therapistNameInput.value = foundAppt.massage_therapist.name
      modalityInput.value = foundAppt.modality
      apptTimeInput.value = foundAppt.appointment_time
      specialRequestInput.value = foundAppt.special_request
      apptForm.dataset.id = foundAppt.id
    }
  })

  apptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const updateApptId = e.target.dataset.id
    fetch(`http://localhost:3000/api/v1/appointments/${updateApptId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({        
        massage_therapist_id: parseInt(therapistNameInput[therapistNameInput.selectedIndex].dataset.id),
        client_id: parseInt(clientNameInput[clientNameInput.selectedIndex].dataset.id),
        appointment_time: apptTimeInput.value,
        modality: modalityInput.value,
        special_request: specialRequestInput.value
      })
    })
    .then((r) => r.json()) 
    .then((updatedApptJSON) => {
      const updatedAppt = Appointment.updateAppointment(updatedApptJSON)
      apptInfoList.innerHTML = updatedAppt.renderDetails()
    })
  })  

  let defaultOption = document.createElement('OPTION');
  therapistNameInput.add(defaultOption);
  fetch('http://localhost:3000/api/v1/massage_therapists')  
  .then(  
    function(response) {   
      response.json().then(function(appt) {  
        let option;
   
      for (let i = 0; i < appt.length; i++) {
          option = document.createElement('option');
          option.dataset.id = appt[i].id;
          option.text = appt[i].name;
          option.value = appt[i].name;
          therapistNameInput.add(option);
        }    
      });  
    }  
  )  
  
  let defaultClientOption = document.createElement('OPTION');
  clientNameInput.add(defaultClientOption);
  fetch('http://localhost:3000/api/v1/clients')  
  .then(  
    function(response) {   
      response.json().then(function(appt) {  
        let option;
    
      for (let i = 0; i < appt.length; i++) {
          option = document.createElement('option');
          option.dataset.id = appt[i].id;
          option.text = appt[i].name;
          option.value = appt[i].name;
          clientNameInput.add(option);
        }    
      });  
    }  
  )  
  
})



  