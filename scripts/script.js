const countries = document.querySelectorAll(".country");
countries.forEach(function (country) {
  country.addEventListener("click", function (e) {
    deactiveAllExcludeSeleceted(e);
    country.classList.add("active");
    country.classList.remove("deactive");
  });
});

function deactiveAllExcludeSeleceted(e) {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i] == e) {
      continue;
    }
    countries[i].classList.remove("active");
    countries[i].classList.add("deactive");
  }
}
