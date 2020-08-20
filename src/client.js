class Client {
    constructor(clientDataObj) {
        console.log("client is loaded")
        this.id = clientDataObj.id
        this.name = clientDataObj.name
        this.address = clientDataObj.address
        this.email = clientDataObj.email
        this.medical_history = clientDataObj.medical_history
        this.renderNewClientForm()
    }

    findClient(id) {
        return Client.allClients.find((client) => client.id === id)
    }

    renderNewClientForm(){
        Forms.renderClientForm()
        console.log("object")
    }
    
    renderDetails() {
        return `
            <br><h4>Client Info.</h4>
            <p>Client: ${this.id}</p>
            <p>Name: ${this.name}</p>
            <p>Medical History: ${this.medical_history}</p>
            <p>Address: ${this.address}</p>
            <p>Email: ${this.email}</p>
        `
    }
}

Client.allClients = []