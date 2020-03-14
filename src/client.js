class Client {
    static findClient(id) {
        return this.allClients.find((client) => client.id === id)
    }

    static updateClient(updatedClientData) {
        const clientToUpdate = this.findClient(updatedClientData.id)
        clientToUpdate.massage_therapist = updatedClientData.massage_therapist
        clientToUpdate.client = updatedClientData.client
        clientToUpdate.modality = updatedClientData.modality
        clientToUpdate.appointment_time = updatedClientData.appointment_time
        clientToUpdate.special_request = updatedClientData.special_request
        return clientToUpdate
    }

    constructor(clientDataObj) {
        this.id = clientDataObj.id
        this.massage_therapist = clientDataObj.massage_therapist
        this.client = clientDataObj.client
        this.modality = clientDataObj.modality
        this.appointment_time = clientDataObj.appointment_time
        this.special_request = clientDataObj.special_request
        Appointment.allClients.push(this)
    }
}

Client.allClients = []