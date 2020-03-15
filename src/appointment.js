class Appointment {
    constructor(apptDataObj) {
        this.id = apptDataObj.id
        this.massage_therapist = apptDataObj.massage_therapist
        this.client = apptDataObj.client
        this.modality = apptDataObj.modality
        this.appointment_time = apptDataObj.appointment_time
        this.special_request = apptDataObj.special_request
        Appointment.allAppointments.push(this)
    }
    static findAppointment(id) {
        return this.allAppointments.find((appointment) => appointment.id === id)
    }

    static updateAppointment(updatedApptData) {
        const apptToUpdate = this.findAppointment(updatedApptData.id)
        apptToUpdate.massage_therapist = updatedApptData.massage_therapist
        apptToUpdate.client = updatedApptData.client
        apptToUpdate.modality = updatedApptData.modality
        apptToUpdate.appointment_time = updatedApptData.appointment_time
        apptToUpdate.special_request = updatedApptData.special_request
        return apptToUpdate
    }p
    
    renderSpan(){
        return `<span data-id="${this.id}">Appointment ${this.id}</span><br><br>`
    }

    renderDetails(){
        return `<br><h4>View or Edit the Appointment.</h4>
                <p>Appointment: ${this.id}
                    <button data-id=${this.id}>Edit Appointment</button>
                </p>
                <p>Massage Therapist: ${this.massage_therapist.name}</p>
                <p>Client: ${this.client.name}</p>
                <p>Modality: ${this.modality}</p>
                <p>Appointment Time: ${this.appointment_time}</p>
                <p>Special Requests: ${this.special_request}</p>`
    }
}

Appointment.allAppointments = []