console.log('client side javascript is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    fetch('/weather/?address='+location).then((response) =>{
    response.json().then((data)=>{
        messageOne.textContent = ''
        if(data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.weather
    })
})
})