const exToken = localStorage.getItem('token');
    if(exToken){
    window.location('index.html');
    }



document.getElementById('login-form').addEventListener('submit', async(event)=>{
    event.preventDefault();

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;


    try{
        const respons = await fetch('http://localhost:3000/login',{

            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({email,password})
        });

        const data= await respons.json();

        if(respons.ok){
            localStorage.setItem('token',data.token);
            window.location('index.html');
        }else{
            alert("data.error");
        }
    }catch(err){
        console.error("Login request failed"+err);
    }



})