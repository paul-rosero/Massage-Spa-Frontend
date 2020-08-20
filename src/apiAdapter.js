class ApiAdapter {
    constructor() {
        console.log("apiadapter is loaded")
        this.baseUrl = "http://localhost:3000/api/v1/"
    }

    static fetchSelect(url, input) {
        this.baseUrl = "http://localhost:3000/api/v1/";
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

    static fetchSortButton(url, method, list) {
        this.baseUrl = "http://localhost:3000/api/v1/";
        return fetch(this.baseUrl + url, method)
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
                const finalTherapist = new MassageTherapist(therapist)
                list.innerHTML += finalTherapist.renderTherapistDetails()
            })
        })
    }

    static fetchCreateClassObject(url, method, dataArray, ClassObject){
        this.baseUrl = "http://localhost:3000/api/v1/";
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        .then(newAppt => {
            return dataArray.push(new ClassObject(newAppt))
        })
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

    static updateOrDeleteClassObject(url, method){
        this.baseUrl = "http://localhost:3000/api/v1/";
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        
    }
    
}