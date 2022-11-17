const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
// API nyckel att använda ifall man enbart siktar på godkänt: solaris-vKkkQHqQboi7c6JF
const header   = document.querySelector(`header`);
const headH1   = document.querySelector(`header, h1`)
const main     = document.querySelector(`main`);
const planets  = document.querySelectorAll(`aside`);
const article  = document.querySelector(`article`);
const btn      = document.querySelector(`button`);
let template   = ``;
btn.classList.add(`hide`); //gömmer knappen tills man klickar på en planet

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
    console.log(data);
}

async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': 'solaris-vKkkQHqQboi7c6JF'
        }
    });



    const data = await response.json();
    console.log(data);

    for (let i = 0; i < planets.length; i++){
        planets[i].addEventListener(`click`, async () => {
        article.classList.add(`hide`);
        header.classList.add(`hide`);
        btn.classList.remove(`hide`);
    
    console.log(planets);

        console.log(`its a planet`)

        template = `
        <article class ="planetOpt">
        <div class="planetInfo">
           <h1 id="infoH1">${data.bodies[i].name}</h1>
           <h2 id="infoH2">${data.bodies[i].latinName}</h2>
           <p id="infoP">${data.bodies[i].desc}</p>
           <hr />
        </div>
        <div class ="planetDesc">
           <h2 id="descH2">Omkrets:</h2>
           <p id="descP">${data.bodies[i].circumference}</p>
           <h2 id="descH2">KM från solen:</h2>
           <p id="descP">${data.bodies[i].distance}</p>
           <hr />
        </div>
        <div class ="planetTemp">
           <h2 id="tempH2">Max temp:</h2>
           <p id="tempP">${data.bodies[i].temp.day}</p>
           <h2 id="tempH2">Min temp:</h2>
           <p id="tempP">${data.bodies[i].temp.night}</p>
           <hr / id="tempHR">
        </div>
        <div class ="planetMoons">
           <h2 id="moonsH2">Månar:</h2>
           <p id="moonsP">${data.bodies[i].moons.join(`, `)}</p>
        </div>

        <div id ="planetCircle" class="${data.bodies[i].name}"></div>

        </article>
        `
   
    main.insertAdjacentHTML(`beforeend`, template)
  })  
 };
}

    getKey();
    getPlanets();

    btn.addEventListener(`click`, () => {
        document.querySelector(`.planetOpt`).remove()
        article.classList.remove(`hide`)  
        header.classList.remove(`hide`)
        btn.classList.add(`hide`);  
      
    })
