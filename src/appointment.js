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
        return `<span-data id="${this.id}">${this.name}</span>`
    }

    renderDetails(){
        return `<h4>Appointment: ${this.id}
                    <button data-id=${this.id}>Edit Appointment</button>
                </h4><br>
                <p>Massage Therapist: ${this.massage_therapist.name}</p><br>
                <p>Client: ${this.client.name}</p><br>
                <p>Modality: ${this.modality}</p><br>
                <p>Appointment Time: ${this.appointment_time}</p><br>
                <p>Special Requests: ${this.special_request}</p><br>`
    }
}

Appointment.allAppointments = []