//https://api.themoviedb.org/3/movie/550?api_key=9dafab561b71196c6c57491f4cd20519

// Set the API key and base URL for the MovieDB API
const apiKey = "9dafab561b71196c6c57491f4cd20519"
const baseUrl = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original"
// Define the API paths for different data we want to fetch
const apiPaths = {
    fetchCategories: `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
    fetchMovieList: (id) => `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending: `${baseUrl}/trending/all/day?api_key=${apiKey}&language-en-US`,
    searchYoutube:(query)=> `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyA3Ph5BiuAUdUK7RhGqE51GApYj-iao5Ww`
   // fetchMovieVideo:(movieID) => `${baseUrl}/movie/${movieID}/videos?api_key=${apiKey}&language=en-US`
}

function fetchMovieVideos(movieID){
   fetch(`${baseUrl}/movie/${movieID}/videos?api_key=${apiKey}&language=en-US`)
   .then(res => {
    // console.log(res)
   })


}
// Define an async function to fetch data from the API
const fetchData = async () => {
    
    // Use the fetch function to make a GET request to the API
    let data = await fetch(apiPaths.fetchCategories)
    // Use the json function to parse the response data as JSON
    let fetchData = await data.json()
    // Log the fetched data to the console
    // console.log(fetchData)
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
    const moviesContainer = document.getElementById("movieContainer")

   const moviesListHTML =  list.map((item)=>{
    console.log(item)
        let imgSrc = `${imgPath}${item.poster_path}`
        
        return `
        <div class="movie-item" id="movie-item">
        <img  class="move-item-img" src="${imgSrc}" alt="${item.title}" onclick="createAndDisplayMovieDetailPopup('${item.title}' ,' ${imgSrc}')" onclick="searchMovieTrailer('${item.title}')" />
       
        </div>
        `
    }).join('')

    // <a href="${apiPaths.fetchMovieVideo(item.id)}"></a>
    // 6/4/23
    // document.getElementById("title")
    const movieSectionHTML = `
        <h1 id="title">${categoryName}</h1><span>Explore</span>
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


function createAndDisplayMovieDetailPopup(title , movieImage){
    const popup = document.createElement("div")
    popup.className = "pop-up-div"
    popup.innerHTML = `
    <div class="popup-content">
    <div class='popup-movie-image'>
    <img src="${movieImage}" />
    </div>
    <div class="popup-movie-details">
    <button id='closeBtn'>x</button>
        <h1 class="movie-title">${title}</h1>
    </div>
    </div>
    `
    disableScroll()
    document.body.appendChild(popup)
    document.getElementById('closeBtn').addEventListener('click',()=>{
        document.body.removeChild(popup)
        enableScroll()
    
    })
}


// Disable scrolling
function disableScroll() {
    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';
  }
  
  // Enable scrolling
  function enableScroll() {
    document.body.style.overflow = null;
    // document.body.style.position = null;
  }
  


// function fetchVideo(fetchVideo , videoID){
//     return apiPaths.fetchMovieVideo
// }
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
    // console.log(movie)
    const contentDiv = document.createElement('contentDiv')
    contentDiv.id = "banner-content"
    if (movie.original_language === "en"){
        mtitle = movie.original_title ? movie.original_title : movie.name
    }
    else{
        mtitle = movie.title ? movie.title : movie.original_name
    }
    contentDiv.innerHTML = `
    <h1 id="movie-title">${mtitle}</h1>
    <p id="rating">${movie.release_date ? movie.release_date : movie.first}</p>
    <p class="movie-desc">${movie.overview.split(" ").slice(0,20).join(" ")}....</p>
    <div class="banner-btn">
      <button id="play"><img class="icon" src="/images/play.png" />Play</button>
      <button id="more-info"><img class="icon" src="/images/info.png" />more-info</button>
    </div>
    `
    bannerContainer.appendChild(contentDiv)
}
//movie trailer

function searchMovieTrailer(movieName){
    if(!movieName) return;

    fetch(apiPaths.searchYoutube(movieName))
    .then(res=>res.json())
    .then(res=> {
        console.log(res)
        const bestSearchResult = res.items[0]
        // const ytURL = `https://www.youtube.com/watch?v=${bestSearchResult.id.videoId}`
        // console.log(ytURL)

    })
    .catch(err => console.log(err))


}

//movie trailer


// Add an event listener to run the fetchAndBuildAllSections function when the page loads
window.addEventListener('load',()=>{
    const loadingIndicator = document.getElementById('spinner');
    loadingIndicator.style.display = 'block';
    fetchTrendingMovies()
    fetchAndBuildAllSections()
   
    setTimeout(()=>{
        loadingIndicator.style.display = 'none';
    },1000)
})

window.addEventListener("scroll" ,function (){
    const navBar = document.querySelector(".navbar")
    if(window.scrollY >5){
        navBar.style.background = 'black'

    }else{
        navBar.style.background = ' linear-gradient(to bottom, black, rgba(0, 0, 0, 0.457))'
    }
})