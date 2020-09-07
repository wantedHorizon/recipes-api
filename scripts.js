const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

//get all recipes
async function fetchRecipes(query) {
    const res = await fetch(`${proxy}/${baseEndpoint}?q=${query}`);
    const data = await res.json();
    return data;
}

// click on submit btn
async function handleSubmit(event) {
    event.preventDefault();
    const el = event.currentTarget;
    fetchAndDisplay(form.query.value);
}

//get data and render it
async function fetchAndDisplay(query) {
    // turn the form off
    form.submit.disabled = true;
    // submit the search
    const recipes = await fetchRecipes(query);
    displayRecipes(recipes.results);

    form.submit.disabled = false;
}

//convert data to html and plant it
function displayRecipes(recipes) {
    const html = recipes.map(recipe => {
        return `
        <div class="recipe">
        <h2>${recipe.title}</h2>
        <p>${recipe.ingredients}</p>
        ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}" />`}
        <a href="${recipe.href}">View  Recipe → </a>
        </div>
        `
    })
    recipesGrid.innerHTML = html.join('');
}


form.addEventListener('submit', handleSubmit);

//on page load
fetchAndDisplay('pizza');