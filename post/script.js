document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');
    
    // Загрузка постов при загрузке страницы
    loadPosts();
    
    // Обработка отправки формы
    postForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        if (title && content) {
            await addPost(title, content);
            postForm.reset();
        }
    });
    
    // Загрузка постов с сервера
    async function loadPosts() {
        try {
            const response = await fetch('/api/get_posts.php');
            const posts = await response.json();
            postsContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой
            posts.forEach(post => renderPost(post));
        } catch (error) {
            console.error('Ошибка при загрузке постов:', error);
        }
    }
    
    // Добавление поста на сервер
    async function addPost(title, content) {
        try {
            const response = await fetch('/api/add_post.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            });
            const newPost = await response.json();
            renderPost(newPost);
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    }
    
    // Удаление поста
    async function deletePost(id) {
        try {
            await fetch(`/api/delete_post.php?id=${id}`);
            // Перезагружаем список постов после удаления
            await loadPosts();
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
        }
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
    
    // Делаем функцию deletePost глобальной для работы из HTML
    window.deletePost = deletePost;
});
