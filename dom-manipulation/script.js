document.addEventListener('DOMContentLoaded', () => {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const addQuoteButton = document.getElementById('addQuoteButton');
  const categoryFilter = document.getElementById('categoryFilter');

  // Array to store quotes
  let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  ];

  // Load quotes from local storage if available
  const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  if (savedQuotes) {
    quotes = savedQuotes;
  }

  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  // Function to show a random quote
  function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
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
  // Function to create and add a form for adding new quotes dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteButton">Add Quote</button>
    </div>
  `;
  
  // Append the form to a parent element in your HTML
  const parentElement = document.getElementById('formContainer'); // Replace with your actual parent element
  parentElement.appendChild(formContainer);
}

// Call the function to create the add quote form
createAddQuoteForm();


  // Function to update the category filter dropdown
  function updateCategoryFilter() {
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  // Function to populate categories dynamically in a dropdown menu
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  
  // Clear existing options
  categoryFilter.innerHTML = '';
  
  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = 'all';
  defaultOption.textContent = 'All Categories';
  categoryFilter.appendChild(defaultOption);
  
  // Add options for each unique category
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Call the function to populate categories initially
populateCategories();


  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);
    showRandomQuote();
  }

  // Function to get filtered quotes
  function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    return selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  }

  // Load the last viewed quote from session storage
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>${lastQuote.category}</em></p>`;
  }
  updateCategoryFilter();
  const selectedCategory = localStorage.getItem('selectedCategory');
  if (selectedCategory) {
    categoryFilter.value = selectedCategory;
  }

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
  // Replace this URL with your actual API endpoint
const API_URL = 'https://api.github.com/users/Bard';

// Function to post data to the server
async function postData(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST', // HTTP POST method
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      },
      body: JSON.stringify(data) // Convert data to JSON format
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log('Server response:', responseData);
    return responseData; // Return the response data
  } catch (error) {
    console.error('Error posting data:', error);
    return null; // Handle errors gracefully
  }
}

// Example usage: Posting a new quote object
const newQuote = {
  text: 'Example quote text',
  category: 'Example category'
};

postData(newQuote);


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
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;

    // Merge server data with local data
    // Conflict resolution: Server data takes precedence
    const mergedQuotes = localQuotes.map(localQuote => {
      const serverQuote = serverQuotes.find(sq => sq.id === localQuote.id);
      return serverQuote || localQuote;
    });

    // Add new quotes from server that are not in local storage
    const newQuotes = serverQuotes.filter(serverQuote => !localQuotes.some(localQuote => localQuote.id === serverQuote.id));
    mergedQuotes.push(...newQuotes);

    // Save merged quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));

    // Display updated quotes
    showUpdateNotification();
    showRandomQuote();
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

  // Add event listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  addQuoteButton.addEventListener('click', addQuote);
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  document.getElementById('importQuotes').addEventListener('change', importFromJsonFile);
  categoryFilter.addEventListener('change', filterQuotes);

  // Initial call to show a random quote
  showRandomQuote();
});
