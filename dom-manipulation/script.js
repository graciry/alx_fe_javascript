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
// script.js

// Load quotes from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote)); // Save the last viewed quote to session storage
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('New quote added!');
    } else {
      alert('Please enter both quote text and category.');
    }
  }
  
  // Add event listeners
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  
  // Initial call to show a random quote
  showRandomQuote();
// script.js

// Load the last viewed quote from session storage
document.addEventListener('DOMContentLoaded', () => {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>${lastQuote.category}</em></p>`;
    }
  });
    