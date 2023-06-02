import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchBreeds } from './js/cat-api.js';
import { fetchCatByBreed } from './js/cat-api.js';
//import Breed from './js/breed.js';

const API = 'live_f5eYfX3pmgKDCaGa7NeHcEkXGgwKkBQl7aTEfdQBOtLNowJl1xTzfsRbey3o7dPQ'
 
const catInfo = document.querySelector('.cat-info')
const selector = document.querySelector(".breed-select")
const loading = document.querySelector('.loading')
selector.classList.add('is-hidden')
loading.style.display = 'block'


Notiflix.Notify.init({
    width: '500px',
    position: 'left-top',
    distance: '15px',
    opacity: 1,
});



const select = new SlimSelect({
  select: '#single'
})


selector.addEventListener('change', getSelectedBreed)

function getSelectedBreed(event) {
  
  catInfo.innerHTML = '';
  
  
  const option = selector.value;
 
  fetchCatByBreed(option).then((elem) => {

    
    loading.style.display = 'block'
    markapCatCard(...elem)
    })
     .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));

  
}


fetchBreeds('breeds').then((breeds) => {

  createMarcap(breeds)

 selector.classList.remove('is-hidden')
  loading.style.display = 'none'
})
  .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'))
   .finally(() => {
     selector.style.display = 'block'
    //  loading.style.display = 'none'
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
  
       const  markap = `<img src="${breed.url}" alt="" width ="500" heidht =""><div class ="descr"><h2>${id.name}</h2><p>${id.description}</p><p><span class ="span">Temperament:</span> ${id.temperament}</p></div>`
    
      catInfo.insertAdjacentHTML('afterbegin', markap)
    })
    .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'))
    .finally(() => {
       loading.style.display = 'none'
     })
}













