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
        this.name = clientDataObj.name
        this.address = clientDataObj.address
        this.email = clientDataObj.email
        this.medical_history = clientDataObj.medical_history
        Client.allClients.push(this)
    }
}

Client.allClients = []