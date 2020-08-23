class Client {
    constructor(clientDataObj) {
        console.log("client is loaded")
        this.id = clientDataObj.id
        this.name = clientDataObj.name
        this.address = clientDataObj.address
        this.email = clientDataObj.email
        this.medical_history = clientDataObj.medical_history
     
    }

    findClient(id) {
        return Client.allClients.find((client) => client.id === id)
    }

    sortClientName(){

    }

    renderNewClientForm(){
        Forms.renderClientForm();
        this.createNewClient()
    }
    
    createNewClient(e){
        const clientNameInput = document.getElementById("client-name");
        const clientMedicalHistory = document.getElementById("medical_history");
        const clientAddress = document.getElementById("address");
        const clientEmail = document.getElementById("email");
        const createNewClientForm = document.getElementById("create-client")
        
        createNewClientForm.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e)
            console.log(e.path[1][1].value)
            ApiAdapter.fetchCreateClassObject("clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: { 
                        name: e.path[1][0].value,
                        medical_history: e.path[1][1].value,
                        address: e.path[1][2].value,
                        email: e.path[1][3].value 
                    }
                })
            }, Client.allClients, Client)
            .then(() => {
                clientNameInput.value = ""
                clientMedicalHistory.value = ""
                clientAddress.value = ""
                clientEmail.value = ""
                this.renderDetails()
            })
        })
    }

    clickToEditClient(client){
        const foundClient = this.findClient(parseInt(client.target.id.split("-")[2]))
        if (client.target.className === "client-edit"){
            Forms.renderClientForm()
            const editClientButton = document.getElementById("edit-client");
            const clientNameInput = document.getElementById("client-name");
            const clientMedicalHistoryInput = document.getElementById("medical_history");
            const clientAddressInput = document.getElementById("address");
            const clientEmailInput = document.getElementById("email");

            clientNameInput.value = foundClient.name
            clientMedicalHistoryInput.value = foundClient.medical_history
            clientAddressInput.value = foundClient.address
            clientEmailInput.value = foundClient.email
            
            editClientButton.addEventListener("click", (e) => {
                e.preventDefault();
                ApiAdapter.updateOrDeleteClassObject(`clients/${foundClient.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    client: {
                        name: clientNameInput.value,
                        medical_history: clientMedicalHistoryInput.value,
                        address: clientAddressInput.value,
                        email: clientEmailInput.value
                    }
                })
                })
                .then((updatedClientJson) => {
                    foundClient.name = updatedClientJson.name
                    foundClient.medical_history = updatedClientJson.medical_history
                    foundClient.address = updatedClientJson.address
                    foundClient.email = updatedClientJson.email
                    this.renderDetails()
                })
                .then(() => {
                    clientNameInput.value = ""
                    clientMedicalHistoryInput.value = ""
                    clientAddressInput.value = ""
                    clientEmailInput.value = ""
                })
            })
        }

        if(client.target.className === "client-delete"){
            console.log(foundClient.id)
            ApiAdapter.updateOrDeleteClassObject(`clients/${foundClient.id}`, { method: "DELETE"})
            .then((client) => {
                console.log(client.clientId)
                this.clientDeleted = document.getElementById(`client-${client.clientId}`);
                this.clientDeleted.remove();
            })
        }
    }
    
    renderDetails() {
        const clientContainer = document.getElementById("all-clients-list");
        clientContainer.innerHTML = Client.allClients.map(client => 
            `<li id="client-${client.id}">
                <br><h4>Client Info.</h4>
                <button class="client-edit" id="client-edit-${client.id}">Edit Client</button>
                <button class="client-delete" id="client-delete-${client.id}">Delete Client</button>
                <p>Client: ${client.id}</p>
                <p>Name: ${client.name}</p>
                <p>Medical History: ${client.medical_history}</p>
                <p>Address: ${client.address}</p>
                <p>Email: ${client.email}</p>
            </li>`
        ).join("")
        
    }
}

Client.allClients = []