const gmList = [
  "The Hollowed Lair", "Lake of Shadows", "Exodus Crash", "The Corrupted", "The Devils' Lair", "Proving Grounds"
]
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
let gmStart = new Date(Date.UTC(2021, 9, 5, 17, 0, 0));
let gmEnd = new Date(Date.UTC(2021, 1, 22, 18, 0, 0));

let now = Date.now();

let currentDay = toDays(now - gmStart);
let currentWeek = toWeeks(now - gmStart);

function toDays(x) {
  x = x / 1000 / 60 / 60 / 24;
  x = Math.floor(x + 1);
  return x;
}
function toWeeks(x) {
  x = x / 1000 / 60 / 60 / 24 / 7;
  x = Math.floor(x + 1);
  return x;
}



const getTodayId = function(x) {

  let arrayId = 0;
  for (i = 1; i <= currentWeek; i++) {
    if (i != arrayId) {
      if (arrayId < x.length) {
        arrayId += 1;
      } else {
        arrayId = 1;
      }
    }
  }
  arrayId -= 1;
  return arrayId;
}

currentGm = gmList[getTodayId(gmList)];
console.log(`It's currently week ${currentWeek} and the GM is ${currentGm}.`);


function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// console.log(addDays(gmStart, 14));

let cardDate = document.querySelectorAll('.nf-card__note');

function fillDates() {

  for (i = 0; i < gmList.length; i++) {
    let currentWeekStart = addDays(gmStart, (7 * (currentWeek - 1)));
    let currentWeekEnd = addDays(gmStart, ((7 * currentWeek) - 1));

    cardDate[i].textContent = `
      ${months[currentWeekStart.getUTCMonth()]} ${currentWeekStart.getUTCDate()} – ${months[currentWeekEnd.getUTCMonth()]} ${currentWeekEnd.getUTCDate()}
    `;

    currentWeek += 1;
  }
}

fillDates();