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
        const clientNameInput = document.querySelector('#client-name-input');
        const therapistNameInput = document.querySelector('#therapist-name-input');
        const modalityInput = document.querySelector('#modality-input');
        const apptTimeInput = document.querySelector('#appointment-time-input');
        const specialRequestInput = document.querySelector('#special-request-input');
        const apptForm = document.querySelector('#appointment-form');
        const editApptButton = document.querySelector('#edit-button');

        apptInfoList.addEventListener('click', (e) => {
            if (e.target.className === 'edit') {
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = Appointment.findAppointment(clickedAppt);
            
                clientNameInput.value = foundAppt.client.name
                therapistNameInput.value = foundAppt.massageTherapist.name
                modalityInput.value = foundAppt.modality
                apptTimeInput.value = foundAppt.dateAndTime
                specialRequestInput.value = foundAppt.specialRequest
                apptForm.id = foundAppt.id
            }
        })

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
            }, Appointment, apptInfoList)
            .then(() =>{ 
                clientNameInput.value = ""
                therapistNameInput.value = ""
                modalityInput.value = ""
                apptTimeInput.value = ""
                specialRequestInput.value = ""
            })
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

    static deleteAppointment(){
        const apptInfoList = document.querySelector('#appointment-info-list');
        apptInfoList.addEventListener('click', (e) => {
            if (e.target.className === 'delete') {
                const clickedAppt = parseInt(e.target.id);
                const foundAppt = Appointment.findAppointment(clickedAppt);

                ApiAdapter.fetchDeleteClassObject(`appointments/${foundAppt}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                    
                })
            }
        })

        
    }

    renderDetails(){
        return `
            <br><h4>View or Edit the Appointment.</h4>
            <p>Appointment: ${this.id}
                <button class="edit" id=${this.id} type="button">Edit Appointment</button>
                <button class="delete" id=${this.id} type="button">Delete Appointment</button>
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