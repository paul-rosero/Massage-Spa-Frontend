class MassageTherapist {
    constructor(therapistDataObj) {
        console.log("therapist is loaded")
        this.id = therapistDataObj.id
        this.name = therapistDataObj.name
        this.sex = therapistDataObj.sex
        this.rating = therapistDataObj.rating
        this.bindVariables();
    }

    bindVariables(){
    }

    static createNewTherapist(e){
        const newTherapistForm = document.getElementById("massage-therapist-form")
        console.log('this.allTherapists', this.allTherapists)
        newTherapistForm.addEventListener('submit', (e) => {
            ApiAdapter.fetchCreateClassObject("massage_therapists", {}, this.allTherapists, MassageTherapist)
        })
        console.log('newTherapistForm', newTherapistForm)
        console.log("therapist", e)
        console.log("therapist", e.target)
    }
    
    static sortTherapistName(e){
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

    static renderTherapistDetails(){
        const therapistsList = document.querySelector('#all-therapists-list');
        therapistsList.innerHTML = MassageTherapist.allTherapists.map(therapist => 
            `<li id="${therapist.id}">
                <p>Name: ${therapist.name}</p>
                <p>Gender: ${therapist.sex}</p>
                <p>Rating: ${therapist.rating}</p>
            </li>`
        ).join("")  
        
    }
} 

MassageTherapist.allTherapists = []