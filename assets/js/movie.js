

const movieInfoContainer = document.getElementById("movieInfoContainer")
const movieTrailerSlider = document.getElementById("movieTrailerSlider")
const back = document.getElementById("back")
const iframe = document.getElementById("iframe");
const backdrop = document.getElementById("backdrop");
const movieTrailer = document.getElementById("movieTrailer");



const templatingOfMovies = (movObj, movieCast) => {
    let result = `<figure class="d-flex flex-column h-100 justify-content-center align-item-center movieImg">
                    <img src="${imgBaseUrl}${movObj.production_companies[0].logo_path || movObj.production_companies[1].logo_path || movObj.production_companies[2].logo_path}" 
                    alt="${movObj.title || movObj.original_title}" 
                    title="${movObj.title || movObj.original_title}" class="movieLogo">
                    <figcaption class="movieDetails">
                        <h2>${movObj.title || movObj.original_title}</h2>
                        <ul class="movieDetails">
                            <li>${movObj.release_date}</li>
                            <li><span>${movObj.adult ? "A" : "U"}</span></li>
                            <li>${movObj.runtime} min</li>
                            <li>${movObj.genres.map(ele => ele.name).join(", ")}</li>
                        </ul>
                        <p class="overview">
                           ${movObj.overview}  
                        </p>
                        <p class="starring">
                           <strong>Starring :</strong>
                           ${movieCast.cast.filter(castObj => castObj.order >= 0 && castObj.order <= 7).map(ele => ele.name || ele.original_name)}                        
                        </p>
                    </figcaption>
                  </figure>`

    movieInfoContainer.innerHTML = result;
}

const getTrailerId = (eve) => {
    backdrop.classList.remove('d-none');
    movieTrailer.classList.remove('d-none');
    let getId = eve.dataset.id;
    iframe.src = `https://youtube.com/embed/${getId}`;
}

const trailerTemplating = eve => {
    let result = " ";
    eve.forEach(ele => {
        result += `
                <div class="item" data-id="${ele.key}" onclick="getTrailerId(this)">
                    <figure>
                    <img src="https://img.youtube.com/vi/${ele.key}/0.jpg" alt="${ele.name}" title="${ele.name}">
                    <figcaption>
                        <i class="fa-solid fa-circle-play fa-4x"></i>
                    </figcaption>
                    </figure>
                    <p>
                     ${ele.name}
                    </p>
                </div>
        `
    });
    movieTrailerSlider.innerHTML = result;
}


const cancel = () => {
    backdrop.classList.add("d-none");
    movieTrailer.classList.add("d-none");
    iframe.src = " ";
}

backdrop.addEventListener("click", cancel)


document.addEventListener("DOMContentLoaded", async () => {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search)
    let movieId = queryParams.get("movieid")
    cl(movieId)

    let movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideoUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
    let movieCreditsUrl = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;
    cl(movieUrl)

    // let movObj = await makeApiCall(movieUrl, "GET")
    // let movVideo = await makeApiCall(movieVideoUrl, "GET")
    // let movieCredits = await makeApiCall(movieCreditsUrl, "GET")   

    let allMovieData = await Promise.all([makeApiCall(movieUrl, "GET"), makeApiCall(movieVideoUrl, "GET"), makeApiCall(movieCreditsUrl, "GET")])

    let [movObj, movVideo, movieCredits] = allMovieData;

    templatingOfMovies(movObj, movieCredits)

    let bgImg = document.getElementById("bgImg")

    bgImg.style.backgroundImage = `url(${imgBaseUrl}${movObj.backdrop_path})`

    trailerTemplating(movVideo.results);
    $('#movieTrailerSlider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            800: {
                items: 3,
                nav: true,
            },
            1100: {
                items: 4,
                nav: true,
            }
        }
    })
})


back.addEventListener("click", () => {
    history.back();
})