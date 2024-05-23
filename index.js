// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.vercel.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
import { useCountries } from "./functions/useCountries.js";
const { getCountries } = useCountries()
//import class:
import CountryComponent from "./components/country.js";
import AlertComponent from "./components/alert.js";


//--------------------- GET ALL ---------------------
let theCountries = []
getCountries()
    .then((countries) => {
        theCountries = countries
        console.log("countries: ", countries);
    });


//--------------------- GET DOM ---------------------
const polygons = document.querySelectorAll("polygon")
polygons.forEach(polygon => {
    polygon.addEventListener("click", activateCountry);
});


//------------ "single country" HANDLER -------------
function activateCountry(event) {
    let name
    switch (event.target.classList.value) {
        case "morocco":
            console.log("x morocco");
            name = "morocco";
            break;
        case "algeria":
            console.log("x algeria");
            name = "algeria";
            break;
        case "tunisia":
            console.log("x tunisia");
            name = "tunisia";
            break;
        case "libya":
            console.log("x libya");
            name = "libya";
            break;
        case "egypt":
            console.log("x egypt");
            name = "egypt";
            break;
        default:
            const alertComponent = new AlertComponent();
            alertComponent.render()
            return;// Return early if name is undefined

    }

    // Remove 'clicked' class from all polygons
    polygons.forEach(polygon => {
        polygon.classList.remove('clicked');
    });

    // Add 'clicked' class to the clicked polygon:
    event.target.classList.add('clicked');

    // get country ID:
    console.log("name:", name);
    let ID
    theCountries && theCountries.forEach(country => { if (name === country.name) { ID = country.id } })
    console.log("ID: ", ID);


    //--------------------------------------- country-details ----------------------------
    //get country details:
    const component = new CountryComponent(ID, name);

    const container = document.querySelector('.country-details-container');

    //---------------- Remove old country-details -------------
    // Check if country details div already exists
    let existingDiv = container.querySelector('.country-details');
    if (existingDiv) {
        // Remove existing div
        container.removeChild(existingDiv);
    }

    //---------------- Create new country-details -------------
    //if (name) {
    component.render()
        .then(elem => {
            container.appendChild(elem);
        });
    //}

}


