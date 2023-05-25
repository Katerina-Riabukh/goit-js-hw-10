import SlimSelect from 'slim-select'

 const URL_Path = 'https://api.thecatapi.com/v1/breeds'

const API = 'live_f5eYfX3pmgKDCaGa7NeHcEkXGgwKkBQl7aTEfdQBOtLNowJl1xTzfsRbey3o7dPQ'
 
const select = new SlimSelect({
  select: '#single'
})


// fetch(`${URL_Path}?${API}`)
//     .then((response) => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch((error) => console.log(error));

fetchBreeds()

function fetchBreeds(id) {
    
    const params = new URLSearchParams({
        api_key: API, 
        id,
    });
      return fetch(`${URL_Path}?${params}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => console.log(error));
}

