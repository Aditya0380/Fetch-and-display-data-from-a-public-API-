const apiKey = '627585b3a230470c8e01dbebff48d841'; 
const newsContainer = document.getElementById('news-articles');
const fetchNewsButton = document.getElementById('fetch-news');

fetchNewsButton.addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value.trim();
    const url = keyword
        ? `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch news (${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            displayNews(data.articles);
        })
        .catch((error) => {
            newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

function displayNews(articles) {
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }

    newsContainer.innerHTML = articles
        .map((article) => {
            return `
                <div class="article">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description || 'No description available.'}</p>
                    <small><strong>Source:</strong> ${article.source.name}</small>
                </div>
            `;
        })
        .join('');
}
