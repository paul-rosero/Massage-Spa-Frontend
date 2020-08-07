class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = [];
    this.adapter = new ApiAdapter();
    // this.forms = new Forms();
    this.bindVariables();
    this.allContentLoaded();
    this.addEventListeners();
  }

  bindVariables(){
    // this.apptInfoList = document.querySelector('#appointment-info-list');
    this.clientNameInput = document.querySelector('#client-name-input');
    this.therapistNameInput = document.querySelector('#therapist-name-input');
    this.modalityInput = document.querySelector('#modality-input');
    this.apptTimeInput = document.querySelector('#appointment-time-input');
    this.specialRequestInput = document.querySelector('#special-request-input');
    this.apptForm = document.querySelector('#appointment-form');
    this.sortButton = document.getElementById('sort-button');
    this.newTherapistButton = document.getElementById("therapist")
    this.clickApptForm = document.getElementById("appointment");
  }

  addEventListeners(){
        this.clickApptForm.addEventListener("click", appt => { 
          Appointment.clickToRenderApptForm(appt) 
          
          // this.apptForm.addEventListener('submit', this.clickToCreateAppt())
        })
        
    Appointment.deleteAppointment();
    Appointment.clickToShowAppt();
    this.sortButton.addEventListener('click', (e) => { MassageTherapist.sortTherapistName(e) })
    this.newTherapistButton.addEventListener('click', (therapist) => { MassageTherapist.createNewTherapist(therapist) })
  }

  clickToCreateAppt(){
    this.apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.adapter.fetchCreateAppointment("appointments", {
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
        Appointments.renderLi()
      })
    })
  }

  allContentLoaded() {
    
    this.adapter.fetchApi("appointments", { method: 'GET' }, this.appointments, Appointment).then(() => { Appointments.renderLi() });
    
    this.adapter.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist.allTherapists, MassageTherapist).then(() => {  
      const therapistsList = document.querySelector('#all-therapists-list');
      therapistsList.innerHTML = MassageTherapist.allTherapists.map(therapist => 
          therapist.renderTherapistDetails()
      ).join("") 
    });
    
    // this.adapter.fetchSelect("massage_therapists", this.therapistNameInput);
    // this.adapter.fetchSelect("clients", this.clientNameInput);
  }  

  static findAppointment(id) {
    return Appointments.find((appointment) => appointment.id === id)
  }

  static renderLi(){
    this.apptsContainer = document.querySelector('#appointments-container');
    this.apptsContainer.innerHTML = Appointment.allAppointments.map(appt => `<li id="${appt.id}">Appointment ${appt.id}</li>`).join("")
  }

}