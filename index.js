function showResults(results) {
  const templateEl = document.querySelector("#item-template");

  //Cantidad de resultados de busqueda
  const resultsCount = document.querySelector(".results-count");
  resultsCount.textContent = results.length;

  console.log(templateEl);

  for (prod of results) {
    const imgEl = templateEl.content.querySelector(".img-producto");
    imgEl.src = prod.thumbnail;

    const titleEl = templateEl.content.querySelector(".info-prod h3");
    titleEl.textContent = prod.title;
  }
}

function search() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchWord = event.target.search.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + searchWord)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return showResults(json.results);
      });
  });
}

function main() {
  search();
}

main();
