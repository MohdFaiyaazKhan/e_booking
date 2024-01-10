const billNumberInput = document.getElementById('bill');
const messageDiv = document.getElementById('message');

billNumberInput.addEventListener('input', () => {
  const billNumber = billNumberInput.value;
  fetch('/checkBillAvailability', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bill: billNumber }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.exists) {
      messageDiv.innerText = 'This bill number is already taken.';
    } else {
      messageDiv.innerText = '';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
