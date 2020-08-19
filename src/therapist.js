class MassageTherapist {
    constructor(therapistDataObj) {
        console.log("therapist is loaded")
        this.id = therapistDataObj.id
        this.name = therapistDataObj.name
        this.sex = therapistDataObj.sex
        this.rating = therapistDataObj.rating
        this.bindVariables();
        this.renderTherapistDetails();
        
    }

    bindVariables(){
        this.therapistsList = document.querySelector('#all-therapists-list');
    
    }

    renderNewTherapistForm(){
        const newTherapistButton = document.getElementById("therapist");
        newTherapistButton.addEventListener('click', (e) => {
            e.preventDefault();
            Forms.renderTherapistForm();
            const newTherapistForm = document.getElementById("massage-therapist-form")
            newTherapistForm.addEventListener('submit', this.createNewTherapist.bind(this))
          })
    }

    createNewTherapist(e){
            console.log(e)
            const NameInput = document.getElementById('therapist-name-input');
            const SexInput = document.getElementById('therapist-sex-input');

            e.preventDefault();
            ApiAdapter.fetchCreateClassObject("massage_therapists", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    therapist: {
                        name: e.target[0].value,
                        sex: e.target[1].value,
                        rating: e.target[2].value
                    }
                })
            }, MassageTherapist.allTherapists, MassageTherapist)
            .then(() => {
                NameInput.value = "";
                SexInput.value = "";
                this.renderTherapistDetails();
            })
    }
    
    sortTherapistName(e){
        e.preventDefault()
        this.therapistsList = document.querySelector('#all-therapists-list');
        ApiAdapter.fetchSortButton("massage_therapists", { method: 'GET' }, this.therapistsList);
    }
    // capitalize = (fullName) => {
    //     if (typeof name !== 'string') return ''
    //     return fullName.split(' ').map(name => name[0].toUpperCase() + name.slice(1).toLowerCase()).join(' ')
    // }

    // static findTherapist(id) {
    //     return this.allTherapists.find((therapist) => therapist.id === id)
    // }
    
    // static updateTherapist(updatedTherapistData) {
    //     const therapistToUpdate = this.findTherapist(updatedTherapistData.id)
    //     therapistToUpdate.massage_therapist = updatedTherapistData.massage_therapist
    //     therapistToUpdate.client = updatedTherapistData.client
    //     therapistToUpdate.modality = updatedTherapistData.modality
    //     therapistToUpdate.appointment_time = updatedTherapistData.appointment_time
    //     therapistToUpdate.special_request = updatedTherapistData.special_request
    //     return therapistToUpdate
    // }

    renderTherapistDetails(){
        this.therapistsList = document.querySelector('#all-therapists-list');
        this.therapistsList.innerHTML = MassageTherapist.allTherapists.map(therapist => 
            `<li id="therapist-${therapist.id}">
                <button class="therapist-edit" id=${therapist.id} type="button">Edit</button>
                <button class="therapist-delete" id=${therapist.id} type="button">Delete Therapist</button>
                <p>Name: ${therapist.name}</p>
                <p>Gender: ${therapist.sex}</p>
                <p>Rating: ${therapist.rating}</p>
            </li>`
        ).join("")  
        
    }
} 

MassageTherapist.allTherapists = []