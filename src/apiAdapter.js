class ApiAdapter {
    constructor() {
        console.log("apiadapter is loaded")
        this.baseUrl = "http://localhost:3000/api/v1/"
    }

    fetchApi(url, method) {
        return fetch(this.baseUrl + url, method )
        .then(promise => promise.json())
        
    }

    fetchSelect(url, input) {
        let defaultOption = document.createElement('OPTION');
        input.add(defaultOption);
        return fetch(this.baseUrl + url)  
        .then(function(response) {   
            response.json().then(function(appt) {  
                let option;
                for (let i = 0; i < appt.length; i++) {
                    option = document.createElement('option');
                    option.dataset.id = appt[i].id;
                    option.text = appt[i].name;
                    option.value = appt[i].name;
                    input.add(option);
                }    
            });  
        })  
    }
    
    fetchUpdate(url, ClassObject, list ) {
        return fetch(this.baseUrl + url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({        
                massage_therapist_id: parseInt(therapistNameInput[therapistNameInput.selectedIndex].dataset.id),
                client_id: parseInt(clientNameInput[clientNameInput.selectedIndex].dataset.id),
                date_and_time: apptTimeInput.value,
                modality: modalityInput.value,
                special_request: specialRequestInput.value
            })
        })
        .then(promise => promise.json())
        .then((updatedApptJSON) => {
            const updatedAppt = ClassObject.updateAppointment(updatedApptJSON)
            list.innerHTML = updatedAppt.renderDetails()
        })
    }

    fetchSortButton(url, method, list, ClassObject) {
        fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        .then(therapistsDataJson => {
        const newTherapist = therapistsDataJson.sort(function(a, b) {
            if (a.name < b.name ) {
            return -1;
            } 
            if (a.name > b.name) {
            return 1;
            }
            return 0
        })
        list.innerHTML = ""
        newTherapist.forEach(therapist => {
            const finalTherapist = new ClassObject(therapist)
            list.innerHTML += finalTherapist.renderDetails()
        })
        })
    }
}