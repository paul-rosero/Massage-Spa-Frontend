class Client {
    constructor(clientDataObj) {
        console.log("client is loaded")
        this.id = clientDataObj.id
        this.name = clientDataObj.name
        this.address = clientDataObj.address
        this.email = clientDataObj.email
        this.medical_history = clientDataObj.medical_history
    }

//     static findClient(id) {
//         return this.allClients.find((client) => client.id === id)
//     }

//     static updateClient(updatedClientData) {
//         const clientToUpdate = this.findClient(updatedClientData.id)
//         clientToUpdate.massage_therapist = updatedClientData.massage_therapist
//         clientToUpdate.client = updatedClientData.client
//         clientToUpdate.modality = updatedClientData.modality
//         clientToUpdate.appointment_time = updatedClientData.appointment_time
//         clientToUpdate.special_request = updatedClientData.special_request
//         return clientToUpdate
//     }
    
    renderDetails() {
        return `<br><h4>Client Info.</h4>
                <p>Client: ${this.id}</p>
                <p>Name: ${this.name}</p>
                <p>Medical History: ${this.medical_history}</p>
                <p>Address: ${this.address}</p>
                <p>Email: ${this.email}</p>`
    }
}

Client.allClients = []