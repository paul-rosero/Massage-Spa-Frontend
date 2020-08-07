class Forms {
    constructor(){
        this.renderApptForm();
        this.renderTherapistForm();
        this.renderClientForm();
    }

    static renderTherapistForm(){
        
        const therapistContainer = document.getElementById("new-therapist-form-container");
        const therapistForm = document.createElement("form");
        therapistForm.setAttribute("id", "massage-therapist-form");
        therapistForm.setAttribute("method", "post")
        therapistForm.innerHTML = `
            <form id="massage-therapist-form" method="Post">
                <h3>Fill to Add New Massage Therapist.</h3><br>
                <label for="name">Name:</label>
                <input id="therapist-name-input" type="text" name="name" value="">

                <label for="sex">Gender:</label>
                <input id="therapist-sex-input" type="text" name="sex" value="">
            </form>
        `
        therapistContainer.appendChild(therapistForm)
    }

    renderClientForm(){

    }

    static renderApptForm(){
        console.log("hi")
        const appointmentForm = document.getElementById("new-appt-form-container");
        appointmentForm.innerHTML = `
            <form id="appointment-form"  method="Post">  
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
        this.clientNameInput = document.querySelector('#client-name-input');
        this.therapistNameInput = document.querySelector('#therapist-name-input');
        
        ApiAdapter.fetchSelect("massage_therapists", this.therapistNameInput);
        ApiAdapter.fetchSelect("clients", this.clientNameInput);
    }
}