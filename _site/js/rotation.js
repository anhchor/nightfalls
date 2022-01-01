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

const drops = [
  "PLUG ONE.1 and Uzume RR4",
  "THE SWARM and The Palindrome",
  "The Comedian and Shadow Price",
  "Hung Jury SR4 and The Hothead"
]

let gmList;
let gmStart = new Date(Date.UTC(2021, 9, 5, 17, 0, 0));
let gmEnd = new Date(Date.UTC(2022, 1, 22, 18, 0, 0));
let currentGm;
let currentGmId;

let now = Date.now();
// let now = new Date(Date.UTC(2022, 0, 13, 17, 0, 0));


let currentDayOfSeason = toDays(now - gmStart);
let currentWeekOfSeason = toWeeks(now - gmStart);

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


function gmStartEndDates() {
  let daysAddedStart = (currentWeekOfSeason - 1) * 7;
  let daysAddedEnd = daysAddedStart + 6;

  let currentWeekStart = new Date(Date.UTC(2021, 9, 5, 17, 0, 0));
  currentWeekStart = new Date(currentWeekStart.setDate(currentWeekStart.getDate() + daysAddedStart));
  
  let currentWeekEnd = new Date(Date.UTC(2021, 9, 5, 17, 0, 0));
  currentWeekEnd = new Date(currentWeekEnd.setDate(currentWeekEnd.getDate() + daysAddedEnd));
  
  return { start: currentWeekStart, end: currentWeekEnd };
}

const getTodayId = function(week, list) {

  let arrayId = 0;
  for (i = 1; i <= week; i++) {
    if (i != arrayId) {
      if (arrayId < list.length) {
        arrayId += 1;
      } else {
        arrayId = 1;
      }
    }
  }
  arrayId -= 1;
  return arrayId;
}



function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// console.log(addDays(gmStart, 14));

let cardDate = document.querySelectorAll('.nf-card__note');

function fillDates() {

  for (i = 0; i < gmList.length; i++) {
    let currentWeekOfSeasonStart = addDays(gmStart, (7 * (currentWeekOfSeason - 1)));
    let currentWeekOfSeasonEnd = addDays(gmStart, ((7 * currentWeekOfSeason) - 1));

    cardDate[i].textContent = `
      ${months[currentWeekOfSeasonStart.getUTCMonth()]} ${currentWeekOfSeasonStart.getUTCDate()} – ${months[currentWeekOfSeasonEnd.getUTCMonth()]} ${currentWeekOfSeasonEnd.getUTCDate()}
    `;

    currentWeekOfSeason += 1;
  }
}




const nfTitle = document.querySelector('.nf__name');
const nfChampions = document.querySelector('.nf__champions');
const nfShields = document.querySelector('.nf__shields');
const nfExcerpt = document.querySelector('.nf__excerpt');

function fillInfo() {
  nfTitle.innerText = gmList[currentGmId].name;
  nfExcerpt.innerText = gmList[currentGmId].excerpt;

  let nfDates = document.querySelector('.nf__dates');
  let nfDatesInfo = gmStartEndDates();
  let nfDatesStart = nfDatesInfo.start.toLocaleString('default', { month: 'short', day: 'numeric' });
  let nfDatesEnd = nfDatesInfo.end.toLocaleString('default', { month: 'short', day: 'numeric' });
  nfDates.textContent = `
    Current Nightfall → ${nfDatesStart} to ${nfDatesEnd}
  `;

  let nfDrop = document.querySelector('.nf__drops');
  nfDrop.innerHTML = `
    <strong>Drops</strong>: ${currentDrop}
  `;

  for (i = 0; i < gmList[currentGmId].champions.length; i++) {
    let newChampion = document.createElement('span');
    newChampion.classList.add('home-nf__meta-item');
    newChampion.innerHTML = `
      <img src="/svg/${gmList[currentGmId].champions[i].name}.svg" alt=""> ${gmList[currentGmId].champions[i].name}
    `;
    nfChampions.appendChild(newChampion);
  }

  for (i = 0; i < gmList[currentGmId].shields.length; i++) {
    let newShield = document.createElement('span');
    newShield.classList.add('home-nf__meta-item');
    newShield.innerHTML = `
      <img src="/svg/${gmList[currentGmId].shields[i].element}.svg" alt=""> ${gmList[currentGmId].shields[i].element}
    `;
    nfShields.appendChild(newShield);
  }

  let nfImage = document.querySelector('.nf__image');
  nfImage.innerHTML = `
    <img src="/img/${gmList[currentGmId].image}" alt="${gmList[currentGmId].boss}">
    <figcaption>${gmList[currentGmId].boss}</figcaption>
  `;

  let nfLink = document.querySelector('.nf__link');
  let nfSlug = toSlug(gmList[currentGmId].name);
  nfLink.setAttribute('href', `/nightfalls/${nfSlug}`);
}




fetch('/js/gm_s15.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        gmList = data;
        currentGmId = getTodayId(currentWeekOfSeason, gmList);
        currentGm = gmList[currentGmId].name;
        currentDropId = getTodayId(currentWeekOfSeason, drops);
        currentDrop = drops[currentDropId];

        fillInfo();

        
        console.log(`It's currently week ${currentWeekOfSeason} and the GM is ${currentGm} (${currentGmId}) and drops ${currentDrop}.`);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
