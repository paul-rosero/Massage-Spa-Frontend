  const therapistsList = document.querySelector('#all-therapists-list')
  const apptsList = document.querySelector('#appointments-list')
  const apptInfoList = document.querySelector('#appointment-info-list')
  const apptForm = document.querySelector('#appointment-form')
  const clientNameInput = document.querySelector('#client-name-input')
  const therapistNameInput = document.querySelector('#therapist-name-input')
  const modalityInput = document.querySelector('#modality-input')
  const apptTimeInput = document.querySelector('#appointment-time-input')
  const specialRequestInput = document.querySelector('#special-request-input')
const api = new apiAdapter

document.addEventListener('DOMContentLoaded', () =>{ 
  api.fetchApi("massage_therapists", { method: 'GET' })
  .then(json => {json.forEach( therapist => {
      const newTherapist = new MassageTherapist(therapist)
      therapistsList.innerHTML += newTherapist.renderDetails()
    })
  })
  
  api.fetchApi("appointments", { method: 'GET' })
  .then(json => json.forEach( appointment => {
    const newAppt = new Appointment(appointment);
    apptsList.innerHTML += newAppt.renderSpan();
  }))

  sortButtonEvent();
  clickEvents();
  formSubmitEvent();

})  

function clickEvents() {
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
      therapistNameInput.value = foundAppt.massageTherapist.name
      modalityInput.value = foundAppt.modality
      apptTimeInput.value = foundAppt.appointmentTime
      specialRequestInput.value = foundAppt.specialRequest
      apptForm.dataset.id = foundAppt.id
    }
  })
}

function formSubmitEvent() {
  apptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const updateApptId = e.target.dataset.id
    api.fetchApi(`appointments/${updateApptId}`, {
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
    .then((updatedApptJSON) => {
      const updatedAppt = Appointment.updateAppointment(updatedApptJSON)
      apptInfoList.innerHTML = updatedAppt.renderDetails()
    })
  })  

  api.fetchSelect("massage_therapists", therapistNameInput)
   
  api.fetchSelect("clients", clientNameInput)

}
  
function sortButtonEvent() {
  const sortButton = document.getElementById('sort-button')
  sortButton.addEventListener('click', (e) => {
    e.preventDefault()
    api.fetchApi("massage_therapists", { method: 'GET' })
    .then(therapistsDataJson => {
      const newTherapist = therapistsDataJson.sort(function(a, b) {
        if (a.name < b.name ) {
          return -1;
        } 
        if (a.name > b.name) {
          return 1;
        }
        return 0
      })
      therapistsList.innerHTML = ""
      newTherapist.forEach(therapist => {
        const finalTherapist = new MassageTherapist(therapist)
        therapistsList.innerHTML += finalTherapist.renderDetails()
      })
    })
  })
}




  