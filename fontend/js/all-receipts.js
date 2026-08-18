//get the endpoint for the receipt for the logged-in customer
//add to the front

const token = localStorage.getItem('token');
if (!token) {
    alert("please login first");
    window.location.href = "login.html";
} else {
    loadReceipt();
}

let allReceiptsData = [];

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
        console.error("renderReceipt failed: " + err);
    }
}

function renderReceipt(receipts) {
    allReceiptsData = receipts;

    const container = document.getElementById('receipt-row');
    container.innerHTML = '';

    receipts.forEach(receipt => {
        const stack = document.createElement("div");
        stack.className = 'receipt-stack';
        stack.dataset.id = receipt._id;

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

document.getElementById('receipt-row').addEventListener('click', function(event) {
    const stack = event.target.closest('.receipt-stack');
    if (!stack) return;

    const receipt = allReceiptsData.find(r => r._id === stack.dataset.id);
    openReceiptModal(receipt);
});

function openReceiptModal(receipt) {
    const modalHTML = `
        <div id="receipt-modal-overlay" class="modal-overlay">
            <div class="modal-box" id="modal-box">
                <div class="modal-header">
                    <span class="modal-title">Receipt Details</span>
                    <i class="ti ti-x modal-close" id="modal-close"></i>
                </div>
                <div class="modal-body">
                    <img src="https://receiptvault-7iwg.onrender.com/${receipt.imagePath}" class="modal-image" id="receipt-image">
                    <div class="modal-top-row">
                        <p class="modal-store">${receipt.storeName}</p>
                        <span class="modal-total">$${receipt.total}</span>
                    </div>
                    <p class="modal-meta">${receipt.date} &middot; ${receipt.category || ''}</p>
                    <div class="modal-notes">
                        <p class="modal-notes-label">Notes</p>
                        <p class="modal-notes-text">${receipt.notes || 'No notes added'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('receipt-modal-overlay');
    const box = document.getElementById('modal-box');

    gsap.set(overlay, { opacity: 0 });
    gsap.set(box, { opacity: 0, scale: 0.7 });

    gsap.to(overlay, { opacity: 1, duration: 0.4 });
    gsap.to(box, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' });

    document.getElementById('modal-close').addEventListener('click', closeReceiptModal);
    document.getElementById('receipt-modal-overlay').addEventListener('click', function(event) {
        if (event.target.id === 'receipt-modal-overlay') closeReceiptModal();
    });

    document.getElementById('receipt-image').addEventListener('click', function() {
        openFullImage(receipt.imagePath);
    });
}

function closeReceiptModal() {
    const overlay = document.getElementById('receipt-modal-overlay');
    const box = document.getElementById('modal-box');
    if (!overlay) return;

    gsap.to(box, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power1.in' });
    gsap.to(overlay, {
        opacity: 0,
        duration: 0.35,
        delay: 0.05,
        onComplete: () => {
            overlay.remove();
        }
    });
}

function openFullImage(imagePath) {
    const fullImageHTML = `
        <div id="full-image-overlay" class="full-image-overlay">
            <img src="https://receiptvault-7iwg.onrender.com/${imagePath}" class="full-image">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', fullImageHTML);

    const overlay = document.getElementById('full-image-overlay');

    gsap.set(overlay, { opacity: 0 });
    gsap.to(overlay, { opacity: 1, duration: 0.3 });

    overlay.addEventListener('click', function() {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => overlay.remove()
        });
    });
}

//                                   ##########################3
// const token = localStorage.getItem('token');
// if (!token) {
//     showLoginToast();
// } else {
//     loadReceipt();
// }

// function showLoginToast() {
//     const toastHTML = `
//         <div id="login-toast" class="login-toast">
//             <i class="ti ti-lock" aria-hidden="true"></i>
//             <div>
//                 <p class="toast-title">Log in to view this page</p>
//                 <p class="toast-sub">Taking you to sign in...</p>
//             </div>
//         </div>
//     `;
//     document.body.insertAdjacentHTML('afterbegin', toastHTML);

//     const toast = document.getElementById('login-toast');
//     requestAnimationFrame(() => {
//         toast.classList.add('show');
//     });

//     setTimeout(() => {
//         window.location.href = 'login.html';
//     }, 1500);
// }

// async function loadReceipt() {
//     try {
//         const response = await fetch('https://receiptvault-7iwg.onrender.com/receipts', {
//             method: "GET",
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const receipts = await response.json();

//         if (receipts.length == 0) {
//             document.getElementById('receipt-row').innerHTML =
//                 '<p>No receipts yet. Upload your first one!</p>';
//             return;
//         }

//         renderReceipt(receipts);

//     } catch (err) {
//         console.error("Failed to load receipts: " + err);
//     }
// }

// function renderReceipt(receipts) {
//     const container = document.getElementById('receipt-row');
//     container.innerHTML = '';

//     receipts.forEach(receipt => {
//         const stack = document.createElement("div");
//         stack.className = 'receipt-stack';

//         stack.innerHTML = `
//             <div class="paper-layer layer-1"></div>
//             <div class="paper-layer layer-2"></div>
//             <div class="receipt-content">
//                 <p class="receipt-date">${receipt.date}</p>
//                 <p class="receipt-store">${receipt.storeName}</p>
//                 <div class="receipt-line"></div>
//                 <span class="receipt-total">$${receipt.total}</span>
//             </div>
//         `;

//         container.appendChild(stack);
//     });

//      const cards = document.querySelectorAll('.receipt-stack');
//     gsap.from(cards, {
//         opacity: 0,
//         x: -30,
//         duration: 0.5,
//         ease: 'power2.out',
//         stagger: 1
//     });
// }