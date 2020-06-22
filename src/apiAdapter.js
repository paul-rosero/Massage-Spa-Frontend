class apiAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1/"
    }

    fetchApi(url, method) {
        return fetch(this.baseUrl + url, method )
            .then(promise => promise.json())
    }

    
}