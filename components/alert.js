export default class AlertComponent {

    //constructor: to pass data to the class instance:
    constructor() {
        //this: to export it as method/prop/value on call:
        this.alertElement = null;
    }

    //------------------------ Alert ------------------------
    alertFunc() {
        try {
            // Create the alert container element
            this.alertElement = document.createElement('div');
            this.alertElement.classList.add('alert-details');

            // Create the header with the close button
            const headerElement = document.createElement('header');
            const closeElement = document.createElement('h1');
            closeElement.classList.add('close');
            closeElement.textContent = "X";
            closeElement.addEventListener("click", () => {
                this.alertElement.remove();
            });
            headerElement.appendChild(closeElement);

            // Create the alert content
            const contentElement = document.createElement('p');
            contentElement.classList.add('alert-content');
            contentElement.textContent = "Currently, you can access these African countries: Morocco, Algeria, Tunisia, Libya, and Egypt. We're diligently working to extend our reach to include all the other stunning countries across the continent!";

            // Append the elements to the alert container
            this.alertElement.append(headerElement, contentElement);

            // Append the alert container to the DOM
            const alertContainer = document.querySelector('.alert-details-container');
            alertContainer.appendChild(this.alertElement);
        } catch (error) {
            console.error('Error to alert:', error);
        }
    }

    async render() {
        this.alertFunc();
    }
}


