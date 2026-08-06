document.getElementById('signup-form').addEventListener('submit',async (event)=>{


    const name =document.getElementById('fullname').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    try{

        const respons= await fetch('http://localhost:3000/signup',{

            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: json.stringify({name,email,password})
        });

        const data = await respons.json();

        if(respons.ok){
           localStorage.setItem('token',data.token);
           window.location('index.html');
        }else{
            alert(data.error);
        }


    }catch(err){
        console.log("Signup request falid"+err);
    }






})