//https://api.themoviedb.org/3/movie/550?api_key=9dafab561b71196c6c57491f4cd20519

// Set the API key and base URL for the MovieDB API
const apiKey = "9dafab561b71196c6c57491f4cd20519"
const baseUrl = "https://api.themoviedb.org/3"

// Define the API paths for different data we want to fetch
const apiPaths = {
    fetchCategories: `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
    fetchMovieList: (id) => `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`
}

// Define an async function to fetch data from the API
const fetchData = async () => {
    // Use the fetch function to make a GET request to the API
    let data = await fetch(apiPaths.fetchCategories)
    // Use the json function to parse the response data as JSON
    let fetchData = await data.json()
    // Log the fetched data to the console
    console.log(fetchData)
    // Return the fetched data
    return fetchData
}

// Define a function to fetch and build all sections of the page
function fetchAndBuildAllSections(){
    // Use the fetch function to make a GET request to the API
    fetch(apiPaths.fetchCategories)
    // Use the json function to parse the response data as JSON
    .then(res => res.json())
    // Extract the movie genres from the response data
    .then(res =>{
        const categories = res.genres
        // Map over the movie genres and return an array of genre names
        // movies.map((obj =>{
        //     console.log(obj.name)
        //     return obj.name
        // }))
        if(Array.isArray(categories) && categories.length)
        categories.forEach(category =>{
            fetchAndBuildMovieSection(apiPaths.fetchMovieList(category.id),category)
        })
    })
    // Log any errors to the console
    .catch(err =>console.log(err))
}

document.getElementById("moviePanel").cre


function fetchAndBuildMovieSection(fetchData , category){
// console.log(fetchData +" " + category)
fetch(fetchData)
.then(res => res.json())
.then(res => console.log(res.results))
.catch(err => console.log(err))
}
// Add an event listener to run the fetchAndBuildAllSections function when the page loads
window.addEventListener('load',()=>{
    fetchAndBuildAllSections()
})
