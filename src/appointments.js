class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = []
    this.adapter = new ApiAdapter()
    this.allContentLoaded()
    // this.client = new Client()
    // this.therapist = new MassageTherapist()
    this.bindVariables()
    this.addEventListeners()
  }

  bindVariables(){
    this.apptsContainer = document.querySelector('#appointments-container');
    this.apptInfoList = document.querySelector('#appointment-info-list');
  }

  addEventListeners(){
    this.apptsContainer.addEventListener('click', (e) => {
      const clickedAppt = parseInt(e.path[0].id)
      const foundAppt = Appointment.findAppointment(clickedAppt)
      this.apptInfoList.innerHTML = foundAppt.renderDetails()
    })
  }

  allContentLoaded() {
    this.adapter.fetchApi("appointments", { method: 'GET' }, this.appointments, Appointment)
    .then(() => { this.renderLi() });
    
    this.adapter.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist.allTherapists, MassageTherapist)
    .then(() => { MassageTherapist.renderDetails() });
  }

  updateAppointment(){
    this.clientNameInput = document.querySelector('#client-name-input');
    this.therapistNameInput = document.querySelector('#therapist-name-input');
    
    this.adapter.fetchSelect("massage_therapists", this.therapistNameInput);
    this.adapter.fetchSelect("clients", this.clientNameInput);
  }

  static findAppointment(id) {
    return Appointments.find((appointment) => appointment.id === id)
  }

  renderLi(){
    this.apptsContainer.innerHTML = this.appointments.map(appt => `<li id="${appt.id}">Appointment ${appt.id}</li>`).join("")
  }

}