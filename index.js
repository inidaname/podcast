"use strict";
let broadcast;
let frequency;
const myRequest = new Request('./data/podcasts.json');
let categories = new Promise((resolve, reject) => {
    fetch(myRequest)
        .then(function (response) {
        return response.json();
    })
        .then(function (response) {
        let newCategory = [];
        let finalCategory = [];
        let lanCat = [];
        let langFinal = [];
        let dayCat = [];
        let dayFinal = [];
        let freqCat = [];
        let freqFinal = [];
        response.map((obj) => {
            let cat = obj.category.split(',').map((v) => v.trim().toLowerCase());
            let lang = obj.languages.split(',').map((v) => v.trim().toLowerCase());
            let days = obj.broadcast.split(',').map((v) => v.trim().toLowerCase());
            let freq = obj.updates.split(',').map((v) => v.trim().toLowerCase());
            newCategory.push(...cat);
            lanCat.push(...lang);
            freqCat.push(...freq);
            dayCat.push(...days);
        });
        newCategory.map((v) => {
            if (v.length !== 0 && finalCategory.indexOf(v) < 0) {
                finalCategory.push(v);
            }
        });
        lanCat.map((v) => {
            if (v.length !== 0 && langFinal.indexOf(v) < 0) {
                langFinal.push(v);
            }
        });
        dayCat.map((v) => {
            if (v.length !== 0 && dayFinal.indexOf(v) < 0) {
                dayFinal.push(v);
            }
        });
        freqCat.map((v) => {
            if (v.length !== 0 && freqFinal.indexOf(v) < 0) {
                freqFinal.push(v);
            }
        });
        let podCastList = [finalCategory, langFinal, dayFinal, freqFinal];
        if (podCastList) {
            return resolve({ podCastList, response });
        }
        else {
            return reject('Empty Pod cast');
        }
    });
});
categories.then((res) => {
    let re = res.podCastList;
    let category = document.createElement('ul');
    re[0].map((v, i) => {
        let theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', (event) => {
            console.log(event);
        });
        return category.appendChild(theChildren);
    }).join(' ');
    let cat = document.getElementById('category');
    cat.appendChild(category);
    let languages = document.createElement('ul');
    re[1].map((v, i) => {
        let theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', (event) => {
            console.log(event);
        });
        return languages.appendChild(theChildren);
    }).join(' ');
    let lang = document.getElementById('language');
    lang.appendChild(languages);
    let releaseDays = document.createElement('ul');
    re[3].map((v, i) => {
        let theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', (event) => {
            console.log(event);
        });
        return releaseDays.appendChild(theChildren);
    }).join(' ');
    let day = document.getElementById('broadcast');
    day.appendChild(releaseDays);
    let frquencies = document.createElement('ul');
    re[2].map((v, i) => {
        let theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', (event) => {
            let events = event.target;
            console.log(re[2][i]);
        });
        return frquencies.appendChild(theChildren);
    }).join(' ');
    let freq = document.getElementById('frequency');
    freq.appendChild(frquencies);
    let contents = res.response;
    console.log(contents);
})
    .catch((reason) => {
    console.log(reason);
});
const listMenu = document.querySelectorAll('#sideContent li');
let nullMe;
let listTrig;
listMenu.forEach((el) => {
    el.addEventListener('click', (ev) => {
        listMenu.forEach((e) => {
            if (e.getAttribute('id') !== ev.target.attributes.getNamedItem('id').value) {
                e.children[0].style.opacity = '0';
                e.children[0].style.height = '0px';
                e.classList.remove('checkMe');
            }
            else {
                if (e.classList.contains('checkMe')) {
                    e.classList.remove('checkMe');
                    e.children[0].style.opacity = '0';
                    e.children[0].style.height = '0px';
                }
                else {
                    e.classList.add('checkMe');
                    e.children[0].style.opacity = '1';
                    e.children[0].style.height = '400px';
                }
            }
        });
    });
});
function openNav() {
    let sideBar = document.getElementById('sideBar');
    sideBar.style.width = "300px";
    let main = document.getElementById('main');
    main.style.marginLeft = "300px";
}
function closeNav() {
    let sideBar = document.getElementById('sideBar');
    sideBar.style.width = "0px";
    let main = document.getElementById('main');
    main.style.marginLeft = "0px";
}
