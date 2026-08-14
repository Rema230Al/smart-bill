
//fill the field by getting the data from the result of the OCR 
//post the new receipt for sp customer
const token = localStorage.getItem('token');
if(!token){
    alert("please login first");
    window.location.href='login.html';
}

let currentImagePath = '';
async function handleFileSelected(event){

    const imgFile=event.target.files[0];
    const formData = new FormData();
    formData.append('receipt',imgFile);

    try{
        const response =await fetch('http://localhost:3000/receipts/scan',{
            method:"POST",
            headers:{'Authorization': 'Bearer '+ token},
            body:formData 
        })

        const data = await response.json();
        document.getElementById('store-name').value=data.storeName||'';
        document.getElementById('date').value=data.date||'';
        document.getElementById('total').value=data.total||'';
        document.getElementById('note').value=data.note||'';

        currentImagePath=data.imagePath;

    }catch(err){
        console.error("Scan faild"+err);
    }

}

document.getElementById('save-receipt-btn').addEventListener('click',async (event)=>{
    event.preventDefault();

    const receiptDtat={
        storeName:document.getElementById('store-name').value,
        date:document.getElementById('date').value,
        total: document.getElementById('total').value,
        category: document.querySelector('.category').value,
        notes: document.getElementById('note').value,
        imagePath: currentImagePath
    }

    try{

        const response=await fetch('http://localhost:3000/receipts',{
            method:"POST",
            headers:{'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body:JSON.stringify(receiptDtat)
        })

        if(response.ok){
            window.location.href='all-receipt.html';
        }else{
              const data = await response.json();
            alert(data.error || 'Failed to save receipt');
        }
    }catch(err){
        console.error("post receipt faild"+err);
    }




})


document.getElementById('choose-file').addEventListener('change',handleFileSelected);
document.getElementById('take-photo').addEventListener('change',handleFileSelected);