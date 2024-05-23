import LoaderComponent from "../components/loader.js";

function useCountry() {

    //------------------------ GET SINGLE ------------------------
    async function getCountry(id) {
        let country;
        const loader = new LoaderComponent()

        try {
            //const response = await fetch(`http://localhost:4000/api/countries/${id}`, {
            const response = await fetch(`https://bdev-africa-map-server.onrender.com/api/countries/${id}`, {
                method: 'GET',
                // headers: {
                //     Authorization: `Bearer ${user.token}`
                // }
            });

            if (response.ok) {
                //Loading:
                loader.render()

                const json = await response.json();
                console.log("country details: ", json);

                country = json

                // Remove the loader after the data is fetched
                loader.removeLoaderFunc();
            }
        } catch (error) {
            console.error('Error fetching country:', error);
        }

        return country.country
    }


    //------------------------ GET IMAGES ------------------------
    async function getImages(c_name) {
        let images;
        try {
            const response = await fetch(`https://bdev-africa-map-server.onrender.com/api/images/${c_name}`, {
                method: 'GET',
                // headers: {
                //     Authorization: `Bearer ${user.token}`
                // }
            });

            if (response.ok) {
                const json = await response.json();
                console.log("images details: ", json);

                images = json
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }

        return images.images
    }


    return {
        getCountry, getImages
    }
}

// module.exports = {
//     useCountry
// }
export {
    useCountry
}