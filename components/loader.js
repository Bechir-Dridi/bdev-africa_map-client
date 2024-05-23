export default class LoaderComponent {
    //constructor: to pass data to the class instance:
    constructor() {
        //this: to export it as method/prop/value on call:
        this.loaderElement = null;
    }

    //------------------------ Add Loader ------------------------
    loaderFunc() {
        try {
            // Create the loader container element
            this.loaderElement = document.createElement('div');
            this.loaderElement.classList.add('loader-details');

            // Create the img 
            const loadingArcElement = document.createElement('img');
            loadingArcElement.src = "../assets/loading-arc.svg"

            // Append the elements to the loader container
            this.loaderElement.append(loadingArcElement);

            // Append the alert container to the DOM
            const loaderContainer = document.querySelector('.loader-details-container');
            loaderContainer.appendChild(this.loaderElement);
        } catch (error) {
            console.error('Error to alert:', error);
        }
    }

    async render() {
        this.loaderFunc();
    }

    //------------------------ Remove Loader ------------------------
    removeLoaderFunc() {
        const loaderContainer = document.querySelector('.loader-details-container');
        if (this.loaderElement) {
            loaderContainer.removeChild(this.loaderElement);
        }
    }


}