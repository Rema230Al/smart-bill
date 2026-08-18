//get the endpoint for the receipt for sp customer
//add to the front
// const token = localStorage.getItem('token');
// if(!token){
//     alert("please login first");
//     window.location.href="login.html";
// }else{
//     loadReceipt();
// }


// async function loadReceipt(){

//     try{
//         const response= await fetch('https://receiptvault-7iwg.onrender.com/receipts',{
//             method:"GET",
//             headers:{ 'Authorization': 'Bearer ' + token }
//         })

//          const receipts = await response.json();

//          if(receipts.length==0){
//             document.getElementById('receipts-container').innerHTML = 
//                 '<p>No receipts yet. Upload your first one!</p>';
//             return;
//          }


//   renderReceipt(receipts);

//     }catch(err){
//         console.error("renderReceipt faild"+err);
//     }

  

// }


// function renderReceipt(receipts){

//     const container=document.getElementById('receipt-row');
//     container.innerHTML='';

//     receipts.forEach(receipt => {
//         const stack = document.createElement("div");
//         stack.className='receipt-stack';

//         stack.innerHTML=`
//         <div class="paper-layer layer-1"></div>
//             <div class="paper-layer layer-2"></div>
//             <div class="receipt-content">
//                 <p class="receipt-date">${receipt.date}</p>
//                 <p class="receipt-store">${receipt.storeName}</p>
//                 <div class="receipt-line"></div>
//                 <span class="receipt-total">$${receipt.total}</span>
//             </div>
        
//         `

//         container.appendChild(stack);
//     });


// }







//                                   ##########################3
const token = localStorage.getItem('token');
if (!token) {
    showLoginToast();
} else {
    loadReceipt();
}

function showLoginToast() {
    const toastHTML = `
        <div id="login-toast" class="login-toast">
            <i class="ti ti-lock" aria-hidden="true"></i>
            <div>
                <p class="toast-title">Log in to view this page</p>
                <p class="toast-sub">Taking you to sign in...</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', toastHTML);

    const toast = document.getElementById('login-toast');
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

async function loadReceipt() {
    try {
        const response = await fetch('https://receiptvault-7iwg.onrender.com/receipts', {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const receipts = await response.json();

        if (receipts.length == 0) {
            document.getElementById('receipt-row').innerHTML =
                '<p>No receipts yet. Upload your first one!</p>';
            return;
        }

        renderReceipt(receipts);

    } catch (err) {
        console.error("Failed to load receipts: " + err);
    }
}

function renderReceipt(receipts) {
    const container = document.getElementById('receipt-row');
    container.innerHTML = '';

    receipts.forEach(receipt => {
        const stack = document.createElement("div");
        stack.className = 'receipt-stack';

        stack.innerHTML = `
            <div class="paper-layer layer-1"></div>
            <div class="paper-layer layer-2"></div>
            <div class="receipt-content">
                <p class="receipt-date">${receipt.date}</p>
                <p class="receipt-store">${receipt.storeName}</p>
                <div class="receipt-line"></div>
                <span class="receipt-total">$${receipt.total}</span>
            </div>
        `;

        container.appendChild(stack);
    });

     const cards = document.querySelectorAll('.receipt-stack');
    gsap.from(cards, {
        opacity: 0,
        x: -30,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 1
    });
}