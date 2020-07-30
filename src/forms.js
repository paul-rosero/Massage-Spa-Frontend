class Forms {
    constructor(){
        this.renderAppForm();
        this.renderTherapistForm();
        this.renderClientForm();
    }

    renderTherapistForm(){

    }

    renderClientForm(){

    }

    renderAppForm(){
        const appointmentForm = document.getElementById("new-forms-container")
        appointmentForm.innerHTML = `
            <form id="appointment-form" action="index.html" method="post">
                <br/><h3>Appointment Form</h3>
                <label for="name">Client Name:</label>
                <select id="client-name-input" type="text" name="name" form="appointment-form" value=""><select><br/>
    
                <label for="name">Massage Therapist Name:</label>
                <select id="therapist-name-input" type="text" name="name" form="appointment-form" value=""></select><br/>
    
                <label for="modality">Modality:</label>
                <input id="modality-input" type="text" name="modality" value=""/><br/>
    
                <label for="time">Appointment Time:</label>
                <input id="appointment-time-input" type="text" name="time" value=""/><br/>
    
                <label for="request">Special Requests:</label>
                <input id="special-request-input" type="text" name="request" value=""/><br/>
    
                <button id="create-button" name="create-button">Create Appointment</button>
                <input type="button" id="edit-button" name="edit-button" value="Edit Appointment"/>
            </form>
        `  
    }
}