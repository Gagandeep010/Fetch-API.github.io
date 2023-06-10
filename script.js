const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Calling the API

//Creating the card
function createCard(data) {
  return new Promise((resolve, reject) => {  // using the promise function with parameters Resolve and reject to fulfill or reject the promise
    const card = document.createElement('div');/*creates a new div and assining it to card*/
    card.classList.add('card');   

    //creates a h2 element and assign the title variable
    const title = document.createElement('h2');  
    title.textContent = data.title;
    card.appendChild(title);

    //creates a paragraph element and assign the body variable
    const body = document.createElement('p');
    body.textContent = data.body;
    card.appendChild(body);

    resolve(card);
  });
}

function displayError(message) {
  const errorContainer = document.createElement('div');   //to display the error message.
  errorContainer.classList.add('error'); //calls the CSS class 'error'
  errorContainer.textContent = message; //makes sure the error msg is displayed

  // to make sure where the error msg should be displayed
  const cardsContainer = document.getElementById('cards-container'); 
  cardsContainer.innerHTML = '';
  cardsContainer.appendChild(errorContainer);
}

// If fetching Fails
fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  // A promise chain that handles the data . Recives the data from response.json
  .then(data => {
    const cardsContainer = document.getElementById('cards-container');
    const cardPromises = data.map(item => createCard(item));  // creating an array of promises
    Promise.all(cardPromises)

    // appending each card element to the cardsContainer by using appendChild
      .then(cards => {
        cards.forEach(card => {
          cardsContainer.appendChild(card);
        });
      })

      // to display the error if fetching fails
      .catch(error => {                         
        displayError(error.message);
      });
  })
  .catch(error => {
    displayError(error.message);
  });
