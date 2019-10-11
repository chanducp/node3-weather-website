const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
message1=document.querySelector('#message-1')
message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent=''
    message2.textContent='loading.....'
    fetch('/weather?address='+location).then(response=>{
    response.json().then(data=>{
        if(data.error){
           message1.textContent=data.error
           message2.textContent=''
        }else{
                message1.textContent=data.location
                message2.textContent=data.forecastData
        }

       
        
    })
})
    console.log('submitted')
})





// fetch('http://puzzle.mead.io/puzzle').then((response=>{

//         response.json().then((data)=>{
//             console.log(data)
//         })
//     })
// )