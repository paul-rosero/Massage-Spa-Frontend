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

    renderTherapistDetails(){
        return `
            <li id="${this.id}">
                <p>Name: ${this.name}</p>
                <p>Sex: ${this.sex}</p>
                <p>Rating: ${this.rating}</p>
            </li>
        `
    }
} 

MassageTherapist.allTherapists = []