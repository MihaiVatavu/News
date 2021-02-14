const keyBing = 'ed3e942ba25141e3855045b8d6c0eded';
const urlBing = 'https://api.bing.microsoft.com/v7.0/news/';
const urlBingTwo = 'https://api.bing.microsoft.com/';

const cardDivs = document.querySelectorAll('.cardSelect')
const menuLinks = document.querySelectorAll('.nav-link')
const search = document.getElementById("search")
const switchToggler = document.getElementById("btn-switch")
const navbar = document.getElementById("navbar")
let onlyImgNews = []



const addEventListenerToSearch = () => {
  search.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      removeExistingContent()
      getDataOnSearch(search)
    }
  })
}
const getDataOnSearch = async (param) => {
  const fetchNews = await fetch(`${urlBing}search?q=${param.value}&count=20&offset=0&mkt=en-GB`, {
    method: "GET",
    headers: {
      'Ocp-Apim-Subscription-Key': keyBing,

      image: {
        thumbnail: {
          'originalImg': true,
        },
      },
    },
  });
  const data = await fetchNews.json()
  getOnlyNewsWithImg(data)
}


const getSpecificDataMenu = async (param) => {
  const fetchNews = await fetch(`${urlBing}search?q=${param.target.innerText}&count=20&offset=0&mkt=en-GB`, {
    method: "GET",
    headers: {
      'Ocp-Apim-Subscription-Key': keyBing,

      image: {
        thumbnail: {
          'originalImg': true,
        },
      },
    },
  });
  const data = await fetchNews.json()
  getOnlyNewsWithImg(data)
}

const removeExistingContent = () => {
  cardDivs.forEach((element) => {
    element.innerHTML = ``;
    onlyImgNews = [];
  })
}

const addEventListenerToLinks = () => {
  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      removeExistingContent()
      getSpecificDataMenu(e)
    })
  })
}

const addContentToUi = (param) => {

  cardDivs.forEach((card, index) => {
    const content = `<img src="${param[index].image.thumbnail.contentUrl}&w=500&p=0" class="card-img-top" alt="...">
    <div class="card-body">
      <h6 class="card-title">${param[index].name}</h6>
      <p class="card-text">${param[index].description}...</p>
      <p class="card-text">${param[index].datePublished.substr(0, 10)}</p>
      <p class="card-text"><a href="${param[index].url} class="linkToArticle">Read More</a></p>
    </div>`

    card.insertAdjacentHTML('afterbegin', content)
  })
}


// Get the news that have images
const getOnlyNewsWithImg = (data) => {
  data.value.forEach((article) => {
    if (article.image) {
      onlyImgNews.push(article)
    }
  })
  console.log(onlyImgNews)
  addContentToUi(onlyImgNews)
}

// Get data
const getDataMain = async () => {
  const fetchNews = await fetch(`${urlBing}search?q=World&count=20&offset=0&mkt=en-GB`, {
    method: "GET",
    headers: {
      'Ocp-Apim-Subscription-Key': keyBing,
      image: {
        thumbnail: {
          'originalImg': true,
        },
      },
    },
  });
  const data = await fetchNews.json()
  getOnlyNewsWithImg(data)
}

const switchToDark = () => {

  switchToggler.addEventListener('click', () => {
    document.body.classList.toggle("darkMode");
    if(navbar.classList.contains("navbar-light")){
      console.log("heloooo")
      navbar.classList.replace("navbar-light","navbar-dark")
    }else{
      navbar.classList.replace("navbar-dark","navbar-light")
    }
  })
}

window.onload =()=>{

  switchToDark()
  addEventListenerToSearch()
  addEventListenerToLinks()
  getDataMain()

}




