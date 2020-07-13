class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = []
    this.adapter = new ApiAdapter()
    this.getAllAppointments()
    // this.client = new Client()
    // this.appointment = new Appointment()
    // this.therapist = new MassageTherapist()
    this.bindVariables()
    // this.addEventListeners()
  }

  bindVariables(){
    this.apptsList = document.querySelector('#appointments-list');
  }

  getAllAppointments() {
    this.adapter.fetchApi("appointments", { method: 'GET' })
    .then(appointments => { 
      appointments.forEach(appt => {
        this.appointments.push(new Appointment(appt))
      })
    })
    .then(() => { this.renderLi() })
  }

  static findAppointment(id) {
    return Appointments.find((appointment) => appointment.id === id)
  }

  renderLi(){
      return `<span data-id="${this.id}">Appointment ${this.id}</span><br><br>`
  }

}