class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.adapter = new ApiAdapter();
    this.allContentLoaded();
    this.bindVariables();
    this.addEventListeners();
  }

  bindVariables(){
    this.clientNameInput = document.querySelector('#client-name-input');
    this.therapistNameInput = document.querySelector('#therapist-name-input');
    this.modalityInput = document.querySelector('#modality-input');
    this.apptTimeInput = document.querySelector('#appointment-time-input');
    this.specialRequestInput = document.querySelector('#special-request-input');
    this.clickApptForm = document.getElementById("appointment");
    this.sortButton = document.getElementById('sort-button');
    
  }

  addEventListeners(){ 
    this.clickApptForm.addEventListener("click", appt => { 
      Appointment.prototype.clickToRenderApptForm(appt) 
      Appointment.prototype.clickToCreateAppt()
    })
    
    Appointment.prototype.deleteAppointment();
    Appointment.prototype.clickToShowAppt();
    this.sortButton.addEventListener('click', (e) => { MassageTherapist.prototype.sortTherapistName(e) })
    MassageTherapist.prototype.renderNewTherapistForm()
  }

  allContentLoaded() {
    this.adapter.fetchApi("appointments", { method: 'GET' },Appointment.allAppointments , Appointment).then(() => { this.renderLi() });
    
    this.adapter.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist.allTherapists, MassageTherapist)
    .then(() => { MassageTherapist.prototype.renderTherapistDetails() })
  }   

  renderLi(){
    const apptsContainer = document.querySelector('#appointments-container');
    apptsContainer.innerHTML = Appointment.allAppointments.map(appt => `<li id="appointment-${appt.id}">Appointment ${appt.id}</li>`).join("")
  }

}