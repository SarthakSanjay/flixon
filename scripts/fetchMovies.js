//https://api.themoviedb.org/3/movie/550?api_key=9dafab561b71196c6c57491f4cd20519

// Set the API key and base URL for the MovieDB API
const apiKey = "9dafab561b71196c6c57491f4cd20519"
const baseUrl = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original"
// Define the API paths for different data we want to fetch
const apiPaths = {
    fetchCategories: `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
    fetchMovieList: (id) => `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending: `${baseUrl}/trending/all/day?api_key=${apiKey}&language-en-US`
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
            fetchAndBuildMovieSection(apiPaths.fetchMovieList(category.id),category.name)
        })
    })
    // Log any errors to the console
    .catch(err =>console.log(err))
}



function fetchAndBuildMovieSection(fetchData , category){
// console.log(fetchData +" " + category)
return fetch(fetchData)
.then(res => res.json())
.then(res => {
    const movies = res.results
    if(Array.isArray(movies)&& movies.length)
    {
        buildMoviesSection(movies , category)
    }
   return movies
})
.catch(err => console.log(err))
}
function buildMoviesSection(list , categoryName){
    // console.log(list)
    // console.log(categoryName)
    const moviesContainer = document.getElementById("movieContainer")
   const moviesListHTML =  list.map((item)=>{
        return `
        <img  class="move-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
        `
    }).join('')
    const movieSectionHTML = `
        <h1 id="title">${categoryName}</h1>
      <div class="movies-row">
        ${moviesListHTML}
      </div>
    `
    // console.log(movieSectionHTML)

    const div = document.createElement("div")
    div.id = "moviePanel"
    div.innerHTML = movieSectionHTML
    //append div into movies container
    moviesContainer.append(div)

}
function fetchTrendingMovies(){
    fetchAndBuildMovieSection(apiPaths.fetchTrending , "Trending Now")
    .then(list=>{
        let movieItem = Math.floor(Math.random() * list.length)
        buildBannerSection(list[movieItem])
        }).catch(err => {console.log(err)})
}
function buildBannerSection(movie){
    const bannerContainer = document.getElementById('bannerCont')
    let imageUrl = `${imgPath}${movie.backdrop_path}`
    bannerContainer.style.backgroundImage = `url(${imageUrl})`
    console.log(imageUrl)
    const contentDiv = document.createElement('contentDiv')
    contentDiv.id = "banner-content"
    contentDiv.innerHTML = `
    <h1 id="movie-title">${movie.title}</h1>
    <p id="rating">this is the rating of the movie</p>
    <p class="movie-desc">${movie.overview}</p>
    <div class="banner-btn">
      <button id="play">Play</button>
      <button id="more-info">more-info</button>
    </div>
    `
    console.log(movie)
    console.log(`${imgPath}${movie.backdrop_path}`)

   
    bannerContainer.appendChild(contentDiv)
}
// Add an event listener to run the fetchAndBuildAllSections function when the page loads
window.addEventListener('load',()=>{
    fetchTrendingMovies()
    fetchAndBuildAllSections()
})
