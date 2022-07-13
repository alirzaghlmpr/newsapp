export function deactiveAllTabsExcludeSelected(e, tabs) {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i] == e) {
      continue;
    }
    tabs[i].classList.add("deactive");
    tabs[i].classList.remove("active");
  }
}

export function createDOMelementByClass(tagName, ...classList) {
  let tag = document.createElement(tagName);
  if (classList != "") {
    tag.classList = "";
    classList.map((item) => {
      tag.classList += item;
    });
  }

  return tag;
}

export function deactiveAllExcludeSeleceted(e, identifier, dataBoxes) {
  for (let i = 0; i < dataBoxes.length; i++) {
    if (dataBoxes[i] == e) {
      continue;
    }

    if (dataBoxes[i].classList.contains(identifier)) {
      dataBoxes[i].classList.remove("active");
      dataBoxes[i].classList.add("deactive");
      if (dataBoxes[i].lastElementChild.classList.contains("selected")) {
        dataBoxes[i].lastElementChild.remove();
      }
    }
  }
}

export function addCheckmarkToBox(box) {
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

export function updateTitle(tabId, titleTag) {
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

  titleTag.textContent = text;
}

export function showElements(elements) {
  elements.map((element) => {
    element.classList.remove("hide");
  });
}

export function hideElements(elements) {
  elements.map((element) => {
    element.classList.add("hide");
  });
}

export function createSpinner() {
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

export function createQuery(news, apiKey) {
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

export function showNews(newsSection, infos) {
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

export function setNewsCountry(country, news) {
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

export function setNewsCategory(category, news) {
  news.category = category.toLowerCase();
}
