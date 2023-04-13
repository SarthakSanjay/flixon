// Replace YOUR_API_KEY with your TMDb API key
const apiKey = '9dafab561b71196c6c57491f4cd20519';

// Get references to the search input and result container elements
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Add event listener to the search input to trigger the search
searchInput.addEventListener('input', (e) => {
  // Get the search query from the input value
  const query = e.target.value;
  // Only search if the query is not empty
  if (query.trim() !== '') {
    // Encode the query to URL format
    const urlEncodedQuery = encodeURIComponent(query);
    // Make an HTTP request to the TMDb API search endpoint
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${urlEncodedQuery}`)
      .then(response => response.json())
      .then(data => {
        // Clear the previous search results
        searchResults.innerHTML = '';
        // Iterate through the search results and create a card for each movie
        data.results.forEach(movie => {
          let rating = Math.floor(movie.vote_average * 10)
         let imageUrl= `https://image.tmdb.org/t/p/original${movie.poster_path}`
          const card = document.createElement('div');
          
          card.className = 'card';
          card.innerHTML = `
             <div class="movie-item" id="movie-item" onclick="createAndDisplayMovieDetailPopup('${movie.title}', '${imageUrl}','${ movie.overview}' , '${rating}' )">
           <img  src="${imageUrl}" alt='${movie.title }'   )"  />
         </div>
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
          `;
          // Add the card to the search results container
          searchResults.appendChild(card);
        });
      })
      .catch(error => console.error(error));
  } else {
    // Clear the search results if the query is empty
    searchResults.innerHTML = '';
  }
});


 function createAndDisplayMovieDetailPopup(title, movieImage, desc , rating  ) {
  console.log("clicked")
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
           
       <p id='like'><span id="rating">${rating}%</span> Liked This Movie!</p>
       </div>
       
       
       </div>
      </div>
  </div>
  `
  // disableScroll()
  document.body.appendChild(popup)
  const closeBtn = document.getElementById('closeBtn')
  closeBtn.addEventListener('click', () => {
      document.body.removeChild(popup)
      console.log("close button clicked")
      enableScroll()
  })

 
  
}
