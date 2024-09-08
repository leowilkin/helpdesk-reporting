document.getElementById('unblockForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const name = document.getElementById('name').value;
    const website = document.getElementById('website').value;
    const reason = document.getElementById('reason').value;

    // Create the data object to send to the serverless function
    const formData = {
        name: name,
        website: website,
        reason: reason
    };

    // Send the data to the serverless function via POST request
    fetch('https://WEBSITE/api/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        // Display the success message
        document.getElementById('mailtoLink').innerText = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mailtoLink').innerText = 'An error occurred. Please try again.';
    });
});
