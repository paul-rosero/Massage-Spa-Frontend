class Appointments {
  constructor() {
    console.log("appointments are loaded")
    this.adapter = new ApiAdapter();
    this.allContentLoaded();
    this.bindVariables();
    this.addEventListeners();
  }

  bindVariables(){
    this.clientNameInput = document.querySelector('#client-name-input');
    this.therapistNameInput = document.querySelector('#therapist-name-input');
    this.modalityInput = document.querySelector('#modality-input');
    this.apptTimeInput = document.querySelector('#appointment-time-input');
    this.specialRequestInput = document.querySelector('#special-request-input');
    this.clickApptForm = document.getElementById("appointment");
    this.clickClientForm = document.getElementById("client");
    this.clickTherapistForm = document.getElementById("therapist");
    this.therapistSortButton = document.getElementById("therapist-sort-button");
    this.clientSortButton = document.getElementById("client-sort-button");
    this.editOrDeleteTherapist = document.getElementById("all-therapists-list");
    this.deleteOrEditClient = document.getElementById("all-clients-list");
  }

  addEventListeners(){ 
    this.clickApptForm.addEventListener("click", () => { Appointment.prototype.clickToRenderApptForm() });
    
    this.clickClientForm.addEventListener("click", () => { Client.prototype.renderNewClientForm() });

    this.clickTherapistForm.addEventListener("click", () => { MassageTherapist.prototype.renderNewTherapistForm() })

    this.therapistSortButton.addEventListener('click', (e) => { MassageTherapist.prototype.sortTherapistName(e) })

    this.clientSortButton.addEventListener("click", (e) => { Client.prototype.sortClientName(e) })

    this.editOrDeleteTherapist.addEventListener('click', (therapist) => { MassageTherapist.prototype.clickToEditOrDeleteTherapist(therapist) })

    this.deleteOrEditClient.addEventListener("click", (client) => {
      Client.prototype.clickToEditClient(client);
    })

    Appointment.prototype.clickToShowAppt();
    Appointment.prototype.deleteAppointment();
  }

  allContentLoaded() {
    this.adapter.fetchApi("appointments", { method: 'GET' },Appointment.allAppointments , Appointment).then(() => { this.renderLi() });
    
    this.adapter.fetchApi("massage_therapists", { method: 'GET' }, MassageTherapist.allTherapists, MassageTherapist)
    .then(() => { MassageTherapist.prototype.renderTherapistDetails() })

    this.adapter.fetchApi("clients", { method: "GET" }, Client.allClients, Client).then(() => { Client.prototype.renderDetails() })
  }   

  renderLi(){
    const apptsContainer = document.querySelector('#appointments-container');
    apptsContainer.innerHTML = Appointment.allAppointments.map(appt => `<li id="appointment-${appt.id}">Appointment ${appt.id}</li>`).join("")
  }

}