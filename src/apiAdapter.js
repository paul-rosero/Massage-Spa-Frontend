class ApiAdapter {
    constructor() {
        console.log("apiadapter is loaded")
        this.baseUrl = "http://localhost:3000/api/v1/"
    }

    fetchApi(url, method, dataArray, ObjectClass) {
        return fetch(this.baseUrl + url, method )
        .then(promise => promise.json())
        .then(dataJson => { 
            dataJson.forEach(data => {
                dataArray.push(new ObjectClass(data))
            })
          })
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
                    option.id = appt[i].id;
                    option.text = appt[i].name;
                    option.value = appt[i].name;
                    input.add(option);
                }    
            });  
        })  
    }
    
    fetchUpdate(url, method, ClassObject, list ) {
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        .then((updatedApptJSON) => {
            const updatedAppt = ClassObject.updateAppointment(updatedApptJSON)
            list.innerHTML = updatedAppt.renderDetails()
        })
    }

    fetchSortButton(url, method, list) {
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        .then(therapistsDataJson => {
            const newTherapist = therapistsDataJson.sort(function(a, b) {
                if (a.name < b.name ) {
                return -1;
                } 
                console.log(a.name < b.name)
                if (a.name > b.name) {
                return 1;
                }
                return 0
            })
            list.innerHTML = ""
            newTherapist.forEach(therapist => {
                const finalTherapist = new MassageTherapist(therapist)
                list.innerHTML += finalTherapist.renderSort()
            })
        })
    }

    fetchCreateAppointment(url, method, dataArray, ClassObject){
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        .then(newAppt => {
            dataArray.push(new ClassObject(newAppt))
        })
    }
}