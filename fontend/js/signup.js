const exToken = localStorage.getItem('token');
    if(exToken){
    window.location.href='index.html';
    }

document.getElementById('signup-form').addEventListener('submit',async (event)=>{
    event.preventDefault();

    const name =document.getElementById('fullname').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    try{

        const response= await fetch('https://receiptvault-7iwg.onrender.com/html/signup',{

            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,password})
        });

        const data = await response.json();

        if(response.ok){
           localStorage.setItem('token',data.token);
           window.location.href='index.html';
        }else{
            alert(data.error);
        }


    }catch(err){
        console.error("Signup request failed"+err);
    }






})