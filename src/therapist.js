class MassageTherapist {
    constructor(therapistDataObj) {
        console.log("therapist is loaded")
        this.id = therapistDataObj.id
        this.name = therapistDataObj.name
        this.sex = therapistDataObj.sex
        this.rating = therapistDataObj.rating
        
    }

    renderNewTherapistForm(){
        Forms.renderTherapistForm();
        this.createNewTherapist();
    }
    
    createNewTherapist(){
        const nameInput = document.getElementById('therapist-name-input');
        const sexInput = document.getElementById('therapist-sex-input');
        const newTherapistForm = document.getElementById("create-therapist")
        
        newTherapistForm.addEventListener('click', (e) => {
            e.preventDefault();
            ApiAdapter.fetchCreateClassObject("massage_therapists", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    therapist: {
                        name: e.path[1][0].value,
                        sex: e.path[1][1].value,
                        rating: e.path[1][2].value
                    }
                })
            }, MassageTherapist.allTherapists, MassageTherapist)
            .then(() => {
                nameInput.value = "";
                sexInput.value = "";
                this.renderTherapistDetails();
            })
        })
        
    }

    clickToEditOrDeleteTherapist(therapist){ 
        const foundTherapist = this.findTherapist(parseInt(therapist.target.id.split("-")[2]))
        if (therapist.target.className === "therapist-edit") {
            Forms.renderTherapistForm()
            const editTherapist = document.getElementById("edit-therapist")
            const nameInput = document.getElementById('therapist-name-input');
            const sexInput = document.getElementById('therapist-sex-input');
            const ratingInput = document.getElementById('therapist-rating-input');
        
            nameInput.value = foundTherapist.name;
            sexInput.value = foundTherapist.sex;
            ratingInput.value = foundTherapist.rating;           
            
            editTherapist.addEventListener("click", (e) => {
                e.preventDefault()
                ApiAdapter.updateOrDeleteClassObject(`massage_therapists/${foundTherapist.id}`, {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        therapist: {
                            name: nameInput.value,
                            sex: sexInput.value,
                            rating: ratingInput.value
                        }
                    })
                })
                .then((updatedTherapistJson) => {
                    foundTherapist.name = this.capitalize(updatedTherapistJson.name)
                    foundTherapist.sex = updatedTherapistJson.sex
                    foundTherapist.rating = updatedTherapistJson.rating
                    this.renderTherapistDetails()
                })
                .then(() => {
                    nameInput.value = ""
                    sexInput.value = ""
                    ratingInput.value = ""
                })
            })
        }

        if (therapist.target.className === "therapist-delete") {
            const id = therapist.target.id.split("-")[2]
            ApiAdapter.updateOrDeleteClassObject(`massage_therapists/${id}`, { method: "DELETE"})
            .then((therapist) => {
                this.therapistDeleted = document.getElementById(`therapist-${therapist.therapistId}`);
                this.therapistDeleted.remove();
            })
        } 
    }
    
    sortTherapistName(e){
        e.preventDefault()
        ApiAdapter.fetchSortButton("massage_therapists", { method: 'GET' }, this.therapistsList);
    }

    capitalize(fullName) {
        if (typeof name !== 'string') {return ''}
        return fullName.split(' ').map(name => name[0].toUpperCase() + name.slice(1).toLowerCase()).join(' ')
    }

    findTherapist(id) {
        return MassageTherapist.allTherapists.find((therapist) => therapist.id === id)
    }

    renderTherapistDetails(){
        this.therapistsList = document.querySelector('#all-therapists-list');
        this.therapistsList.innerHTML = MassageTherapist.allTherapists.map(therapist => 
            `<li id="therapist-${therapist.id}">
                <button class="therapist-edit" id=edit-therapist-${therapist.id} type="button">Edit Therapist</button>
                <button class="therapist-delete" id=delete-therapist-${therapist.id} type="button">Delete Therapist</button>
                <p>Name: ${this.capitalize(therapist.name)}</p>
                <p>Gender: ${therapist.sex}</p>
                <p>Rating: ${therapist.rating}</p>
            </li>`
        ).join("")  
        
    }
} 

MassageTherapist.allTherapists = []