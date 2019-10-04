"use strict";
var gh = new GitHub({
    token: 'b4eff74db53c9f3279ab41df31aafc90a8fdc9cc'
});
var podcast = gh.getRepo('inidaname', 'podcast');
podcast.getContributors();
console.log(podcast.getCollaborators());
var broadcast;
var frequency;
var myRequest = new Request('./data/podcasts.json');
var categories = new Promise(function (resolve, reject) {
    fetch(myRequest)
        .then(function (response) {
        return response.json();
    })
        .then(function (response) {
        var newCategory = [];
        var finalCategory = [];
        var lanCat = [];
        var langFinal = [];
        var dayCat = [];
        var dayFinal = [];
        var freqCat = [];
        var freqFinal = [];
        response.map(function (obj) {
            var cat = obj.category.split(',').map(function (v) { return v.trim().toLowerCase(); });
            var lang = obj.languages.split(',').map(function (v) { return v.trim().toLowerCase(); });
            var days = obj.broadcast.split(',').map(function (v) { return v.trim().toLowerCase(); });
            var freq = obj.updates.split(',').map(function (v) { return v.trim().toLowerCase(); });
            newCategory.push.apply(newCategory, cat);
            lanCat.push.apply(lanCat, lang);
            freqCat.push.apply(freqCat, freq);
            dayCat.push.apply(dayCat, days);
        });
        newCategory.map(function (v) {
            if (v.length !== 0 && finalCategory.indexOf(v) < 0) {
                finalCategory.push(v);
            }
        });
        lanCat.map(function (v) {
            if (v.length !== 0 && langFinal.indexOf(v) < 0) {
                langFinal.push(v);
            }
        });
        dayCat.map(function (v) {
            if (v.length !== 0 && dayFinal.indexOf(v) < 0) {
                dayFinal.push(v);
            }
        });
        freqCat.map(function (v) {
            if (v.length !== 0 && freqFinal.indexOf(v) < 0) {
                freqFinal.push(v);
            }
        });
        var podCastList = [finalCategory, langFinal, dayFinal, freqFinal];
        if (podCastList) {
            return resolve({ podCastList: podCastList, response: response });
        }
        else {
            return reject('Empty Pod cast');
        }
    });
});
categories.then(function (res) {
    var re = res.podCastList;
    var category = document.createElement('ul');
    re[0].map(function (v, i) {
        var theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', function (event) {
            console.log(event);
        });
        return category.appendChild(theChildren);
    }).join(' ');
    var cat = document.getElementById('category');
    cat.appendChild(category);
    var languages = document.createElement('ul');
    re[1].map(function (v, i) {
        var theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', function (event) {
            console.log(event);
        });
        return languages.appendChild(theChildren);
    }).join(' ');
    var lang = document.getElementById('language');
    lang.appendChild(languages);
    var releaseDays = document.createElement('ul');
    re[3].map(function (v, i) {
        var theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', function (event) {
            console.log(event);
        });
        return releaseDays.appendChild(theChildren);
    }).join(' ');
    var day = document.getElementById('broadcast');
    day.appendChild(releaseDays);
    var frquencies = document.createElement('ul');
    re[2].map(function (v, i) {
        var theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', function (event) {
            var events = event.target;
            console.log(re[2][i]);
        });
        return frquencies.appendChild(theChildren);
    }).join(' ');
    var freq = document.getElementById('frequency');
    freq.appendChild(frquencies);
    var contents = res.response;
    var podcastEl = document.createElement('ul');
    podcastEl.classList.add('podcast');
    contents.map(function (v, i) {
        var mainURL = (v.url !== undefined && v.url.substring(0, 4) !== 'http') ? "http://" + v.url : v.url;
        var listBe = "\n        <a href=\"" + mainURL + "\" target=\"_blank\">\n            <li class=\"podList\">\n                <div>\n                    <h3> " + v.name + " </h3>\n                    <img src=\"" + v.logo + "\" alt=\"" + v.name + "\">\n                    <ul>\n                        <li>\n                            <strong>Host Name:</strong> <br> " + v.host + "\n                        </li>\n                        <li>\n                            <strong>Description:</strong> <br> " + v.description + "\n                        </li>\n                        <li>\n                            <span><strong>Updates:</strong>" + v.updates + "</span>\n                             <span><strong>Release:</strong>\n                             " + v.broadcast + "</span>\n                        </li>\n                        <li>\n                            <strong>Category:</strong> <br> " + v.category + "\n                        </li>\n                        <li>\n                            <strong>Language:</strong> <br> " + v.languages + "\n                        </li>\n                    </ul>\n                </div>\n            </li>\n        </a>\n        ";
        return podcastEl.append(document.createRange().createContextualFragment(listBe));
    }).join(' ');
    var mainList = document.getElementById('mainList');
    mainList.appendChild(podcastEl);
})
    .catch(function (reason) {
    console.log(reason);
});
var listMenu = document.querySelectorAll('#sideContent li');
var nullMe;
var listTrig;
listMenu.forEach(function (el) {
    el.addEventListener('click', function (ev) {
        listMenu.forEach(function (e) {
            if (e.getAttribute('id') !== ev.target.attributes.getNamedItem('id').value) {
                e.style.opacity = '0';
                e.children[0].style.opacity = '0';
                e.children[0].style.height = '0px';
                e.children[0].style.overFlow = 'none';
                e.classList.remove('checkMe');
            }
            else {
                if (e.classList.contains('checkMe')) {
                    e.classList.remove('checkMe');
                    el.style.opacity = '1';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.overFlow = 'none';
                    e.children[0].style.height = '0px';
                }
                else {
                    e.classList.add('checkMe');
                    e.style.opacity = '1';
                    e.children[0].style.opacity = '1';
                    e.children[0].style.height = '400px';
                    e.children[0].style.overFlow = 'block';
                }
            }
        });
    });
});
function openNav() {
    console.log();
}
