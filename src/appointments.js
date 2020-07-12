class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = []
    this.adapter = new ApiAdapter()
    this.getAllAppointments()
    // this.client = new Client()
    // this.appointment = new Appointment()
    // this.therapist = new MassageTherapist()
    // this.bindVariables()
    // this.addEventListeners()
  }

  getAllAppointments() {
    this.adapter.fetchApi("appointments", { method: 'GET' }, Appointment, apptsList);
  }

  static findAppointment(id) {
    return Appointments.find((appointment) => appointment.id === id)
  }

  renderSpan(){
      return `<span data-id="${this.id}">Appointment ${this.id}</span><br><br>`
  }

}