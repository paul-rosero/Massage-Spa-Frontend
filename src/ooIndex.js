const apptInfoList = document.querySelector('#appointment-info-list');
const apptsList = document.querySelector('#appointments-list')
const therapistsList = document.querySelector('#all-therapists-list')
const clientNameInput = document.querySelector('#client-name-input');
const therapistNameInput = document.querySelector('#therapist-name-input')  
const modalityInput = document.querySelector('#modality-input')
const apptTimeInput = document.querySelector('#appointment-time-input')
const specialRequestInput = document.querySelector('#special-request-input')
const apptForm = document.querySelector('#appointment-form');
const clientsList = document.querySelector("#all-clients-container")
const api = new ApiAdapter


document.addEventListener('DOMContentLoaded', () => { 
  api.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist, therapistsList);
  api.fetchApi("appointments", { method: 'GET' }, Appointment, apptsList);
  // api.fetchApi("clients", { method: 'GET' }, Client, clientsList);
  
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
      apptTimeInput.value = foundAppt.dateAndTime
      specialRequestInput.value = foundAppt.specialRequest
      apptForm.dataset.id = foundAppt.id
    }
  })
}

function formSubmitEvent() {
  api.fetchSelect("massage_therapists", therapistNameInput);
  api.fetchSelect("clients", clientNameInput);

  apptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const updateApptId = e.target.dataset.id
    api.fetchUpdate(`appointments/${updateApptId}`, Appointment, apptInfoList)
  })    
}
  
function sortButtonEvent() {
  const sortButton = document.getElementById('sort-button')
  sortButton.addEventListener('click', (e) => {
    e.preventDefault()
    api.fetchSortButton("massage_therapists", { method: 'GET' }, therapistsList, MassageTherapist)
  })
}  