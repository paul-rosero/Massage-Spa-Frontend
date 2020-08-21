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
        this.createNewClient()
    }

    createNewClient(){
        const createNewClientForm = document.getElementById("client-form")
        const clientNameInput = document.getElementById("client-name");
        const clientMedicalHistory = document.getElementById("medical_history");
        const clientAddress = document.getElementById("address");
        const clientEmail = document.getElementById("email");

        createNewClientForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(e)
            // ApiAdapter.fetchCreateClassObject("clients", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(
            //         // clientNameInput: ,
            //         // clientMedicalHistory: ,
            //         // clientAddress: ,
            //         // clientEmail: 
            //     )
            // }, Client.allClients, Client)
            console.log("object")
        })
    }
    
    renderDetails() {
        return `
            <br><h4>Client Info.</h4>
            <button class="client-edit" id="client-edit-${this.id}">Edit Client</button>
            <button class="client-delete" id="client-delete-${this.id}">Delete Client</button>
            <p>Client: ${this.id}</p>
            <p>Name: ${this.name}</p>
            <p>Medical History: ${this.medical_history}</p>
            <p>Address: ${this.address}</p>
            <p>Email: ${this.email}</p>
        `
    }
}

Client.allClients = []