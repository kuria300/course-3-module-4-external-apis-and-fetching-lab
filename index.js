// index.js

const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts');
const alerts= document.getElementById('alerts-display')
const errors= document.getElementById('error-message')

fetchButton.addEventListener('click', ()=>{
    const state= stateInput.value.toUpperCase()

    alerts.innerHTML='';
    errors.innerHTML='';
    errors.classList.add('hidden');

    async function fetchWeatherAlerts(state){
    try{
    const response= await fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    if(!response.ok) return;
    const data= await response.json()
    displayAlerts(data)

    console.log(`${state} weather is:`, data)


    }catch(error){
      console.error(error.message)
      errors.textContent=error.message
      errors.classList.remove('hidden');
    }
         
}

function displayAlerts(data){

    const h2= document.createElement('h2')
    const count= data.features.length
    h2.textContent=`${data.title}: ${count}`
    alerts.appendChild(h2)

    const ul=document.createElement('ul')

    data.features.forEach((message)=>{
    const li=document.createElement('li')
     li.textContent= message.properties.headline
     ul.appendChild(li)
    })

    alerts.appendChild(ul)
}

if (state) {
        fetchWeatherAlerts(state);
    }

   stateInput.value = '';
  
})

 

// Your code here!
