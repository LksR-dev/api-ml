function removeResults() {
  const productEl = document.querySelectorAll(".item");

  productEl.forEach((prod) => prod.remove());
}

function showResults(results) {
  removeResults();

  const templateEl = document.querySelector("#item-template");
  const itemEl = templateEl.content.querySelector(".item");

  //Cantidad de resultados de busqueda
  const resultsCount = document.querySelector(".results-count");
  resultsCount.textContent = results.length;

  for (prod of results) {
    //Add Prod IMG
    const imgEl = templateEl.content.querySelector(".img-producto");
    imgEl.src = prod.thumbnail;

    //Add Prod Title
    const titleEl = templateEl.content.querySelector(".info-prod h3");
    titleEl.textContent = prod.title;

    //Add Prod Condition
    const conditionEl = templateEl.content.querySelector(".condition");
    if (prod.condition == "new") {
      conditionEl.textContent = "Nuevo";
    } else {
      conditionEl.textContent = "Usado";
    }

    //Add Prod Sold Quantity
    const soldQuantityEl = templateEl.content.querySelector(".soldQuantity");
    soldQuantityEl.textContent = prod.sold_quantity;

    //Add Prod Price
    const priceEl = templateEl.content.querySelector(".price");
    priceEl.textContent = "$" + prod.price;

    //Clone
    // const clone = document.importNode(templateEl.content, true);
    // itemEl.appendChild(clone);
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
        console.log(json.results);
        return showResults(json.results);
      });
  });
}

function main() {
  search();
}

main();
