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

evenetListener();
function evenetListener() {
  submitBtn.addEventListener("click", getNews);

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      currentTab = tab;
      deactiveAllTabsExcludeSelected(e);
      tab.classList.add("active");
      tab.classList.remove("deactive");
      updateTitle(tab.id);
      updateDataBoxes(tab.id);
    });
  });

  dataBoxes.forEach(function (box) {
    box.addEventListener("click", function (e) {
      updateNewsField(box);
      deactiveAllExcludeSeleceted(e);
      box.classList.add("active");
      box.classList.remove("deactive");
      addCheckmarkToBox(box);
    });
  });
}

function deactiveAllTabsExcludeSelected(e) {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i] == e) {
      continue;
    }
    tabs[i].classList.add("deactive");
    tabs[i].classList.remove("active");
  }
}

function createDOMelementByClass(tagName, ...classList) {
  let tag = document.createElement(tagName);
  if (classList != "") {
    tag.classList = "";
    classList.map((item) => {
      tag.classList += item;
    });
  }

  return tag;
}
function createCheckMark() {
  let tag = document.createElement("i");
  tag.classList = "bi bi-check-circle-fill check-mark";
}

function deactiveAllExcludeSeleceted(e) {
  let tabBoxesIdentifier = currentTab.id;

  for (let i = 0; i < dataBoxes.length; i++) {
    if (dataBoxes[i] == e) {
      continue;
    }

    if (dataBoxes[i].classList.contains(tabBoxesIdentifier)) {
      dataBoxes[i].classList.remove("active");
      dataBoxes[i].classList.add("deactive");
      if (dataBoxes[i].lastElementChild.classList.contains("selected")) {
        dataBoxes[i].lastElementChild.remove();
      }
    }
  }
}

function addCheckmarkToBox(box) {
  if (box.lastElementChild.classList.contains("selected")) {
    return;
  }

  let spanTag = createDOMelementByClass("span", "selected");
  let checkMarkTag = createDOMelementByClass(
    "i",
    "bi bi-check-circle-fill check-mark"
  );

  spanTag.appendChild(checkMarkTag);

  box.appendChild(spanTag);
}

function updateTitle(tabId) {
  let text = "";
  switch (tabId) {
    case "country":
      text = "choose the country want to see news";
      break;

    case "category":
      text = "choose the news category";
      break;

    case "submit":
      text = "here is your choices , submit to see news";
      break;
  }

  title.textContent = text;
}

function updateDataBoxes(tabId) {
  if (tabId == "country") {
    showElements(countriesSections);
    hideElements(categoriesSections);

    submitSection.classList.add("hide");
    newsSection.classList.add("hide");
  } else if (tabId == "category") {
    hideElements(countriesSections);
    showElements(categoriesSections);

    submitSection.classList.add("hide");
    newsSection.classList.add("hide");
  } else {
    submitSection.classList.remove("hide");
    newsSection.classList.remove("hide");
    deletePrevNews();
    updateSubmitRowFields();

    hideElements(countriesSections);
    hideElements(categoriesSections);
  }
}
function showElements(elements) {
  elements.map((element) => {
    element.classList.remove("hide");
  });
}
function hideElements(elements) {
  elements.map((element) => {
    element.classList.add("hide");
  });
}

function updateNewsField(box) {
  if (box.classList.contains("country")) {
    setNewsCountry(box.lastElementChild.textContent);
  }
  if (box.classList.contains("category")) {
    setNewsCategory(box.lastElementChild.textContent);
  }
}

function setNewsCountry(country) {
  switch (country) {
    case "Argentina":
      news.country = "ar";
      break;
    case "France":
      news.country = "fr";
      break;
    case "Germany":
      news.country = "de";
      break;
    case "Italy":
      news.country = "it";
      break;
    case "UK":
      news.country = "gb";
      break;
    case "Japan":
      news.country = "jp";
      break;
    case "Portugal":
      news.country = "pt";
      break;
    case "USA":
      news.country = "us";
      break;
  }
}

function setNewsCategory(category) {
  news.category = category.toLowerCase();
}

function updateSubmitRowFields() {
  let fields = submitSection.firstElementChild.children;
  fields[0].textContent = `seleceted country : ${news.country}`;
  fields[1].textContent = `seleceted category : ${news.category}`;
}

function createSpinner() {
  let spinner = document.createElement("div");
  spinner.innerHTML = `
  <strong style="color:var(--whiteColor)">Searching ... </strong>
  <br>
  <img
  src="./assets/gif/spinner.gif"
  style="width: 120px"
  class="text-center"
  alt=""
/>`;

  return spinner;
}

function showSpinner() {
  let spinner = createSpinner();
  newsSection.appendChild(spinner);
}

function hideSpinner() {
  newsSection.firstElementChild.remove();
}

async function getNews(e) {
  if (news.category == "" && news.country == "") {
    alert("you should at least select country or category");
    return;
  }

  //disabled tabs and buttons =>
  tabs[0].disabled = true;
  tabs[1].disabled = true;
  e.target.disabled = true;

  showSpinner();

  //api//
  infos = [];
  infos = await fetchData();
  infos = infos.articles;
  //api//

  hideSpinner();

  //append news
  showNews();

  //enabled tabs and buttons =>
  tabs[0].disabled = false;
  tabs[1].disabled = false;
  e.target.disabled = false;
}

function createQuery(news) {
  let query = `https://newsapi.org/v2/top-headlines?`;
  if (news.country != "") {
    query += `country=${news.country}&`;
  }
  if (news.category != "") {
    query += `category=${news.category}&`;
  }

  query += `apiKey=${apiKey}`;

  return query;
}

async function fetchData() {
  const response = await fetch(createQuery(news));
  return response.status == 200
    ? response.json()
    : new Error(response.statusText);
}

/*
 */

function showNews() {
  const data = { title: "", description: "", image: "", url: "" };
  infos.map((info) => {
    data.description = info.description;
    data.title = info.title;
    data.url = info.url;
    data.image = info.urlToImage;

    let newsBlock = createNewsBlock(data);
    newsSection.appendChild(newsBlock);
  });

  newsSection.classList.remove("hide");
}

function createNewsBlock(data) {
  /*
        <div class="col-md-3 col-6 my-1">
          <div class="category data-box text-center p-2 deactive">

 */

  let div = createDOMelementByClass("div", "col-md-3 col-6 my-1");

  div.innerHTML = `
            <div class="news data-box text-center p-2 deactive">
            <img src=${data.image} alt="" style="width: 50%" />
            <br /><br />
            <strong>${data.title}</strong>
            <br />
            <p>${data.description}
            </p>
            <a href=${data.url}>click read full news</a>
          </div>
  `;

  return div;
}

function deletePrevNews() {
  while (newsSection.firstElementChild) {
    newsSection.remove(newsSection.firstElementChild);
  }
}
