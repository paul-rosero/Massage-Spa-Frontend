class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.appointments = []
  }

  static findAppointment(id) {
    return Appointments.find((appointment) => appointment.id === id)
  }

  renderSpan(){
      return `<span data-id="${this.id}">Appointment ${this.id}</span><br><br>`
  }

}