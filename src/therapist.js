class MassageTherapist {
    static findTherapist(id) {
        return this.allTherapists.find((therapist) => therapist.id === id)
    }
    
    static updateTherapist(updatedTherapistData) {
        const therapistToUpdate = this.findTherapist(updatedTherapistData.id)
        therapistToUpdate.massage_therapist = updatedTherapistData.massage_therapist
        therapistToUpdate.client = updatedTherapistData.client
        therapistToUpdate.modality = updatedTherapistData.modality
        therapistToUpdate.appointment_time = updatedTherapistData.appointment_time
        therapistToUpdate.special_request = updatedTherapistData.special_request
        return therapistToUpdate
    }
    
    constructor(therapistDataObj) {
        this.id = therapistDataObj.id
        this.name = therapistDataObj.name
        this.sex = therapistDataObj.sex
        this.rating = therapistDataObj.rating
        MassageTherapist.allTherapists.push(this)
    }

    renderSpan() {
        return `<h3>Massage Therapist ${this.id}</h3>
                <span data-id="${this.id}">Name: ${this.name}</span><br>
                <span data-id="${this.id}">Sex: ${this.sex}</span><br>
                <span data-id="${this.id}">Rating: ${this.rating}</span><br>`
    }
       
} 

MassageTherapist.allTherapists = []