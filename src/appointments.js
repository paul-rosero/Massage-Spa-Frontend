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
    this.clickClientForm = document.getElementById("client")
    this.sortButton = document.getElementById('sort-button');
    this.deleteTherapistList = document.getElementById("all-therapists-list")

  }

  addEventListeners(){ 
    this.clickApptForm.addEventListener("click", appt => { 
      Appointment.prototype.clickToRenderApptForm(appt); 
    })
    this.clickClientForm.addEventListener("click", () => { Client.prototype.renderNewClientForm() });

    Appointment.prototype.clickToShowAppt();
    MassageTherapist.prototype.renderNewTherapistForm();
    
    this.sortButton.addEventListener('click', (e) => { MassageTherapist.prototype.sortTherapistName(e) })
    
    this.deleteTherapistList.addEventListener('click', (therapist) => {
      MassageTherapist.prototype.deleteTherapist(therapist)
      MassageTherapist.prototype.clickToEditTherapist(therapist)
    })
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