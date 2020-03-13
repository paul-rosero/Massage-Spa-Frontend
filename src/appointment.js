class Appointment {
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
    }

    constructor(apptDataObj) {
        this.id = apptDataObj.id
        this.massage_therapist = apptDataObj.massage_therapist
        this.client = apptDataObj.client
        this.modality = apptDataObj.modality
        this.appointment_time = apptDataObj.appointment_time
        this.special_request = apptDataObj.special_request
        Appointment.allAppointments.push(this)
    }
}

Appointment.allAppointments = []