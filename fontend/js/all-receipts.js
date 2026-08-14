//get the endpoint for the receipt for sp customer
//add to the front
const token = localStorage.getItem('token');
if(!token){
    alert("please login first");
    window.location.href="login.html";
}


async function loadReceipt(){

    try{
        const response= await fetch('http://localhost:3000/receipts',{
            method:"GET",
            headers:{ 'Authorization': 'Bearer ' + token }
        })

         const receipts = await response.json();

         if(receipts.length==0){
            document.getElementById('receipts-container').innerHTML = 
                '<p>No receipts yet. Upload your first one!</p>';
            return;
         }


  renderReceipt(receipts);

    }catch(err){
        console.error("renderReceipt faild"+err);
    }

  

}


function renderReceipt(receipts){

    const container=document.getElementById('receipt-row');
    container.innerHTML='';

    receipts.forEach(receipt => {
        const stack = document.createElement("div");
        stack.className='receipt-stack';

        stack.innerHTML=`
        <div class="paper-layer layer-1"></div>
            <div class="paper-layer layer-2"></div>
            <div class="receipt-content">
                <p class="receipt-date">${receipt.date}</p>
                <p class="receipt-store">${receipt.storeName}</p>
                <div class="receipt-line"></div>
                <span class="receipt-total">$${receipt.total}</span>
            </div>
        
        `

        container.appendChild(stack);
    });


}



loadReceipt();

