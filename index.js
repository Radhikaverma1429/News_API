const TODAY = '2023-12-15'
console.log('TODAY', TODAY)

const articleCreater = (data, articles) =>{
    let htmlString = '';
    for(let i of data.articles){
        // Create the main container div
        const mainContainer = document.createElement('div');

        // Create the image container div
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        // Create the image element
        const image = document.createElement('img');
        image.src = i.urlToImage;
        image.className = 'article-img';
        image.alt = i.title;

        // Append the image to the image container
        imageContainer.appendChild(image);

        // Create the article body container div
        const articleBodyContainer = document.createElement('div');
        articleBodyContainer.className = 'article-body-container';

        // Create and append the h2 element
        const h2 = document.createElement('h2');
        h2.id = 'p1';
        h2.textContent = i.title;
        articleBodyContainer.appendChild(h2);

        // Create and append the p element
        const p = document.createElement('p');
        p.id = 'p2';
        p.innerHTML = i.content.length > 197 ? i.content.slice(0, 197) + '...' : i.content;
        console.log('i.content', i.content)
        articleBodyContainer.appendChild(p);

        // Append the image container and article body container to the main container
        mainContainer.appendChild(imageContainer);
        mainContainer.appendChild(articleBodyContainer);

        // Append the main container to the element with the ID 'article'
        articles.appendChild(mainContainer);
        console.log(i);

        // break;
    }
    return htmlString
}

const onLoadHandler = async () =>{
    const articles = document.getElementById('article-container')
    const responce = await fetch(`https://newsapi.org/v2/everything?q=india news&from=${TODAY}&to=${TODAY}&sortBy=popularity&apiKey=19d57a0ac0b5415b95b2c328795a3c98`)
    const data = await responce.json()
    articleCreater(data, articles);
}

const onSearch = async () => {
    const searchField = document.querySelector('#search');
    if (searchField.value) {
        document.querySelector('#mainTitle').innerHTML = `TOP NEWS ON "${searchField.value.toUpperCase()}"`;
        const articles = document.getElementById('article-container');
        articles.innerHTML = ''
        const responce = await fetch(`https://newsapi.org/v2/everything?q=${searchField.value}&from=${TODAY}&to=${TODAY}&sortBy=popularity&apiKey=19d57a0ac0b5415b95b2c328795a3c98`)
        const data = await responce.json()
        articleCreater(data, articles);
    }
    searchField.value = ''
}

