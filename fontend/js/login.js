const exToken = localStorage.getItem('token');
    if(exToken){
    window.location.href='/';
    }



document.getElementById('login-form').addEventListener('submit', async(event)=>{
    event.preventDefault();

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;


    try{
        const response= await fetch('https://receiptvault-7iwg.onrender.com/login',{

            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({email,password})
        });

        const data= await response.json();

        if(response.ok){
            console.log('Full data from login:', data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('userName', data.name);
            window.location.href='/';
        }else{
            alert("data.error");
        }
    }catch(err){
        console.error("Login request failed"+err);
    }



})