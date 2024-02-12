
const trendingMoviesUrl = `${baseUrl}/trending/all/week?api_key=${apiKey}`;

const trendingMoviesSlider = document.getElementById("trendingMoviesSlider")


// const makeApiCall = (apiUrl, methodName, msgBody = null) => {
//    return fetch(apiUrl, {
//         body : msgBody,
//         method : methodName
//     })
//     .then(res => {
//         res.json()
//     })

// }


const loadParams = (eve) => {
    // cl(eve)
    let movieId = eve.closest(".movieCard").id;
    // cl(movieId)
    let currentUrl = new URL(window.location.href)
    // cl(currentUrl)
    let queryParams = new URLSearchParams()
    // cl(queryParams)
    queryParams.set("movieid", movieId) // movieId is set
    currentUrl.search = queryParams;

    let movieUrl = `${currentUrl.origin}/movieinfo.html${currentUrl.search}`
    cl(movieUrl)
    window.location.href = movieUrl;

}



const insertMainSliderItems = (arr) => {
    let result = "";
    arr.forEach(movieObj => {
        result += `<div class="item">
                 <figure class="movieCard" id="${movieObj.id}">
                     <img src="https://image.tmdb.org/t/p/original/${movieObj.poster_path}"
                         alt="${movieObj.title || movieObj.name}"
                         title="${movieObj.title || movieObj.name}">
                     <figcaption class="caption d-flex justify-content-center flex-column">
                           <strong class="display-3 my-3">${movieObj.title || movieObj.name}</strong>
                         <em class="d-none d-md-block mb-4">
                           ${movieObj.overview}  
                         </em>
                         <button class="btn btn-outline-danger w-50 hover" onclick="loadParams(this)"><strong>Watch Trailer</strong></button>
                     </figcaption>
                 </figure>
               </div>`
    });

    trendingMoviesSlider.innerHTML = result;
}






const getTrendingMovies = async () => {
    try {
        let trendingData = await makeApiCall(trendingMoviesUrl, "GET")
        cl(trendingData.results)
        insertMainSliderItems(trendingData.results)
        $("#trendingMoviesSlider").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            // navText : ["<i class='fa-solid fa-angles-left'></i>", "<i class='fa-solid fa-angles-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    dots: false
                },
                600: {
                    items: 1,
                    dots: false
                },
                1000: {
                    items: 1,
                    autoplay: true
                }
            }
        })
    } catch (err) {
        alert(`Something went wrong`)
    }

}

getTrendingMovies()

