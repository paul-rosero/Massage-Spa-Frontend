class MassageTherapist {
    constructor(therapistDataObj) {
        console.log("therapist is loaded")
        this.id = therapistDataObj.id
        this.name = therapistDataObj.name
        this.sex = therapistDataObj.sex
        this.rating = therapistDataObj.rating
        this.bindVariables()
    }

    bindVariables(){
        
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
    
    static renderDetails() {
        this.therapistsList = document.querySelector('#all-therapists-list');
        this.therapistsList.innerHTML = this.allTherapists.map(therapist => 
            `<li id="${therapist.id}">
                <p>Name: ${therapist.name}</p>
                <p>Sex: ${therapist.sex}</p>
                <p>Rating: ${therapist.rating}</p>
            </li>`
        ).join("")
    }
} 

MassageTherapist.allTherapists = []