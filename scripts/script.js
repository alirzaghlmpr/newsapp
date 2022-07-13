///////////////// modules /////////////////
import * as util from "./utilities.js";
///////////////// modules /////////////////

///////////////// variables /////////////////
const dataBoxes = document.querySelectorAll(".data-box"),
  tabs = document.querySelectorAll(".tab"),
  title = document.querySelector("#title"),
  countriesSections = [
    document.querySelector("#countries-row1"),
    document.querySelector("#countries-row2"),
  ],
  categoriesSections = [
    document.querySelector("#categories-row1"),
    document.querySelector("#categories-row2"),
  ],
  submitSection = document.querySelector("#submit-row"),
  newsSection = document.querySelector("#news-row"),
  submitBtn = document.querySelector("#submit-btn"),
  apiKey = "1b522d0081624661b5959a1beef75f71";

let currentTab = tabs[0];
let infos;
const news = { country: "", category: "" };

///////////////// variables /////////////////

///////////////// event listeners /////////////////
evenetListener();
function evenetListener() {
  //event when click on 'search for news' button
  submitBtn.addEventListener("click", getNews);

  //event for tabs when clicked
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      currentTab = tab;
      util.deactiveAllTabsExcludeSelected(e, tabs);
      tab.classList.add("active");
      tab.classList.remove("deactive");
      util.updateTitle(tab.id, title);
      updateDataBoxes(tab.id);
    });
  });

  //event for databoxes when clicked
  dataBoxes.forEach(function (box) {
    box.addEventListener("click", function (e) {
      updateNewsField(box);
      util.deactiveAllExcludeSeleceted(e, currentTab.id, dataBoxes);
      box.classList.add("active");
      box.classList.remove("deactive");
      util.addCheckmarkToBox(box);
    });
  });
}
///////////////// event listeners /////////////////

///////////////// functions /////////////////

//function for updateDataBoxes base on tab we are in
function updateDataBoxes(tabId) {
  if (tabId == "country") {
    util.showElements(countriesSections);
    util.hideElements(categoriesSections);

    submitSection.classList.add("hide");
    newsSection.classList.add("hide");
  } else if (tabId == "category") {
    util.hideElements(countriesSections);
    util.showElements(categoriesSections);

    submitSection.classList.add("hide");
    newsSection.classList.add("hide");
  } else {
    submitSection.classList.remove("hide");
    newsSection.classList.remove("hide");
    deletePrevNews();
    updateSubmitRowFields();

    util.hideElements(countriesSections);
    util.hideElements(categoriesSections);
  }
}

//function for update news field
function updateNewsField(box) {
  if (box.classList.contains("country")) {
    util.setNewsCountry(box.lastElementChild.textContent, news);
  }
  if (box.classList.contains("category")) {
    util.setNewsCategory(box.lastElementChild.textContent, news);
  }
}

//function for update the submit section infos
function updateSubmitRowFields() {
  let fields = submitSection.firstElementChild.children;
  fields[0].textContent = `seleceted country : ${news.country}`;
  fields[1].textContent = `seleceted category : ${news.category}`;
}

//function for show spinner
function showSpinner() {
  let spinner = util.createSpinner();
  newsSection.appendChild(spinner);
}

//function for hide spinner
function hideSpinner() {
  newsSection.firstElementChild.remove();
}

//async function for get the news and put it on right place
async function getNews(e) {
  if (news.category == "" && news.country == "") {
    alert("you should at least select country or category");
    return;
  }

  tabs[0].disabled = true;
  tabs[1].disabled = true;
  e.target.disabled = true;

  showSpinner();

  infos = [];
  infos = await fetchData();
  infos = infos.articles;

  hideSpinner();

  util.showNews(newsSection, infos);

  tabs[0].disabled = false;
  tabs[1].disabled = false;
  e.target.disabled = false;
}

//function for fetch the data and return the response of the API
async function fetchData() {
  const response = await fetch(util.createQuery(news, apiKey));
  return response.status == 200
    ? response.json()
    : new Error(response.statusText);
}

//function for delete the previous news
function deletePrevNews() {
  newsSection.innerHTML = "";
}
///////////////// functions /////////////////
