const searchButton = document.getElementById('search-btn');
const recipeContainer = document.getElementById('recipe-container');

searchButton.addEventListener('click', function() {
  const ingredient = document.getElementById('ingredient').value;
  
  if (ingredient) {
    fetchRecipes(ingredient);
  } else {
    alert('Please enter an ingredient.');
  }
});

async function fetchRecipes(ingredient) {
  const apiKey = '7b78f45ff5f24d61b652cb27c22cd9b3'; // Replace with your Spoonacular API key
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      recipeContainer.innerHTML = '<p>No recipes found!</p>';
    } else {
      recipeContainer.innerHTML = ''; // Clear previous results
      data.results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        recipeCard.innerHTML = `
          <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
        `;

        recipeContainer.appendChild(recipeCard);
      });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}