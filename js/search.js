// Collection data for search
const collections = [
    {
        title: 'Áo Chàm',
        description: 'Vẻ đẹp mộc mạc của trang phục truyền thống, được làm từ vải nhuộm chàm tự nhiên.',
        url: 'collections/ao-cham.html',
        image: 'images/collections/ao-cham/model1.jpg',
        keywords: ['ao cham', 'áo chàm', 'vải nhuộm', 'truyền thống', 'mộc mạc']
    },
    {
        title: 'Áo Dài Cách Tân',
        description: 'Sự kết hợp hoàn hảo giữa truyền thống và hiện đại trong thiết kế áo dài.',
        url: 'collections/ao-dai-cach-tan.html',
        image: 'images/collections/ao-dai-cach-tan/model1.jpg',
        keywords: ['ao dai', 'áo dài', 'cách tân', 'hiện đại', 'truyền thống']
    },
    {
        title: 'Áo Giao lĩnh – Viên lĩnh – Đối khâm',
        description: 'Ba phong cách áo truyền thống độc đáo với thiết kế tinh tế.',
        url: 'collections/ao-giao-linh.html',
        image: 'images/collections/ao-giao-linh/model1.jpg',
        keywords: ['giao linh', 'vien linh', 'doi kham', 'truyền thống']
    },
    {
        title: 'Áo Ngũ Thân Tay Chẽn - Áo Tấc',
        description: 'Vẻ đẹp trang nghiêm của trang phục truyền thống với thiết kế năm thân độc đáo.',
        url: 'collections/ao-ngu-than.html',
        image: 'images/collections/ao-ngu-than/model1.jpg',
        keywords: ['ngu than', 'ngũ thân', 'tay chen', 'ao tac', 'áo tấc']
    },
    {
        title: 'Phụ Kiện Trang Phục',
        description: 'Hoàn thiện vẻ đẹp trang phục truyền thống với các phụ kiện tinh tế và độc đáo.',
        url: 'collections/phu-kien.html',
        image: 'images/collections/phu-kien/model1.jpg',
        keywords: ['phụ kiện', 'phu kien', 'accessories']
    }
];

// Create search results container
const searchResultsContainer = document.createElement('div');
searchResultsContainer.id = 'searchResults';
searchResultsContainer.className = 'search-results';
document.querySelector('.search-bar').appendChild(searchResultsContainer);

// Function to normalize Vietnamese text
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd');
}

// Function to handle search
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const searchTerm = normalizeText(searchInput.value.trim());
    const resultsContainer = document.getElementById('searchResults');
    
    if (searchTerm === '') {
        resultsContainer.style.display = 'none';
        return;
    }

    const results = collections.filter(item => {
        const normalizedTitle = normalizeText(item.title);
        const normalizedDesc = normalizeText(item.description);
        const normalizedKeywords = item.keywords.map(k => normalizeText(k));
        
        return normalizedTitle.includes(searchTerm) ||
               normalizedDesc.includes(searchTerm) ||
               normalizedKeywords.some(k => k.includes(searchTerm));
    });

    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.style.display = 'block';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Không tìm thấy kết quả phù hợp</p>';
        return;
    }

    const resultsHTML = results.map(item => `
        <a href="${item.url}" class="search-result-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="search-result-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </a>
    `).join('');

    resultsContainer.innerHTML = resultsHTML;
}

// Close search results when clicking outside
document.addEventListener('click', (event) => {
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchBar.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Add input event listener for real-time search
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchForm = document.getElementById('searchForm');
    handleSearch(new Event('submit'));
}); 