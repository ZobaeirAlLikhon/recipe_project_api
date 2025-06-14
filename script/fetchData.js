async function fetchData() {
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const response = await fetch(URL);
  const data = await response.json();
  const allData = data.meals.map((datas) => {
    return `
      <div class="mx-6">
        <img class="h-50 w-full" src="${datas.strMealThumb}" alt="" />
        <div class="bg-white rounded-xl shadow-md ps-2">
          <h2 class="text-lg font-semibold mb-2">${datas.strMeal}</h2>
          <p class="text-sm text-gray-600 h-[100px] overflow-hidden">${datas.strInstructions}</p>
        </div>
      </div>`;
  });
  document.getElementById("recipeItems").innerHTML = allData;
}

fetchData();
