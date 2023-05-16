function submitHandler(event) {
  event.preventDefault();
  resetError();
  let today = new Date();
  let flag = true;
  let d = document.getElementById("date-input").value;
  if (!d || d <= 0 || d > 31) {
    document.getElementById("date-input").parentNode.classList.add(["error"]);
    flag = false;
    if (!d)
      document.getElementById("date-msg").innerHTML =
        "<i>This field is required</i>";
    if (d)
      document.getElementById("date-msg").innerHTML =
        "<i>Must be a valid day</i>";
  }
  let m = document.getElementById("month-input").value;
  if (!m || m < 1 || m > 12) {
    document.getElementById("month-input").parentNode.classList.add(["error"]);
    flag = false;
    if (!m)
      document.getElementById("month-msg").innerHTML =
        "<i>This field is required</i>";
    if (m)
      document.getElementById("month-msg").innerHTML =
        "<i>Must be a valid month</i>";
  }

  let y = document.getElementById("year-input").value;
  if (!y || y < 1900 || y > today.getFullYear()) {
    document.getElementById("year-input").parentNode.classList.add(["error"]);
    flag = false;
    if (!y)
      document.getElementById("year-msg").innerHTML =
        "<i>This field is required</i>";
    if (y)
      document.getElementById("year-msg").innerHTML =
        "<i>Must be a valid year</i>";
  }
  if (!flag) {
    reset();
    return;
  } else {
    resetError();
  }
  let bday = new Date(y, m - 1, d);
  if (
    +bday.getFullYear() !== +y ||
    +bday.getMonth() != +m - 1 ||
    +bday.getDate() != +d
  ) {
    document
      .querySelectorAll(".block")
      .forEach((node) => node.classList.add(["error"]));
    document.getElementById("date-msg").innerHTML =
      "<i>Must be a valid date</i>";
    flag = false;
  }
  if (!flag) {
    reset();
    return;
  } else {
    resetError();
  }

  let ageYear = today.getFullYear() - bday.getFullYear();
  let ageMonth = today.getMonth() - bday.getMonth();
  let ageDays = today.getDate() - bday.getDate();

  if (ageMonth < 0 || (ageMonth == 0 && ageDays < 0)) {
    ageMonth += 12;
    ageYear--;
  }

  if (ageDays < 0) {
    let prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    console.log(prevMonth);
    ageDays += prevMonth.getDate();
    ageMonth--;
  }
  document.getElementById("years").innerHTML = ageYear;
  document.getElementById("months").innerHTML = ageMonth;
  document.getElementById("days").innerHTML = ageDays;
}

function reset() {
  document.getElementById("years").innerHTML = "--";
  document.getElementById("months").innerHTML = "--";
  document.getElementById("days").innerHTML = "--";
}

function resetError() {
  console.log("resetting error");
  document.getElementById("year-input").parentNode.classList.remove("error");
  document.getElementById("year-msg").innerHTML = "";
  document.getElementById("month-input").parentNode.classList.remove("error");
  document.getElementById("month-msg").innerHTML = "";
  document.getElementById("date-input").parentNode.classList.remove("error");
  document.getElementById("date-msg").innerHTML = "";
}
