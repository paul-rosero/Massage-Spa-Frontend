class apiAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1/"
    }

    fetchApi(url) {
        return fetch(this.baseUrl + url)
            .then(promise => promise.json())
    }
}