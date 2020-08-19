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
    
    findAppointment(id) {
        return Appointment.allAppointments.find((appointment) => appointment.id === id)
    }

    clickToShowAppt(){
        const apptsContainer = document.querySelector('#appointments-container');
        const apptInfoContainer = document.querySelector('#appointment-info-container');
        apptsContainer.addEventListener('click', (e) => {
            const clickedAppt = parseInt(e.path[0].id.split("-")[1]);
            const foundAppt = this.findAppointment(clickedAppt);
            apptInfoContainer.innerHTML = foundAppt.renderDetails();
            this.copyToEditAppt();
        })
    }

    copyToEditAppt(){
        const apptInfoContainer = document.querySelector('#appointment-info-container');
        
        apptInfoContainer.addEventListener('click', (e) => {
            Forms.renderApptForm();
            const clientNameInput = document.getElementById('client-name-input');
            const therapistNameInput = document.getElementById('therapist-name-input');
            const modalityInput = document.querySelector('#modality-input');
            const apptTimeInput = document.querySelector('#appointment-time-input');
            const specialRequestInput = document.querySelector('#special-request-input');
            const apptForm = document.querySelector('#appointment-form');
            const editApptButton = document.querySelector('#edit-button');

            if (e.target.className === 'appointment-edit') {
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = this.findAppointment(clickedAppt);
                clientNameInput.value = foundAppt.client.name
                therapistNameInput.value = foundAppt.massageTherapist.name
                modalityInput.value = foundAppt.modality
                apptTimeInput.value = foundAppt.dateAndTime
                specialRequestInput.value = foundAppt.specialRequest
                apptForm.id = foundAppt.id
            }
            
            editApptButton.addEventListener('click', (e) => {
                e.preventDefault()
                const updateApptId = e.path[1].id
                ApiAdapter.fetchUpdate(`appointments/${updateApptId}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({        
                        massage_therapist_id: therapistNameInput[therapistNameInput.selectedIndex].id,
                        client_id: clientNameInput[clientNameInput.selectedIndex].id,
                        date_and_time: apptTimeInput.value,
                        modality: modalityInput.value,
                        special_request: specialRequestInput.value
                    })
                })
                .then((updatedApptJSON) => {
                    const updatedAppt = this.updateAppointment(updatedApptJSON)
                    apptInfoContainer.innerHTML = updatedAppt.renderDetails()
                })
                .then(() =>{ 
                    clientNameInput.value = ""
                    therapistNameInput.value = ""
                    modalityInput.value = ""
                    apptTimeInput.value = ""
                    specialRequestInput.value = ""
                })
            })    
        })
    }

    updateAppointment(updatedApptData) {
        const apptToUpdate = this.findAppointment(updatedApptData.id)
        apptToUpdate.massageTherapist = updatedApptData.massage_therapist
        apptToUpdate.client = updatedApptData.client
        apptToUpdate.modality = updatedApptData.modality
        apptToUpdate.dateAndTime = updatedApptData.date_and_time
        apptToUpdate.specialRequest = updatedApptData.special_request
        return apptToUpdate
    }

    deleteAppointment(){
        const apptInfoContainer = document.querySelector('#appointment-info-container');
        apptInfoContainer.addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.className === 'appointment-delete') {
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = this.findAppointment(clickedAppt);

                ApiAdapter.fetchDeleteClassObject(`appointments/${clickedAppt}`, { method: 'DELETE' })
                .then((appt) => {
                    console.log(appt)
                    this.apptDeleted = document.getElementById(`appointment-${appt.appointmentId}`);
                    console.log('apptDeleted', this.apptDeleted)
                    this.apptDeleted.remove();
                   
                    this.apptInfoListDeleted = document.getElementById(`appt-${appt.appointmentId}`);
                    this.apptInfoListDeleted.remove();
                })
            }
        })
    }

    clickToRenderApptForm(appt){
        appt.preventDefault()
        Forms.renderApptForm()
    }

    renderDetails(){
        return `
            <div id="appt-${this.id}">
                <br><h4>View or Edit the Appointment.</h4>
                <p>Appointment: ${this.id}
                    <button class="appointment-edit" id=${this.id} type="button">Edit</button>
                    <button class="appointment-delete" id=${this.id} type="button">Delete Appointment</button>
                </p>
                <p>Massage Therapist: ${this.massageTherapist.name}</p>
                <p>Client: ${this.client.name}</p>
                <p>Modality: ${this.modality}</p>
                <p>Appointment Date & Time: ${this.dateAndTime}</p>
                <p>Special Requests: ${this.specialRequest}</p>
            </div>    
        `
    }
}

Appointment.allAppointments = []