import SlimSelect from 'slim-select'

const URL_Path = 'https://api.thecatapi.com/v1/breeds'
const URL_PathCard = 'https://api.thecatapi.com/v1/images/search'
const API = 'live_f5eYfX3pmgKDCaGa7NeHcEkXGgwKkBQl7aTEfdQBOtLNowJl1xTzfsRbey3o7dPQ'
 
const catInfo = document.querySelector('.cat-info')
const selector = document.querySelector(".breed-select")
const loading = document.querySelector('.loading')
loading.classList.add('is-hidden')
const select = new SlimSelect({
  select: '#single'
})

selector.addEventListener('change', getSelectedBreed)

function getSelectedBreed(event) {
 let option = selector.value;
  // console.log(option);
   //fetchCatByBreed(option)
   fetch(`https://api.thecatapi.com/v1/images/search?${API}&breed_ids=${option}`)
      .then((response) => {
       if (!response.ok) {
        throw new Error(response.status);
        }
      return response.json()
      }).then((breeds) => {
    
        catInfoMarcap(breeds)
        
      })
    .catch((error) => console.log(error));
  
}


function catInfoMarcap(breeds) {
  const [params] = breeds
  //console.log(params);
  const markap = `<img src="${params.url}" alt="" width ="340" heidht ="400">`;
  catInfo.insertAdjacentHTML('afterbegin', markap)

}


//  function catInfoMarcap(breeds) {
//   const card = breeds.map(({ id, temperament, description }) => {
  
//     //console.log(id);
//     `<h2>${temperament}</h2><p>${description}</p>`
//     //console.log( `<h2>${temperament}</h2><p>${description}</p>`);
   
//  }).join('')
//   catInfo.insertAdjacentHTML('beforeEnd', card)
//   console.log(card);
// }


 

 fetchBreeds('breeds')

function fetchBreeds(breeds) {
    
    const params = new URLSearchParams({
        api_key: API, 
      breeds,
    });
 
      return fetch(`${URL_Path}?${params}`)
    .then((response) => {
      //console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }).then((breeds) => {

      createMarcap(breeds)
      //fetchCatByBreed(breeds)
      //selectCatByBreed(breeds)
      catInfoMarcap(breeds)
    
    })
    .catch((error) => console.log(error));
}

function createMarcap(breeds) {
  const marcap = breeds.map(({ id, name }) => {
  //console.log(id);
   return  `<option class ='select-option' value = '${id}'>${name}</option>`
}).join('')
  selector.insertAdjacentHTML('afterbegin', marcap)
}






