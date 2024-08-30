document.getElementById('unblockForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const name = document.getElementById('name').value;
    const website = document.getElementById('website').value;
    const reason = document.getElementById('reason').value;

    // Encode the email content
    const subject = encodeURIComponent('Request to Unblock Website');
    const body = encodeURIComponent(`Dear IT Helpdesk,\n\nI would like to request the unblocking of the following website:\n\nWebsite: ${website}\n\nReason: ${reason}\n\nThank you,\n${name}`);

    // Create the mailto link
    const mailtoLink = `mailto:helpdesk@wellingtoncollege.org.uk?subject=${subject}&body=${body}`;

    // Display the mailto link
    document.getElementById('mailtoLink').innerHTML = `<a href="${mailtoLink}">Click here to send your request</a>`;
});
