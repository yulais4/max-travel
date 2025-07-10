export class Form {

    constructor(form){

        if(!(form instanceof HTMLFormElement)){
            
            throw new Error("Element is not form!")
        }

        this.form = form

        this.closeBtn = this.form.querySelector("#close-btn")


        // Stop autoreload.
        this.form.addEventListener('submit', (ev) => {
            ev.preventDefault()
        })


        this.closeBtn.addEventListener('click', () => {
            this.close()
        })
    }

    



    open() {
        if (this.form.classList.contains("hidden")){
        this.form.classList.remove("hidden")
        }
    }

    close() {
        if (!this.form.classList.contains("hidden")){
        this.form.classList.add("hidden")
        }
    }

    toggleVisible() {
        this.form.classList.toggle("hidden")
    }
}