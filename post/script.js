document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');
    
    // Загрузка постов при загрузке страницы
    loadPosts();
    
    // Обработка отправки формы
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        if (title && content) {
            addPost(title, content);
            postForm.reset();
        }
    });
    
    // Добавление поста
    function addPost(title, content) {
        const post = {
            id: Date.now(),
            title,
            content
        };
        
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        renderPost(post);
    }
    
    // Загрузка постов
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => renderPost(post));
    }
    
    // Отображение поста
    function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost(${post.id})">Удалить</button>
        `;
        postsContainer.appendChild(postElement);
    }
});

// Удаление поста (глобальная функция для обработки onclick)
function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Перезагрузка постов
    document.getElementById('postsContainer').innerHTML = '';
    posts.forEach(post => renderPost(post));
}

// Повторное объявление renderPost для глобальной видимости
function renderPost(post) {
    const postsContainer = document.getElementById('postsContainer');
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="deletePost(${post.id})">Удалить</button>
    `;
    postsContainer.appendChild(postElement);
}