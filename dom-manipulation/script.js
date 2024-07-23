// Reference input fields, button, and quote list section
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const addQuoteBtn = document.getElementById('add-quote-btn');
const quoteList = document.getElementById('quote-list');

// Load stored quotes on page load
document.addEventListener('DOMContentLoaded', displayQuotes);

// Event listener for adding quotes
addQuoteBtn.addEventListener('click', addQuote);

// Function to add a new quote
function addQuote() {
    const quoteText = quoteInput.value;
    const quoteAuthor = authorInput.value;

    // Check if both fields are filled out
    if (quoteText && quoteAuthor) {
        // Create a quote object
        const quote = {
            text: quoteText,
            author: quoteAuthor
        };

        // Convert quote object to JSON string and store in local storage
        const quotes = getQuotesFromLocalStorage();
        quotes.push(quote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Clear input fields
        quoteInput.value = '';
        authorInput.value = '';

        // Display updated list of quotes
        displayQuotes();
    } else {
        alert('Please fill out both fields.');
    }
}

// Function to display stored quotes
function displayQuotes() {
    // Clear the quote list
    quoteList.innerHTML = '';

    // Retrieve quotes from local storage
    const quotes = getQuotesFromLocalStorage();

    // Iterate through quotes and display each one
    quotes.forEach((quote, index) => {
        const quoteItem = document.createElement('div');
        quoteItem.classList.add('quote-item');
        quoteItem.innerHTML = `
            "${quote.text}" - ${quote.author}
            <span class="remove-btn" data-index="${index}">Remove</span>
        `;
        quoteList.appendChild(quoteItem);
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeQuote);
    });
}

// Function to remove a quote
function removeQuote(event) {
    const index = event.target.dataset.index;

    // Retrieve quotes from local storage
    const quotes = getQuotesFromLocalStorage();

    // Remove quote at specified index
    quotes.splice(index, 1);

    // Update local storage with new quote list
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Display updated list of quotes
    displayQuotes();
}

// Helper function to retrieve quotes from local storage
function getQuotesFromLocalStorage() {
    const quotes = localStorage.getItem('quotes');
    return quotes ? JSON.parse(quotes) : [];
}
