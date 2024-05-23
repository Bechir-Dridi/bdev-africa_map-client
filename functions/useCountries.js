import LoaderComponent from "../components/loader.js";

function useCountries() {
    //------------------------- GET ALL --------------------------
    async function getCountries() {
        let countries = []
        const loader = new LoaderComponent()

        try {
            //const response = await fetch(`http://localhost:4000/api/countries`, {
            const response = await fetch(`https://bdev-africa-map-server.onrender.com/api/countries`, {
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
                countries = json.countries;

                // Remove the loader after the data is fetched
                loader.removeLoaderFunc();
            }
            return countries
        } catch (error) {
            console.error('Error fetching country:', error);
        }
    }

    return {
        getCountries
    }
}

export {
    useCountries
}