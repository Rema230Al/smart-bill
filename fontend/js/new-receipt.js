
//fill the field by getting the data from the result of the OCR 
//post the new receipt for sp customer
const token = localStorage.getItem('token');
if(!token){
    alert("please login first");
    window.location.href='login.html';
}else{
    document.getElementById('choose-file').addEventListener('change',handleFileSelected);
    document.getElementById('take-photo').addEventListener('change',handleFileSelected);
}

let currentImagePath = '';
async function handleFileSelected(event) {
      console.log('handleFileSelected triggered');
    const imgFile = event.target.files[0];
    console.log('File selected:', imgFile);
    if (!imgFile) return;

    showUploadConfirmation(imgFile);

    const formData = new FormData();
    formData.append('receipt', imgFile);

    try {
        const response = await fetch('https://receiptvault-7iwg.onrender.com/receipts/scan', {
            method: "POST",
            headers: { 'Authorization': 'Bearer ' + token },
            body: formData
        });
console.log('Response status:', response.status);
        const data = await response.json();
        document.getElementById('store-name').value = data.storeName || '';
        document.getElementById('date').value = data.date || '';
        document.getElementById('total').value = data.total || '';
        document.getElementById('note').value = data.note || '';

        currentImagePath = data.imagePath;
        console.log('Data received from scan:', data);
        console.log('imagePath received from scan:', data.imagePath);
        markUploadComplete();

    } catch (err) {
        console.error("Scan failed: " + err);
        markUploadFailed();
    }
}

function showUploadConfirmation(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const previewHTML = `
            <div id="upload-confirm" class="upload-confirm">
                <img src="${event.target.result}" class="upload-thumb">
                <div class="upload-info">
                    <p class="upload-filename">${file.name}</p>
                    <p class="upload-status" id="upload-status">
                        <i class="ti ti-loader-2 spin"></i> Processing receipt...
                    </p>
                </div>
            </div>
        `;
        document.querySelector('.upload').insertAdjacentHTML('beforeend', previewHTML);
    };

    reader.readAsDataURL(file);
}

function markUploadComplete() {
    const status = document.getElementById('upload-status');
    if (status) {
        status.innerHTML = '<i class="ti ti-circle-check"></i> Fields filled in — review below';
        status.classList.add('success');
    }
}

function markUploadFailed() {
    const status = document.getElementById('upload-status');
    if (status) {
        status.innerHTML = '<i class="ti ti-alert-circle"></i> Something went wrong, try again';
        status.classList.add('error');
    }
}

document.getElementById('save-receipt-btn').addEventListener('click',async (event)=>{
    event.preventDefault();
 console.log('currentImagePath at save time:', currentImagePath); 
    const receiptDtat={
        storeName:document.getElementById('store-name').value,
        date:document.getElementById('date').value,
        total: document.getElementById('total').value,
        category: document.querySelector('.category').value,
        notes: document.getElementById('note').value,
        imagePath: currentImagePath
    }

    try{

        const response=await fetch('https://receiptvault-7iwg.onrender.com/receipts',{
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
    console.log('Save error details:', data);  
    alert(data.error || data.message || 'Failed to save receipt');
        }
    }catch(err){
        console.error("post receipt faild"+err);
    }




})


