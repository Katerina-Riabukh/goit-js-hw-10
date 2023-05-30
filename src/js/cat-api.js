const URL_Path = 'https://api.thecatapi.com/v1/breeds'
const URL_PathCard = 'https://api.thecatapi.com/v1/images/search'
const API = 'live_f5eYfX3pmgKDCaGa7NeHcEkXGgwKkBQl7aTEfdQBOtLNowJl1xTzfsRbey3o7dPQ'


export function fetchBreeds(breeds) {
    const params = new URLSearchParams({
      api_key: API, 
      breeds,
    });
      return fetch(`${URL_Path}?${params}`).then((response) => {
    
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
      })
  
}

export function fetchCatByBreed(option) {
  fetch(`https://api.thecatapi.com/v1/images/search?${API}&breed_ids=${option}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json()
    }).then((elem) => {
      markapCatCard(...elem)
    })
     .catch((error) => Notiflix.Notify.failure('Qui timide rogat docet negare'));;

}