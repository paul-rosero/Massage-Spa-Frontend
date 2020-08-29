class Forms {
    constructor(){
        this.renderApptForm();
        this.renderTherapistForm();
        this.renderClientForm();
    }

    static renderTherapistForm(){
        const therapistContainer = document.getElementById("new-therapist-form-container");
        therapistContainer.innerHTML = `
            <form id="massage-therapist-form" method="POST">
                <h3>Fill to Add New Massage Therapist.</h3><br>
                <label for="name">Name:</label>
                <input id="therapist-name-input" type="text" name="name" value="">

                <label for="sex">Gender:</label>
                <select id="therapist-sex-input" type="text" name="sex" value="">
                    <option value=""></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>

                <label for="rating">Rating:</label>
                <input id="therapist-rating-input" type="text" name="rating" value="0">

                <button id="create-therapist" name="create-therapist">Add Therapist</button>
                <button id="edit-therapist" name="edit-therapist">Edit Therapist</button>
            </form>
        `
    }

    static renderClientForm(){
        const clientContainer = document.getElementById("new-client-form-container");
        clientContainer.innerHTML = `
            <form id="client-form" method="POST">
                <h3>Create New Client</h3>

                <label for="name">Name: </label>
                <input id="client-name" type="text" name="name" value="">

                <label for="medical_history">Medical History: </label>
                <input id="medical_history" type="text" name="medical_history" value="">

                <label for="address">Address: </label>
                <input id="address" type="text" name="address" value="">

                <label for="email">Email: </label>
                <input id="email" type="text" name="email" value="">
                
                <button id="create-client" name="create-client">Create Client</button>
                <button id="edit-client" name="edit-client">Edit Client</button>
            </form>
        `
    }

    static renderApptForm(){
        const appointmentForm = document.getElementById("new-appt-form-container");
        appointmentForm.innerHTML = `
            <form id="appointment-form" method="POST">  
                <br/><h3>Appointment Form</h3>
                <label for="name">Client Name:</label>
                <select id="client-name-input" type="text" name="name" form="appointment-form" value=""><select><br/>
    
                <label for="name">Massage Therapist Name:</label>
                <select id="therapist-name-input" type="text" name="name" form="appointment-form" value=""></select><br/>
    
                <label for="modality">Modality:</label>
                <select id="modality-input" type="text" name="modality" value="">
                    <option value=""></option>
                    <option value="Swedish">Swedish</option>
                    <option value="Deep Tissue">Deep Tissue</option>
                    <option value="Hot Stones">Hot Stones</option>
                    <option value="Sports Massage">Sports Massage</option>
                    <option value="Medical Massage">Medical Massage</option>
                </select><br/>
    
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