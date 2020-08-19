class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = [];
    this.adapter = new ApiAdapter();
    this.allContentLoaded();
    this.addEventListeners();
  }

  addEventListeners(){ 
    const clickApptForm = document.getElementById("appointment");
    const sortButton = document.getElementById('sort-button');
    
    clickApptForm.addEventListener("click", appt => { 
      Appointment.prototype.clickToRenderApptForm(appt) 
      this.apptForm = document.querySelector('#appointment-form');
      this.clientNameInput = document.querySelector('#client-name-input');
      this.therapistNameInput = document.querySelector('#therapist-name-input');
      this.modalityInput = document.querySelector('#modality-input');
      this.apptTimeInput = document.querySelector('#appointment-time-input');
      this.specialRequestInput = document.querySelector('#special-request-input');

      this.apptForm.addEventListener('submit', this.clickToCreateAppt())
    })
    
    Appointment.prototype.deleteAppointment();
    Appointment.prototype.clickToShowAppt();
    sortButton.addEventListener('click', (e) => { MassageTherapist.sortTherapistName(e) })
    MassageTherapist.prototype.renderNewTherapistForm()
  }

  clickToCreateAppt(){
    this.apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      ApiAdapter.fetchCreateClassObject("appointments", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({        
          client_id: e.target[0].selectedOptions[0].id,
          massage_therapist_id: e.target[1].selectedOptions[0].id,
          modality: e.target[2].value,
          date_and_time: e.target[3].value,
          special_request: e.target[4].value
        })
      }, this.appointments, Appointment)
      .then(() => {
        this.clientNameInput.value = "";
        this.therapistNameInput.value = "";
        this.modalityInput.value = "";
        this.apptTimeInput.value = "";
        this.specialRequestInput.value = "";
        this.renderLi()
      })
    })
  }

  allContentLoaded() {
    this.adapter.fetchApi("appointments", { method: 'GET' }, this.appointments, Appointment).then(() => { this.renderLi() });
    
    this.adapter.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist.allTherapists, MassageTherapist)
  }  

  // findAppointment(id) {
  //   return Appointments.find((appointment) => appointment.id === id)
  // }

  renderLi(){
    const apptsContainer = document.querySelector('#appointments-container');
    apptsContainer.innerHTML = Appointment.allAppointments.map(appt => `<li id="appointment-${appt.id}">Appointment ${appt.id}</li>`).join("")
  }

}