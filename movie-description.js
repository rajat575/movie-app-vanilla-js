document.addEventListener("DOMContentLoaded", async () => {
  const string = window.location.search;
  const params = new URLSearchParams(string);
  const meal = params.get("meal");
  console.log(meal);
  const getMealDesc = await fetch(
    `https://omdbapi.com/?apikey=2eb5a649&t=${meal}`
  );

  const jsonData = await getMealDesc.json();
  console.log(jsonData);
  const mealName = document.getElementById("mealName");
  mealName.innerText = jsonData.Title;
  const mealImg = document.getElementById("mealImg");
  mealImg.src = jsonData.Poster;
  const mealIns = document.getElementById("mealIns");
  mealIns.innerText = jsonData.Plot;

  console.log(jsonData.meals[0]);
});
