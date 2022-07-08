function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g,'-') // replace space with dash
    .replace(/’/g,"") // remove curly quote
    .replace(/'/g,"") // remove straight quote
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
  "PLUG ONE.1 and Uzume RR4",
  "THE SWARM and The Palindrome",
  "The Comedian and Shadow Price",
  "Hung Jury SR4 and The Hothead"
]

let gmList;

const hauntedStart = new Date(Date.UTC(2022, 4, 24, 17, 0, 0));
const hauntedEnd = new Date(Date.UTC(2022, 7, 23, 17, 0, 0));

let currentGm;
let currentGmId;

let now = Date.now();
// let now = new Date(Date.UTC(2022, 0, 13, 17, 0, 0));


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


function gmStartEndDates() {
  let daysAddedStart = (currentWeekOfSeason - 1) * 7;
  let daysAddedEnd = daysAddedStart + 6;

  let currentWeekStart = new Date(Date.UTC(2022, 4, 24, 17, 0, 0));
  currentWeekStart = new Date(currentWeekStart.setDate(currentWeekStart.getDate() + daysAddedStart));
  
  let currentWeekEnd = new Date(Date.UTC(2022, 4, 24, 17, 0, 0));
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



const nfTitle = document.querySelector('.nf__name');
const nfChampions = document.querySelector('.nf__champions');
const nfShields = document.querySelector('.nf__shields');
const nfBurn = document.querySelector('.nf__burn');
const nfExcerpt = document.querySelector('.nf__excerpt');

function fillInfo(today) {
  nfTitle.innerText = today.name;
  nfExcerpt.innerText = today.excerpt;

  let nfDates = document.querySelector('.nf__dates');
  let nfDatesInfo = gmStartEndDates();
  let nfDatesStart = nfDatesInfo.start.toLocaleString('default', { month: 'short', day: 'numeric' });
  let nfDatesEnd = nfDatesInfo.end.toLocaleString('default', { month: 'short', day: 'numeric' });
  nfDates.textContent = `
    Current Nightfall → ${nfDatesStart} to ${nfDatesEnd}
  `;



  for (i = 0; i < today.champions.length; i++) {
    let newChampion = document.createElement('span');
    newChampion.classList.add('home-nf__meta-item');
    newChampion.innerHTML = `
      <img src="/svg/${today.champions[i].name}.svg" alt=""> ${today.champions[i].name}
    `;
    nfChampions.appendChild(newChampion);
  }

  for (i = 0; i < today.shields.length; i++) {
    let newShield = document.createElement('span');
    newShield.classList.add('home-nf__meta-item');
    newShield.innerHTML = `
       <img src="/svg/${today.shields[i].element}.svg" alt=""> ${today.shields[i].element}
    `;
    nfShields.appendChild(newShield);
  }

  let newBurn = document.createElement('span');
  newBurn.classList.add('home-nf__meta-item');
  newBurn.innerHTML = `
       <img src="/svg/${today.burn}.svg" alt=""> ${today.burn}
    `;
  nfBurn.appendChild(newBurn);

  let nfImage = document.querySelector('.nf__image');
  nfImage.innerHTML = `
    <img src="/img/${today.image}" alt="${today.boss}">
    <figcaption>${today.boss}</figcaption>
  `;

  // let nfLink = document.querySelector('.nf__link');
  // let nfSlug = toSlug(today.name);
  // nfLink.setAttribute('href', `/nightfalls/${nfSlug}`);
}





fetch('/js/gm.json')
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
        currentGmId = getTodayId(currentWeekOfSeason, gmHaunted);
        currentGm = gmHaunted[currentGmId];
        currentDropId = getTodayId(currentWeekOfSeason, drops);
        currentDrop = drops[currentDropId];

        for (j = 0; j < gmList.length; j++) {
          if (currentGm == gmList[j].name) {
            let today = gmList[j];
            fillInfo(today);
          }
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
