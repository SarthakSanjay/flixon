//https://api.themoviedb.org/3/movie/550?api_key=9dafab561b71196c6c57491f4cd20519
// Set the API key and base URL for the MovieDB API
const apiKey = "9dafab561b71196c6c57491f4cd20519"
const baseUrl = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original"
let contentType = "tv"



// Define the API paths for different data we want to fetch
const apiPaths = {
    fetchCategories: `${baseUrl}/genre/${contentType}/list?api_key=${apiKey}`,
    fetchMovieList: (id) => `${baseUrl}/discover/${contentType}?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending: `${baseUrl}/trending/${contentType}/day?api_key=${apiKey}&language-en-US`,
}



// Define an async function to fetch data from the API
const fetchData = async () => {
    // Use the fetch function to make a GET request to the API
    let data = await fetch(apiPaths.fetchCategories)
    // Use the json function to parse the response data as JSON
    let fetchData = await data.json()
    // Return the fetched data
    return fetchData
}
// Define a function to fetch and build all sections of the page



function fetchAndBuildAllSections() {
    // Use the fetch function to make a GET request to the API
    fetch(apiPaths.fetchCategories)
        // Use the json function to parse the response data as JSON
        .then(res => res.json())
        // Extract the movie genres from the response data
        .then(res => {
            const categories = res.genres
            if (Array.isArray(categories) && categories.length)
                categories.forEach(category => {
                    fetchAndBuildMovieSection(apiPaths.fetchMovieList(category.id), category.name)
                })
        })
        // Log any errors to the console
        .catch(err => console.log(err))
}



function fetchAndBuildMovieSection(fetchData, category) {
    return fetch(fetchData)
        .then(res => res.json())
        .then(res => {
            const movies = res.results
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies, category)
            }
            return movies
        })
        .catch(err => console.log(err))
}

async function buildMoviesSection(list, categoryName) {
    // console.log(list);
    const moviesContainer = document.getElementById("movieContainer")
    const moviesListHTML = await Promise.all(list.map(async (item) => {
      const trailerUrl = await getMovieTrailer(item.id);
      console.log(item);
      let imgSrc = `${imgPath}${item.poster_path}`
      let description = item.overview
      let rating = Math.floor(item.vote_average * 10)
      let title = item.title 
      return `
      <div class="movie-item" id="movie-item" onclick="createAndDisplayMovieDetailPopup('${item.original_name }' ,' ${imgSrc}' , '${description}','${rating}','${trailerUrl}'  )">
         <img  class="move-item-img" src='${imgSrc}' alt='${item.title }'   )"  />
      </div>
      `
    }));
    
    const movieSectionHTML = `
      <h1 id="title">${categoryName}</h1><span>Explore</span>
      <div class="movies-row">
        ${moviesListHTML.join('')}
      </div>
    `
    const div = document.createElement("div")
    div.id = "moviePanel"
    div.innerHTML = movieSectionHTML
    //append div into movies container
    moviesContainer.append(div)
  }
  

async function createAndDisplayMovieDetailPopup(title, movieImage, desc , rating , videoUrl ) {
    console.log(videoUrl)
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
            <p class="desc">${desc}</p>
            <div id="btnAndRating">
             <a href="${videoUrl}"><button class="watchBtn">Watch</button></a>
             <p id='like'><span id="rating">${rating}%</span> Liked This Tv show!</p>
         </div>
         
         
         </div>
        </div>
    </div>
    `
    disableScroll()
    document.body.appendChild(popup)
    const closeBtn = document.getElementById('closeBtn')
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup)
        console.log("close button clicked")
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



function fetchTrendingMovies() {
    fetchAndBuildMovieSection(apiPaths.fetchTrending, "Trending Now")
        .then(list => {
            // console.log(list)
            let movieItem = Math.floor(Math.random() * list.length)
            buildBannerSection(list[movieItem])
        }).catch(err => { console.log(err) })
}

 async function buildBannerSection(movie) {
    console.log(movie)
    const bannerContainer = document.getElementById('bannerCont')
    let imageUrl = `${imgPath}${movie.backdrop_path}`
    let posterUrl = `${imgPath}${movie.poster_path}`
    let bannerVideoUrl = await getMovieTrailer(movie.id)
    let rating = Math.floor(movie.vote_average * 10)
    bannerContainer.style.backgroundImage = `url(${imageUrl})`
    // console.log(movie)
    const contentDiv = document.createElement('contentDiv')
    contentDiv.id = "banner-content"
    if (movie.original_language === "en") {
        mtitle = movie.original_name ? movie.original_name : movie.name
    }
    else {
        mtitle = movie.title ? movie.title : movie.original_name
    }
    contentDiv.innerHTML = `
    <h1 id="movie-title">${mtitle.split(" ").slice(0,5).join(" ")}</h1>
    <p id="releaseDate">Released on: ${movie.release_date ? movie.release_date : movie.first_air_date
    }</p>
    <p class="movie-desc">${movie.overview.split(" ").slice(0, 20).join(" ")}....</p>
    <div class="banner-btn">
    <a href="${bannerVideoUrl}">  <button id="play"><img class="icon" src="/images/play.png" />Play</button></a>
    <button id="more-info" onclick="createAndDisplayMovieDetailPopup('${mtitle }' ,' ${posterUrl}' , '${movie.overview}','${rating}','${bannerVideoUrl}'  )" ><img class="icon" src="/images/info.png" />more-info</button>
    </div>
    `
    bannerContainer.appendChild(contentDiv)
}
//movie trailer

function getMovieTrailer(movieId) {
    // Construct the API request URL to fetch the videos for the specified movie
    const url = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${apiKey}`;
  
    // Make the API request and parse the response as JSON
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract the trailer URL from the response (if available)
        let trailerUrl = "";
        for (let video of data.results) {
          if (video.type === "Trailer") {
            trailerUrl = `https://www.youtube.com/watch?v=${video.key}`;
            // console.log(trailerUrl)
            break;
          }
        }
  
        // Return the trailer URL (or an empty string if no trailer is available)
        return trailerUrl;
      })
      .catch(error => {
        console.error("Error fetching movie videos:", error);
        return ""; // Return an empty string if an error occurs
      });
  }
  
  

//movie trailer

let profilepopup = false

document.getElementById("user_profile").addEventListener('click' , ()=>{
  if (!profilepopup) {
    document.getElementById("inner-profile").style.display = "flex"
    profilepopup = true
} else {
    document.getElementById("inner-profile").style.display = "none"
    profilepopup = false
  }
})

document.getElementById("search_btn").addEventListener("click" , ()=>{
    window.location.href = "/search/search.html"
})

// Add an event listener to run the fetchAndBuildAllSections function when the page loads



    window.addEventListener('load', () => {
        const loadingIndicator = document.getElementById('spinner');
        loadingIndicator.style.display = 'block';
        fetchTrendingMovies()
        fetchAndBuildAllSections()
    
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 1000)
    })


window.addEventListener("scroll", function () {
    const navBar = document.querySelector(".navbar")
    if (window.scrollY > 5) {
        navBar.style.background = 'black'

    } else {
        navBar.style.background = ' linear-gradient(to bottom, black, rgba(0, 0, 0, 0.457))'
    }
})