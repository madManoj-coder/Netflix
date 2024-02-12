const cl = console.log;

const baseUrl = `https://api.themoviedb.org/3`;
const imgBaseUrl = `https://image.tmdb.org/t/p/original`;
const apiKey = `cfa77074bc2f78bfac9906341ab24814`;


const makeApiCall = async (apiUrl, methodName, msgBody = null) => {
    try {
        let data = await fetch(apiUrl, {
            method : methodName,
            body : msgBody,
            "content-type" : "application/json"
        })
        return data.json();

    } catch (err) {
        alert(err)
    }
}