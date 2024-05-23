import { useCountry } from "../functions/useCountry.js";
const { getCountry, getImages } = useCountry()


export default class CountryComponent {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }


    //slider:
    sliderFuncMain(imagesElem, previousElement, nextElement) {
        let images = imagesElem.children;
        let j = 0
        let interval;

        function sliderFunc() {
            for (let i = 0; i < images.length; i++) {
                images[i].style.display = "none";
                //animation for all imgs:
                images[i].classList.remove('fade-in');
            }

            images[j].style.display = "block";
            //animation for single img:
            images[j].classList.add('fade-in');

            j++;
            if (j > images.length - 1) j = 0

            // set timeout for the sliderFunc:
            interval = setTimeout(sliderFunc, 5500);
        }
        //important when we fires up for the 1st time the country.js
        sliderFunc();

        // ------------------------- Next & Previous
        previousElement.addEventListener('click', () => {
            clearTimeout(interval);
            // j++
            //if (j < 0) j = 0
            j = (j--) % images.length;
            sliderFunc();
        });
        nextElement.addEventListener('click', () => {
            clearTimeout(interval);
            // j++
            //if (j > images.length - 1) j = 0
            j = (j++) % images.length;
            sliderFunc();
        });

        images = Array.from(images);
        images.forEach((img, i) => {
            // ------------------------- Hover & Timeout
            img.addEventListener('mouseover', () => {
                clearTimeout(interval);//stop the setTimeout
            });

            img.addEventListener('mouseout', () => {
                sliderFunc();
            });
        });

    }


    async render() {
        // Fetch country data:
        const country = await getCountry(this.id);
        // Fetch country images:
        const images = await getImages(this.name);
        console.log("country imgs: ", images);

        //----------------------------- country-details -----------------------begin
        const elem = document.createElement('div');
        elem.classList.add('country-details');

        // const title = document.createElement('h1');
        // //title.classList.add('c-name');
        // title.textContent = "Details";

        //------------------------ header -----------------------begin
        const headerElem = document.createElement('header');

        const nameElem = document.createElement('h1');
        nameElem.classList.add('c-name');
        nameElem.textContent = country.name;

        //------------ country flag -----------------------begin
        const imgContainerElem = document.createElement('div');
        imgContainerElem.classList.add('img-container');

        const imgElem = document.createElement('img');
        imgElem.src = country.flag_img;

        imgContainerElem.appendChild(imgElem);
        headerElem.append(...[nameElem, imgContainerElem]);
        //------------ country flag -----------------------end
        //------------------------ header -----------------------end

        //------------------------ slider -----------------------begin
        const sliderElement = document.createElement('div');
        sliderElement.classList.add('slider');


        //---------------- country images ------------------begin
        const imagesElem = document.createElement('div');
        imagesElem.classList.add('country-images');

        const previousElement = document.createElement('button');
        previousElement.classList.add('prev-btn');
        previousElement.textContent = "<";
        //sliderElement.appendChild(previousElement);

        const nextElement = document.createElement('button');
        nextElement.classList.add('next-btn');
        nextElement.textContent = ">";
        //sliderElement.appendChild(nextElement);

        images && images.map(img => {
            const imageElem = document.createElement('img');
            imageElem.src = img.img_url

            const imageElemContainer = document.createElement('div');
            imageElemContainer.classList.add('image-elem-container');
            imageElemContainer.appendChild(imageElem);

            imagesElem.appendChild(imageElemContainer);
        })

        //---------------- country images ------------------end

        //------------------------ slider -----------------------end
        //----------------------------- country-details -----------------------end

        // elem.appendChild(nameElem);
        // elem.appendChild(title);
        sliderElement.append(...[previousElement, imagesElem, nextElement]);
        //sliderElement.append(...[previousElement, imagesElem, nextElement]);
        //elem.append(...[title, headerElem, sliderElement])
        elem.append(...[headerElem, sliderElement])
        this.sliderFuncMain(imagesElem, previousElement, nextElement); // Call the function to start the slider

        return elem;
    }



}