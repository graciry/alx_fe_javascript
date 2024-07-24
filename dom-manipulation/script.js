// script.js

// Array to hold quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
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

// Load quotes from local storage if available

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
  function exportQuotes() {
    const quotesJson = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  // script.js


  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
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
      updateCategoryFilter();
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('New quote added!');
    } else {
      alert('Please enter both quote text and category.');
    }
  }
  
  // Function to update the category filter dropdown
  function updateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
    showRandomQuote();
  }
  
  // Function to get filtered quotes
  function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    return selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  }
  
  // Load the last viewed quote from session storage
  document.addEventListener('DOMContentLoaded', () => {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>${lastQuote.category}</em></p>`;
    }
    updateCategoryFilter();
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      document.getElementById('categoryFilter').value = selectedCategory;
    }
  });
  
  // Function to export quotes to a JSON file
  function exportQuotes() {
    const quotesJson = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      updateCategoryFilter();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Add event listeners
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  
  // Initial call to show a random quote
  showRandomQuote();
  // Update the addQuote function to update the categories in the dropdown
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      updateCategoryFilter();
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('New quote added!');
    } else {
      alert('Please enter both quote text and category.');
    }
  }
// Replace this URL with your actual mock API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

// Fetch data from the mock API
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data; // Assume data is an array of quotes
    } catch (error) {
        console.error('Error fetching data from server:', error);
        return [];
    }
}
// Polling interval (in milliseconds)
const POLLING_INTERVAL = 60000; // 1 minute

// Function to periodically check for updates
function startPolling() {
    setInterval(async () => {
        const serverQuotes = await fetchQuotesFromServer();
        syncLocalData(serverQuotes);
    }, POLLING_INTERVAL);
}

startPolling(); // Start polling when the app initializes

// Sync local data with server data
async function syncLocalData(serverQuotes) {
    const localQuotes = getQuotesFromLocalStorage();

    // Merge server data with local data
    // Conflict resolution: Server data takes precedence
    const mergedQuotes = serverQuotes.map(serverQuote => {
        const localQuoteIndex = localQuotes.findIndex(localQuote => localQuote.id === serverQuote.id);
        if (localQuoteIndex > -1) {
            return serverQuote; // Use server data
        }
        return serverQuote;
    });

    // Add new quotes from server that are not in local storage
    const newQuotes = serverQuotes.filter(serverQuote => !localQuotes.some(localQuote => localQuote.id === serverQuote.id));
    mergedQuotes.push(...newQuotes);

    // Save merged quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));

    // Display updated quotes
    displayQuotes();
}
// Display a notification when data is updated
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.textContent = 'Data has been updated from the server.';
    notification.style.backgroundColor = '#dff0d8';
    notification.style.color = '#3c763d';
    notification.style.padding = '10px';
    notification.style.marginTop = '10px';
    notification.style.border = '1px solid #d6e9c6';
    document.body.appendChild(notification);

    // Automatically hide the notification after 5 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 5000);
}

// Call this function in syncLocalData after updating the local storage
function syncLocalData(serverQuotes) {
    // Existing sync logic...
    showUpdateNotification();
}
// Display conflict resolution UI
function showConflictResolutionUI() {
    document.getElementById('conflict-resolution').style.display = 'block';
}

// Button click handler to manually resolve conflicts
document.getElementById('resolve-conflicts-btn').addEventListener('click', () => {
    // Logic for manual resolution
    // For example, you could allow users to review and merge conflicts manually
    document.getElementById('conflict-resolution').style.display = 'none';
});



  
  
    