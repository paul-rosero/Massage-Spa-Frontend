class Appointment {
    constructor(apptDataObj) {
        this.id = apptDataObj.id
        this.massageTherapist = apptDataObj.massage_therapist
        this.client = apptDataObj.client
        this.modality = apptDataObj.modality
        this.dateAndTime = apptDataObj.date_and_time
        this.specialRequest = apptDataObj.special_request
        
    }

    clickToRenderApptForm(){
        Forms.renderApptForm();
        this.clickToCreateAppt();
    }

    clickToCreateAppt(){
        const apptForm = document.querySelector('#appointment-form');
        this.clientNameInput = document.getElementById('client-name-input');
        this.therapistNameInput = document.getElementById('therapist-name-input');
        ApiAdapter.fetchSelect("massage_therapists", this.therapistNameInput);
        ApiAdapter.fetchSelect("clients", this.clientNameInput);
        this.modalityInput = document.querySelector('#modality-input');
        this.apptTimeInput = document.querySelector('#appointment-time-input');
        this.specialRequestInput = document.querySelector('#special-request-input');
        apptForm.addEventListener('submit', (e) => {
          e.preventDefault();
          ApiAdapter.fetchCreateClassObject("appointments", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                client_id: e.target[0].selectedOptions[0].id,
                massage_therapist_id: e.target[1].selectedOptions[0].id,
                modality: e.target[2].value,
                date_and_time: e.target[3].value,
                special_request: e.target[4].value
            })
          }, Appointment.allAppointments, Appointment)
          .then(() => {
            this.clientNameInput.value = "";
            this.therapistNameInput.value = "";
            this.modalityInput.value = "";
            this.apptTimeInput.value = "";
            this.specialRequestInput.value = "";
            Appointments.prototype.renderLi()
          })
        })
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

    editDateAndTimeInput(input) {
        const dateArray = input.split("T")[0]
        const timeArray = input.split("T")[1].split(":")
        const poppedtime = timeArray.pop()
        const newDateAndTime = dateArray + " " + timeArray.join(":")
        return newDateAndTime
    }

    copyToEditAppt(){
        const apptInfoContainer = document.querySelector('#appointment-info-container');
        apptInfoContainer.addEventListener('click', (e) => {
            if (e.target.className === 'appointment-edit') {
                Forms.renderApptForm();
                const clientNameInput = document.getElementById('client-name-input');
                const therapistNameInput = document.getElementById('therapist-name-input');
                ApiAdapter.fetchSelect("massage_therapists", therapistNameInput);
                ApiAdapter.fetchSelect("clients", clientNameInput);
                const modalityInput = document.querySelector('#modality-input');
                const apptTimeInput = document.querySelector('#appointment-time-input');
                const specialRequestInput = document.querySelector('#special-request-input');
                const apptForm = document.querySelector('#appointment-form');
                const editApptButton = document.querySelector('#edit-button');
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = this.findAppointment(clickedAppt);
                
                clientNameInput.value = foundAppt.client.name
                therapistNameInput.value = foundAppt.massageTherapist.name
                modalityInput.value = foundAppt.modality
                apptTimeInput.value = this.editDateAndTimeInput(foundAppt.dateAndTime)
                specialRequestInput.value = foundAppt.specialRequest
                apptForm.id = foundAppt.id
                
                editApptButton.addEventListener('click', (e) => {
                    e.preventDefault()
                    const updateApptId = e.path[1].id
                    ApiAdapter.updateOrDeleteClassObject(`appointments/${updateApptId}`, {
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
                        const newApptContainer = document.getElementById("new-appt-form-container")
                        newApptContainer.innerHTML = ""
                    })
                })    
            }
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

                ApiAdapter.updateOrDeleteClassObject(`appointments/${clickedAppt}`, { method: 'DELETE' })
                .then((appt) => {
                    this.apptDeleted = document.getElementById(`appointment-${appt.appointmentId}`);
                    this.apptDeleted.remove();
                   
                    this.apptInfoListDeleted = document.getElementById(`appt-${appt.appointmentId}`);
                    this.apptInfoListDeleted.remove();
                })
            }
        })
    }

    renderDetails(){
        return `
            <div id="appt-${this.id}">
                <br><h4>View or Edit the Appointment.</h4>
                <p>Appointment: ${this.id}
                    <button class="appointment-edit" id=${this.id} type="button">Edit</button>
                    <button class="appointment-delete" id=${this.id} type="button">Delete Appointment</button>
                </p>
                <p>Massage Therapist: ${MassageTherapist.prototype.capitalize(this.massageTherapist.name)}</p>
                <p>Client: ${MassageTherapist.prototype.capitalize(this.client.name)}</p>
                <p>Modality: ${this.modality}</p>
                <p>Date & Time: ${this.editDateAndTimeInput(this.dateAndTime)}</p>
                <p>Special Requests: ${this.specialRequest}</p>
            </div>    
        `
    }
}

Appointment.allAppointments = []