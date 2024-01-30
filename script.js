// const ad=document.getElementById('ok')
// ad.addEventListener("click",async()=>{
//     //sending a request from client to server for get request
//     const respObj =await fetch('/get')
//     //response object ->json data
//     const data=await respObj.json()
//     console.log(data)
// })


// const ab=document.getElementById('ok')

// ab.addEventListener("click",async()=>{
//     //sending a request from client to server for get request
//     const respObj =await fetch('/get')
//     const login=await respObj.json()
//     console.log(login)
//     //post request
//     const respObj1 =await fetch('/post',{
//         method:"POST",
//         body: JSON.stringify({
//             "username":"subiga",
//             "password":"123"
//         }),
//         headers: {
//             Accept:"application/json",
//             "Content-Type":"application/json"
//         }
//     })
//     const login1=await respObj1.json()
//     console.log(login1)

// })

const ab=document.getElementById('login-button')
const ab1=document.getElementById('category')
const ab2=document.getElementById('amount')
const ab3=document.getElementById('date')
ab.addEventListener("click",async()=>{
const respObj1 =await fetch('/add-entry',{
            method:"POST",
            body: JSON.stringify({
                "catagory":ab1.value,
                "amount":ab2.value,
                "date":ab3.value
            }),
            headers: {
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        })
        const login1=await respObj1.json()
        console.log(login1)
    })
