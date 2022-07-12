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
  ];

let currentTab = tabs[0];

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

function deactiveAllTabsExcludeSelected(e) {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i] == e) {
      continue;
    }
    tabs[i].classList.add("deactive");
    tabs[i].classList.remove("active");
  }
}

dataBoxes.forEach(function (box) {
  box.addEventListener("click", function (e) {
    deactiveAllExcludeSeleceted(e);
    box.classList.add("active");
    box.classList.remove("deactive");
    addCheckmarkToBox(box);
  });
});

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
  let boxesTabBaseIdentifier = currentTab.id;

  for (let i = 0; i < dataBoxes.length; i++) {
    if (dataBoxes[i] == e) {
      continue;
    }

    if (dataBoxes[i].classList.contains(boxesTabBaseIdentifier)) {
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
    countriesSections.map((section) => {
      section.classList.remove("hide");
      section.classList.add("show");

      categoriesSections.map((section) => {
        section.classList.remove("show");
        section.classList.add("hide");
      });
    });
  } else if (tabId == "category") {
    countriesSections.map((section) => {
      section.classList.remove("show");
      section.classList.add("hide");
    });

    categoriesSections.map((section) => {
      section.classList.remove("hide");
      section.classList.add("show");
    });
  } else {
    console.log("3");
  }
}
