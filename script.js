const daysText = document.getElementById("days");
const monthsText = document.getElementById("months");
const yearsText = document.getElementById("years");
const errorOne = document.getElementById("error_one");
const errorTwo = document.getElementById("error_two");
const errorThree = document.getElementById("error_three");
const error_1 = document.getElementById("error_1");
const error_2 = document.getElementById("error_2");
const error_3 = document.getElementById("error_3");

const arrow = document.getElementById("arrow");

const calculateAge = () => {
  const days = document.getElementById("day").value;
  const months = document.getElementById("month").value;
  const years = document.getElementById("year").value;
  const currentYear = new Date().getFullYear();

  // Reset error messages
  errorOne.style.display = "none";
  errorTwo.style.display = "none";
  errorThree.style.display = "none";
  error_1.style.display = "none";
  error_2.style.display = "none";
  error_3.style.display = "none";

  // Array to hold the maximum number of days in each month
  const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  if ((years % 4 == 0 && years % 100 != 0) || years % 400 == 0) {
    maxDaysInMonth[1] = 29; // February has 29 days in a leap year
  }

  // Validate input
  if (
    days === "" ||
    months === "" ||
    years === "" ||
    isNaN(days) ||
    isNaN(months) ||
    isNaN(years)
  ) {
    if (days === "" || isNaN(days)) {
      errorOne.style.display = "inline";
    }
    if (months === "" || isNaN(months)) {
      errorTwo.style.display = "inline";
    }
    if (years === "" || isNaN(years)) {
      errorThree.style.display = "inline";
    }
    return; // Return early if any input is invalid
  }

  // Parse the input values as integers
  const daysInt = parseInt(days);
  const monthsInt = parseInt(months);
  const yearsInt = parseInt(years);

  if (monthsInt > 12) {
    error_2.style.display = "inline";
    return; // Return early if month is invalid
  }

  if (yearsInt > currentYear || yearsInt < 1900) {
    error_3.style.display = "inline";
    return; // Return early if year is invalid
  }
  if (days > maxDaysInMonth[months - 1]) {
    error_2.style.display = "inline";
  } else {
    const currentDate = new Date();
    const birthDate = new Date(years, months - 1, days);

    let age = {};

    // Calculate years
    age.years = currentDate.getFullYear() - birthDate.getFullYear();

    // Calculate months
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age.years--;
      monthDiff += 12;
    }
    age.months = monthDiff;

    // Calculate days
    let dayDiff = currentDate.getDate() - birthDate.getDate();
    if (dayDiff < 0) {
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      dayDiff += lastDayOfMonth;
      age.months--;
    }
    age.days = dayDiff;

    // Output the age to the respective elements
    daysText.textContent = age.days;
    monthsText.textContent = age.months;
    yearsText.textContent = age.years;
  }
};

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Add event listeners to the input fields
dayInput.addEventListener("input", hideErrors);
monthInput.addEventListener("input", hideErrors);
yearInput.addEventListener("input", hideErrors);

function hideErrors() {
  errorOne.style.display = "none";
  errorTwo.style.display = "none";
  errorThree.style.display = "none";
  error_1.style.display = "none";
  error_2.style.display = "none";
  error_3.style.display = "none";
}

arrow.onclick = () => {
  calculateAge();
};
