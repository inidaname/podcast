var gh = new GitHub({
    token: 'b4eff74db53c9f3279ab41df31aafc90a8fdc9cc'
  });


  const podcast = gh.getRepo('inidaname', 'podcast');

  podcast.getContributors()
  console.log(podcast.getCollaborators())

let broadcast: Array<string>;
let frequency: Array<string>;

const myRequest = new Request('/data/podcasts.json');

let categories: Promise<Array<any>> = new Promise((resolve: any, reject:any) => {
    fetch(myRequest)
        .then(function (response:Response) {
            return response.json();
        })
        .then(function (response: any[]) {
            let newCategory: any = [];
            let finalCategory: any = [];
            let lanCat: any = [];
            let langFinal: any = [];
            let dayCat: any = [];
            let dayFinal: any = [];
            let freqCat: any = [];
            let freqFinal: any = [];
            response.map((obj: any) => {
                let cat = obj.category.split(',').map((v: string) => v.trim().toLowerCase());
                let lang = obj.languages.split(',').map((v: string) => v.trim().toLowerCase());
                let days = obj.broadcast.split(',').map((v: string) => v.trim().toLowerCase());
                let freq = obj.updates.split(',').map((v: string) => v.trim().toLowerCase());
                    newCategory.push(...cat);
                    lanCat.push(...lang)
                    freqCat.push(...freq)
                    dayCat.push(...days)
            });

            newCategory.map((v:string) => {
                if (v.length !== 0 && finalCategory.indexOf(v) < 0){
                    finalCategory.push(v);
                }
            });

            lanCat.map((v:string)=> {
                if (v.length !== 0 && langFinal.indexOf(v) < 0) {
                    langFinal.push(v)
                }
            })
            dayCat.map((v:string)=> {
                if (v.length !== 0 && dayFinal.indexOf(v) < 0) {
                    dayFinal.push(v)
                }
            })
            freqCat.map((v:string)=> {
                if (v.length !== 0 && freqFinal.indexOf(v) < 0) {
                    freqFinal.push(v)
                }
            })
            let podCastList: Array<any> = [finalCategory, langFinal, dayFinal, freqFinal];

            if(podCastList){
                return resolve({podCastList, response});
            } else {
                return reject('Empty Pod cast')
            }
        });
});

categories.then((res: any) => {
    let re = res.podCastList;

    //pupolating categories
    let category: Node = document.createElement('ul')
        re[0].map((v: any, i: number) => {
            let theChildren = document.createElement('li')
            theChildren.appendChild(document.createTextNode(v.toUpperCase()));
            theChildren.setAttribute('class', 'subMenu');
            theChildren.addEventListener('click', (event) => {
                console.log(event)
            })
            return category.appendChild(theChildren);
        }).join(' ')
        let cat: any = document.getElementById('category');
        cat.appendChild(category);

        // pupolating laguages
    let languages: Node = document.createElement('ul')
        re[1].map((v: any, i: number) => {
            let theChildren = document.createElement('li');
            theChildren.appendChild(document.createTextNode(v.toUpperCase()));
            theChildren.setAttribute('class', 'subMenu');
            theChildren.addEventListener('click', (event) => {
                console.log(event)
            })
            return languages.appendChild(theChildren);
        }).join(' ')
        let lang: any = document.getElementById('language');
        lang.appendChild(languages);

        // pupolating release days
    let releaseDays: Node = document.createElement('ul')
        re[3].map((v: any, i: number) => {
            let theChildren = document.createElement('li')
            theChildren.appendChild(document.createTextNode(v.toUpperCase()));
            theChildren.setAttribute('class', 'subMenu');
            theChildren.addEventListener('click', (event) => {
                console.log(event)
            })
            return releaseDays.appendChild(theChildren);
        }).join(' ')
        let day: any = document.getElementById('broadcast');
        day.appendChild(releaseDays);

        // pupolating frequencies
    let frquencies: HTMLUListElement = document.createElement('ul')
        re[2].map((v: any, i: number) => {
            let theChildren: HTMLLIElement = document.createElement('li');
            theChildren.appendChild(document.createTextNode(v.toUpperCase()))
            theChildren.setAttribute('class', 'subMenu');
            theChildren.addEventListener('click', (event: MouseEvent) => {
                let events: any = event.target;
                console.log(re[2][i])
            })
            return frquencies.appendChild(theChildren);
        }).join(' ')
        let freq: any = document.getElementById('frequency');
        freq.appendChild(frquencies);

    const contents: Array<object> = res.response;
    let podcastEl: HTMLUListElement = document.createElement('ul');
    podcastEl.classList.add('podcast')
    contents.map((v: any, i: number) => {
        let mainURL = (v.url !== undefined && v.url.substring(0, 4) !== 'http')? `http://${v.url}` : v.url;
        let listBe = `
        <a href="${mainURL}" target="_blank">
            <li class="podList">
                <div>
                    <h3> ${v.name} </h3>
                    <img src="${v.logo}" alt="${v.name}">
                    <ul>
                        <li>
                            <strong>Host Name:</strong> <br> ${v.host}
                        </li>
                        <li>
                            <strong>Description:</strong> <br> ${v.description}
                        </li>
                        <li>
                            <span><strong>Updates:</strong>${v.updates}</span>
                             <span><strong>Release:</strong>
                             ${v.broadcast}</span>
                        </li>
                        <li>
                            <strong>Category:</strong> <br> ${v.category}
                        </li>
                        <li>
                            <strong>Language:</strong> <br> ${v.languages}
                        </li>
                    </ul>
                </div>
            </li>
        </a>
        `
        return podcastEl.append(document.createRange().createContextualFragment(listBe));
    }).join(' ');
    let mainList: any = document.getElementById('mainList');
    mainList.appendChild(podcastEl);
})
.catch((reason: any) => {
    console.log(reason);
});

const listMenu: NodeListOf<Element> = document.querySelectorAll('#sideContent li');
let nullMe: boolean;
let listTrig: boolean;
listMenu.forEach((el: Element) => {
    el.addEventListener('click', (ev: any) => {
        listMenu.forEach((e: any) => {
            if (e.getAttribute('id') !== ev.target.attributes.getNamedItem('id').value) {
                    e.style.opacity = '0';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.height = '0px';
                    e.children[0].style.overFlow = 'none';
                    e.classList.remove('checkMe');
            } else {
                if (e.classList.contains('checkMe')) {
                    e.classList.remove('checkMe');
                    el.style.opacity = '1';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.overFlow = 'none';
                    e.children[0].style.height = '0px';
                } else {
                    e.classList.add('checkMe');
                    e.style.opacity = '1';
                    e.children[0].style.opacity = '1';
                    e.children[0].style.height = '400px';
                    e.children[0].style.overFlow = 'block';
                }
            }
        })
    })
})

// open nav effect
 function openNav(): void {
     console.log();
    //  if (!document.body.classList.contains('menuMoved')) {
    //     document.body.classList.add('menuMoved');
    //     let sideBar: any = document.getElementById('sideBar');
    //     sideBar.style.width = "300px";
    //     let main: any = document.getElementById('main');
    //     main.style.marginLeft = "300px";
    //     main.style.width = "calc(100% - 300px)"
    //  } else {
    //     let sideBar: any = document.getElementById('sideBar');
    //     sideBar.style.width = "0px";
    //     let main: any = document.getElementById('main');
    //     main.style.marginLeft = "0px";
    //     main.style.width = "100%";
    //     document.body.classList.remove('menuMoved');
    // }
 }
