class Appointment {
    constructor(apptDataObj) {
        console.log('appointment is loaded ')
        this.id = apptDataObj.id
        this.massageTherapist = apptDataObj.massage_therapist
        this.client = apptDataObj.client
        this.modality = apptDataObj.modality
        this.dateAndTime = apptDataObj.date_and_time
        this.specialRequest = apptDataObj.special_request
        Appointment.allAppointments.push(this)
    }
    
    static findAppointment(id) {
        return this.allAppointments.find((appointment) => appointment.id === id)
    }

    static updateAppointment(updatedApptData) {
        const apptToUpdate = this.findAppointment(updatedApptData.id)
        apptToUpdate.massageTherapist = updatedApptData.massage_therapist
        apptToUpdate.client = updatedApptData.client
        apptToUpdate.modality = updatedApptData.modality
        apptToUpdate.dateAndTime = updatedApptData.date_and_time
        console.log('apptToUpdate.dateAndTime', apptToUpdate.dateAndTime)
        apptToUpdate.specialRequest = updatedApptData.special_request
        return apptToUpdate
    }
    
    

    renderDetails(){
        return `
            <br><h4>View or Edit the Appointment.</h4>
            <p>Appointment: ${this.id}
                <button class="edit" id=${this.id} action="edit">Edit Appointment</button>
            </p>
            <p>Massage Therapist: ${this.massageTherapist.name}</p>
            <p>Client: ${this.client.name}</p>
            <p>Modality: ${this.modality}</p>
            <p>Appointment Date & Time: ${this.dateAndTime}</p>
            <p>Special Requests: ${this.specialRequest}</p>
        `
    }
}

Appointment.allAppointments = []