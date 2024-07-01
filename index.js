const getMovie = async () => {
  const inputValue = document.querySelector("#inputBox");

  inputValue.addEventListener("input", async (e) => {
    const value = e.target.value.trim();

    if (value.length > 0) {
      try {
        const fetchData = await fetch(
          `https://omdbapi.com/?apikey=2eb5a649&s=${value}`
        );

        if (!fetchData.ok) {
          throw new Error("Network response was not ok.");
        }

        const getData = await fetchData.json();
        console.log(getData);
        if (getData.Search) {
          const matchedMeals = getData.Search.filter((meal) =>
            meal.Title.toLowerCase().includes(value.toLowerCase())
          );

          const createDiv = document.getElementById("movieCards");
          createDiv.innerHTML = "";
          console.log(matchedMeals);

          matchedMeals.forEach((meal, index) => {
            const suggestion = document.createElement("div");

            // input checkbox
            const createBtn = document.createElement("input");
            createBtn.type = "checkbox";
            createBtn.id = `heart-${index}`;
            createBtn.title = "Add to favourites";
            createBtn.className = "heart";

            // Update checkbox state based on localStorage
            const favorites = JSON.parse(localStorage.getItem("meal")) || [];
            createBtn.checked = favorites.some(
              (fav) => fav.Title === meal.Title
            );

            createBtn.addEventListener("change", () => {
              if (createBtn.checked) {
                storeInLocalStorage(meal);
              } else {
                removeFromLocalStorage(meal.Title);
              }
            });

            const heartLabel = document.createElement("label");
            heartLabel.htmlFor = createBtn.id;
            heartLabel.innerHTML = "&#9829";
            heartLabel.className = "heartLabel";

            const createCard = document.createElement("div");
            createCard.className = "divCard";

            const createImg = document.createElement("img");
            createImg.src = meal.Poster;
            createImg.className = "posterImage";

            const createAnchor = document.createElement("a");
            createAnchor.href = `movie-description.html?meal=${meal.Title}`;
            createAnchor.className = "anchorDesc";

            suggestion.className = "suggestion";
            suggestion.innerText = meal.Title;

            createAnchor.appendChild(createImg);
            createCard.appendChild(createAnchor);
            createCard.appendChild(suggestion);
            createCard.appendChild(createBtn);
            createCard.appendChild(heartLabel);

            createDiv.appendChild(createCard);
          });

          if (matchedMeals.length === 0) {
            const noResults = document.createElement("div");
            noResults.className = "suggestion";
            noResults.innerText = "No meal found";
            createDiv.appendChild(noResults);
          }
        } else {
          const createDiv = document.getElementById("suggestionBox");
          createDiv.innerHTML = "";

          const noResults = document.createElement("div");
          noResults.className = "suggestion";
          noResults.innerText = "No meal found";
          createDiv.appendChild(noResults);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const createDiv = document.getElementById("suggestionBox");
      createDiv.innerHTML = "";
      const getOuterBox = document.getElementById("outerBox");
      getOuterBox.style.visibility = "hidden";
      const noResults = document.createElement("div");
      noResults.className = "suggestion";
      noResults.innerText = "";
      createDiv.appendChild(noResults);
    }
  });
};

const storeInLocalStorage = (meal) => {
  const favorites = JSON.parse(localStorage.getItem("meal")) || [];
  if (!favorites.some((fav) => fav.Title === meal.Title)) {
    favorites.push(meal);
    localStorage.setItem("meal", JSON.stringify(favorites));
  }
};

const removeFromLocalStorage = (Title) => {
  let favorites = JSON.parse(localStorage.getItem("meal")) || [];
  favorites = favorites.filter((fav) => fav.Title !== Title);
  localStorage.setItem("meal", JSON.stringify(favorites));
};

getMovie();
