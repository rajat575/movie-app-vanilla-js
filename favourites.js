// map data function to map the data called when dom is loaded
const mapData = async (getData) => {
  const favDiv = document.getElementById("favDiv");
  getData.map((meal) => {
    const createDiv = document.createElement("div");
    createDiv.className = "createDiv";
    const createImg = document.createElement("img");
    createImg.className = "posterImg";
    createImg.src = meal.Poster;
    const createNameDiv = document.createElement("div");
    createNameDiv.className = "movieName";
    const h3Tag = document.createElement("h3");

    h3Tag.innerText = meal.Title;
    const createBtn = document.createElement("button");
    createBtn.value = meal.Title;
    createBtn.innerText = "❌";
    createBtn.addEventListener("click", (e) => {
      removeMovie(e);
    });
    createBtn.className = "cross";
    const para = document.createElement("p");
    para.className = "year";
    para.innerText = `Year : ${meal.Year}`;
    createDiv.appendChild(createImg);
    createNameDiv.appendChild(h3Tag);
    createNameDiv.appendChild(para);

    createDiv.appendChild(createNameDiv);
    createDiv.appendChild(createBtn);
    favDiv.appendChild(createDiv);
  });
};

// map the favourite meals when dom content is loaded
document.addEventListener("DOMContentLoaded", (e) => {
  const getData = JSON.parse(localStorage.getItem("meal"));
  mapData(getData);
});

// remove meal function to remove the meals from favourite list
const removeMovie = async (e) => {
  let getValue = JSON.parse(localStorage.getItem("meal"));

  let updateValue = getValue.filter((res) => {
    return res.Title !== e.target.value;
  });

  const updateMeal = localStorage.setItem("meal", JSON.stringify(updateValue));
  location.reload();
};
