async function fetchData(url) {
  const URL = url;
  const response = await fetch(URL);
  const data = await response.json();
  let allData = "";
  console.log(data);

  data.meals.forEach((datas) => {
    allData += `
      <div class="mx-4 mb-6">
        <img class="h-50 w-full" src="${datas.strMealThumb}" alt="" />
        <div class="flex flex-col bg-white rounded-xl shadow-md ps-2">
          <h2 class="text-lg font-semibold mb-2">${datas.strMeal}</h2>
          <p class="text-sm text-gray-600 h-[100px] overflow-hidden">${datas.strInstructions}</p>
          <button onClick="handleView('${datas.idMeal}')"  data-name="${datas.idMeal}"  class="viewDetails ml-auto p-2 bg-amber-400 m-2 rounded-xl text-white font-medium" >View</button>
        </div>
        
      </div>`;
  });

  document.getElementById("recipeItems").innerHTML = allData;
}
document.getElementById(
  "recipeItems"
).innerHTML = `<div class="flex justify-center ">
  <div  class="inline-flex items-center bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-indigo-600 focus:outline-none disabled:opacity-70" disabled>
  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
  Processing…
</div>
</div>`;
fetchData("https://www.themealdb.com/api/json/v1/1/search.php?s=");

document.getElementById("search_reci").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.search.value);
  const value = e.target.search.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  fetchData(url);
});

// const viewButtons = document.querySelectorAll(".viewDetails");
function handleView(mealId) {
  console.log(mealId);
  document.getElementById("popUpModal").classList.remove("hidden");
  // loading beffore fetch data
  document.getElementById("popUpModal").innerHTML = "";
  // fetch data
  fetchDataById(mealId);
}

async function fetchDataById(ids) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`;
  const response = await fetch(url);
  const data = await response.json();
  data.meals.forEach((datas) => {
    document.getElementById(
      "popUpModal"
    ).innerHTML = `<div class="mx-4 shadow-xl/30">
        <img id="setMImg" class="h-70 w-full" src="${datas.strMealThumb}" alt="" />
        <div class="flex flex-col bg-white rounded-xl shadow-md ps-2">
          <h2 class="text-lg font-semibold mb-2">${datas.strMeal}</h2>
          <p class="text-sm text-gray-600 h-[100px] overflow-hidden">
            ${datas.strInstructions}
          </p>
          <button
            onClick="closeModel()"
            data-name=""
            class="ml-auto p-2 bg-amber-400 m-2 rounded-xl text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>`;
  });
}
function closeModel() {
  document.getElementById("popUpModal").classList.add("hidden");
}
