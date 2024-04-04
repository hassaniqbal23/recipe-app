let input = document.querySelector('.input');
let searchBtn = document.querySelector('.searchbtn');
let searchResult = document.querySelector('.search_result');

async function fetchRecipe(query) {
	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
	);
	let data = await response.json();
	let meals = data.meals;

	if (meals) {
		meals.forEach((element) => {
			let item = document.createElement('div');
			item.classList.add('item');
			item.innerHTML = `
                <img src="${element.strMealThumb}">
                <div class="flex_container">
                    <h1 class="title">${element.strMeal}</h1>
                    <a href="#" class="view_btn">View Recipe</a>
                </div>
                <p class="item_data">${element.strCategory}</p>
            `;
			searchResult.appendChild(item);
		});
	} else {
		// Display message when no recipe is available
		let message = document.createElement('div');
		message.classList.add('message');
		message.textContent = 'Recipe is not available';
		searchResult.appendChild(message);
	}
}

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let searchInput = input.value.trim();
	searchResult.innerHTML = '';
	fetchRecipe(searchInput);
});
