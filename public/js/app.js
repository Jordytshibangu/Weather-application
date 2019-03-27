console.log("Client side Js is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {  
//     response.json().then((data)=>{
//         console.log(data)
//     })

// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#paragraph_1')
const message_2 = document.querySelector('#paragraph_2')



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value;

    message_1.textContent = 'Loading...'
    message_2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message_1 = data.error;
        }
        else{
            const mess= data.location;
            const mass = data.forecast;

            message_1.textContent = mess;
            message_2.textContent = mass;

            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})