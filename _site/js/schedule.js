function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g,'-') // replace space with dash
    .replace(/’/g,"'") // replace curly quote with straight quote
    ;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]


const gmHaunted = [
  "Proving Grounds", "The Insight Terminus",
  "Warden of Nothing", "The Corrupted",
  "The Inverted Spire", "The Arms Dealer"
]
const drops = [
  "??"
]
// const drops = [
//   "PLUG ONE.1 and Uzume RR4",
//   "THE SWARM and The Palindrome",
//   "The Comedian and Shadow Price",
//   "Hung Jury SR4 and The Hothead"
// ]


let gmStart = new Date(Date.UTC(2021, 6, 5, 17, 0, 0));
let gmEnd = new Date(Date.UTC(2022, 7, 23, 18, 0, 0));

const hauntedStart = new Date(Date.UTC(2022, 4, 24, 17, 0, 0));
const hauntedEnd = new Date(Date.UTC(2022, 7, 23, 17, 0, 0));

let currentGm;
let currentGmId;

let now = Date.now();
//let now = new Date(Date.UTC(2022, 0, 13, 17, 0, 0));


let currentDayOfSeason = toDays(now - hauntedStart);
let currentWeekOfSeason = toWeeks(now - hauntedStart);

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


function gmStartEndDates(week) {
  let daysAddedStart = week * 7;
  let daysAddedEnd = daysAddedStart + 6;

  let currentWeekStart = new Date(Date.UTC(2021, 4, 24, 17, 0, 0));
  currentWeekStart = new Date(currentWeekStart.setDate(currentWeekStart.getDate() + daysAddedStart));
  
  let currentWeekEnd = new Date(Date.UTC(2021, 4, 24, 17, 0, 0));
  currentWeekEnd = new Date(currentWeekEnd.setDate(currentWeekEnd.getDate() + daysAddedEnd));
  
  return { start: currentWeekStart, end: currentWeekEnd };
}

const getTodayId = function(week, list) {

  let arrayId = 0;
  for (i = 0; i <= week; i++) {
    if (i != arrayId) {
      if (arrayId < (list.length - 1)) {
        arrayId += 1;
      } else {
        arrayId = 0;
      }
    }
  }
  return arrayId;
}




let seasonDays = toDays(hauntedEnd - hauntedStart);
let seasonWeeks = Math.floor(seasonDays / 7);



function fillInfo() {
  let scheduleWrapper = document.querySelector('.schedule__list');

  for (n = 0; n < seasonWeeks; n++) {
    let startEndDates = gmStartEndDates(n);
    let startDate = startEndDates.start.toLocaleString('default', { month: 'short', day: 'numeric' });
    let endDate = startEndDates.end.toLocaleString('default', { month: 'short', day: 'numeric' });

    let startMonth = startEndDates.start.toLocaleString('default', { month: 'short' });
    let endMonth = startEndDates.end.toLocaleString('default', { month: 'short' });

    if (startMonth == endMonth) {
      endDate = startEndDates.end.toLocaleString('default', { day: 'numeric' });
    }
    

    let currentGm = gmHaunted[getTodayId(n, gmHaunted)];
    let currentDrop = drops[getTodayId(n, drops)];

    let newWeek = document.createElement('li');
    newWeek.classList.add('schedule__item');
    // newWeek.innerHTML = `
    //   <p class="schedule__date">${startDate} – ${endDate}</p>
    //   <p class="schedule__nf">${currentGm}</p>
    //   <p class="schedule__drop">${currentDrop}</p>
    // `;
    newWeek.innerHTML = `
      <p class="schedule__date">${startDate} – ${endDate}</p>
      <p class="schedule__nf">${currentGm}</p>
    `;
    scheduleWrapper.appendChild(newWeek);

    if ((currentWeekOfSeason - 1) == n) {
      newWeek.classList.add('schedule__item--current');
    }
  }

}
fillInfo();