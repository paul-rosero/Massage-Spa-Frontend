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

    static clickToShowAppt(){
        const apptsContainer = document.querySelector('#appointments-container');
        const apptInfoList = document.querySelector('#appointment-info-list');
        apptsContainer.addEventListener('click', (e) => {
        const clickedAppt = parseInt(e.path[0].id)
        const foundAppt = Appointment.findAppointment(clickedAppt)
        apptInfoList.innerHTML = foundAppt.renderDetails()
    })
    }

    static copyToEditAppt(){
        const apptInfoList = document.querySelector('#appointment-info-list');
        this.clientNameInput = document.querySelector('#client-name-input');
        this.therapistNameInput = document.querySelector('#therapist-name-input');
        this.modalityInput = document.querySelector('#modality-input');
        this.apptTimeInput = document.querySelector('#appointment-time-input');
        this.specialRequestInput = document.querySelector('#special-request-input');
        this.apptForm = document.querySelector('#appointment-form');
        apptInfoList.addEventListener('click', (e) => {
            if (e.target.className === 'edit' ) {
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = Appointment.findAppointment(clickedAppt);
            
                this.clientNameInput.value = foundAppt.client.name
                this.therapistNameInput.value = foundAppt.massageTherapist.name
                this.modalityInput.value = foundAppt.modality
                this.apptTimeInput.value = foundAppt.dateAndTime
                this.specialRequestInput.value = foundAppt.specialRequest
                this.apptForm.id = foundAppt.id
            }
        })
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
                <input  class="delete" id=${this.id} type="button" onclick="alert('Hello World!')" value="Delete Appointment">
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