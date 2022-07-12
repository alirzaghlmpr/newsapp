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
  submitSection = document.querySelector("#submit-row");

let currentTab = tabs[0];
const news = { country: "", category: "" };

evenetListener();
function evenetListener() {
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

    submitSection.classList.remove("hide");
  } else if (tabId == "category") {
    hideElements(countriesSections);
    showElements(categoriesSections);

    submitSection.classList.remove("hide");
  } else {
    submitSection.classList.remove("hide");
    updateSubmitRowFields();

    hideElements(countriesSections);
    hideElements(categoriesSections);
  }
}
function showElements(elements) {
  elements.map((element) => {
    element.classList.remove("hide");
    element.classList.add("show");
  });
}
function hideElements(elements) {
  elements.map((element) => {
    element.classList.remove("show");
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
  console.log(news.category);
}

function updateSubmitRowFields() {
  let fields = submitSection.firstElementChild.children;
  fields[0].textContent = `seleceted country : ${news.country}`;
  fields[1].textContent = `seleceted category : ${news.category}`;
}
