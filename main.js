let startDate;
let total_hours = 0;

// Function to get the time difference which then is added to total work hours

function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);

  if (hours < 0) hours = hours + 24;

  return (
    (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes
  );
}

// Upon Button click get the date and append the required inputs to the next form

document.querySelector("#date-next").addEventListener("click", function (e) {
  e.preventDefault();
  startDate = new Date(document.querySelector("#from").value);

  let tempDate = startDate;
  let output = ``; // Output is used to dynamically append inputs

  for (i = 0; i < 7; i++) {
    const date = startDate;
    const month = date.toLocaleString("default", {
      weekday: "short",
      month: "short",
    });
    // The input for time, this way is extensible as long as the number of inputs dont exceed a large amount making the for loop slow
    output += `<div class="input-container">
    <div class="date">${startDate.getDate()} ${month}</div>
      <input type="time" name="time${i + 1}" id="time${i + 1}">
      <span class="to">to</span>
      <input type="time" name="time${i + 1}end" id="time${i + 1}end">
    </div>`;
    startDate.setDate(tempDate.getDate() + 1);
  }

  //Append all inputs with date to the buffer
  document.querySelector(".input-buffer").innerHTML = output;

  document.querySelector(".date-form").classList.add("hide"); // Hide date form
  document.querySelector(".time-form").classList.remove("hide"); // Show Time Form
});

// Upon Button Click get input data and calculate total work hours

document.querySelector("#get-total").addEventListener("click", function (e) {
  e.preventDefault();
  let total_hours = 0;
  let total_minutes = 0;
  for (i = 0; i < 7; i++) {
    const from_time = document.querySelector(`#time${i + 1}`).value; //Get start time
    const to_time = document.querySelector(`#time${i + 1}end`).value; //Get end time
    const timeDiff = diff(from_time, to_time); //Get time diff
    total_hours += parseInt(timeDiff.split(":")[0]); //Split and get total hours
    total_minutes += parseInt(timeDiff.split(":")[1]); //Split and get total minutes
  }

  //Append total work hours to the buffer
  document.querySelector(
    ".total-buffer"
  ).innerHTML = `<h2> Total hours of work this week: ${total_hours} hours, ${total_minutes} minutes </h2>`;
});

module.exports = diff; //export diff function for testing
