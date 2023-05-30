import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchBreeds } from './js/cat-api.js';
//import { fetchCatByBreed } from './js/cat-api.js';
//import Breed from './js/breed.js';

const API = 'live_f5eYfX3pmgKDCaGa7NeHcEkXGgwKkBQl7aTEfdQBOtLNowJl1xTzfsRbey3o7dPQ'
 
const catInfo = document.querySelector('.cat-info')
const selector = document.querySelector(".breed-select")
const loading = document.querySelector('.loading')

Notiflix.Notify.init({
    width: '290px',
    position: 'left-top',
    distance: '5px',
    opacity: 1,
    // ...
});

selector.style.display = 'none'
loading.style.display = 'block'

const select = new SlimSelect({
  select: '#single'
})



//const breed = new Breed

selector.addEventListener('change', getSelectedBreed)
loading.style.display = 'block'
function getSelectedBreed(event) {
  catInfo.innerHTML = '';
  
  
  const option = selector.value;
 loading.style.display = 'block'
  fetchCatByBreed(option)
  
}

 function fetchCatByBreed(option) {
  fetch(`https://api.thecatapi.com/v1/images/search?${API}&breed_ids=${option}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json()
    }).then((elem) => {
      markapCatCard(...elem)
    })
     .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));

}

 fetchBreeds('breeds').then((breeds) => {

   createMarcap(breeds)

    })
   .catch((error) => console.log(error))
   .finally(() => {
     selector.style.display = 'block'
     loading.style.display = 'none'
   });

function createMarcap(breeds) {
 
  const marcap = breeds.map(( {id, name}) => {
  
   return  `<option class ='select-option' value = '${id}'>${name}</option>`
}).join('')
  selector.insertAdjacentHTML('afterbegin', marcap)
}



function markapCatCard(breeds) {
  //console.log(breeds.id);
  fetch(`https://api.thecatapi.com/v1/images/${breeds.id}?${API}`)
   .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json()
    }).then((breed) => {
      //console.log(breed);
      const [
        id,
      ] = breed.breeds
  
       const  markap = `<img src="${breed.url}" alt="" width ="400" heidht =""><div class ="descr"><h2>${id.name}</h2><p>${id.description}</p><p><span class ="span">Temperament:</span> ${id.temperament}</p></div>`
    
      catInfo.insertAdjacentHTML('afterbegin', markap)
    })
    .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'))
    .finally(() => {
       loading.style.display = 'none'
     })
}













