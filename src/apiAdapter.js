class ApiAdapter {
    constructor() {
        this.baseUrl = "https://massage-spa-api.herokuapp.com/api/v1/"
    }

    static fetchSelect(url, input) {
        this.baseUrl = "https://massage-spa-api.herokuapp.com/api/v1/";
        let defaultOption = document.createElement('OPTION');
        input.add(defaultOption);
        return fetch(this.baseUrl + url)  
        .then(function(response) {   
            response.json().then(function(appt) {  
                let option;
                for (let i = 0; i < appt.length; i++) {
                    option = document.createElement('option');
                    option.id = appt[i].id;
                    option.text = MassageTherapist.prototype.capitalize(appt[i].name);
                    option.value = "";
                    input.add(option);
                }    
            });  
        })  
    }

    static fetchCreateClassObject(url, method, dataArray, ClassObject){
        this.baseUrl = "https://massage-spa-api.herokuapp.com/api/v1/";
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
        this.baseUrl = "https://massage-spa-api.herokuapp.com/api/v1/";
        return fetch(this.baseUrl + url, method)
        .then(promise => promise.json())
        
    }
    
}