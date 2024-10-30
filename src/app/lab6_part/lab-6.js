document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const errorMessage = document.getElementById('error');

    async function loadComments() {
        try {
            preloader.style.display = 'block';
            content.style.display = 'none';
            errorMessage.style.display = 'none';

            const randomFilter = Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=200';
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?${randomFilter}`);

            if (!response.ok) {
                throw new Error('Ошибка');
            }

            const data = await response.json();

            preloader.style.display = 'none';
            renderComments(data);
        }
        catch (error) {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Ошибка:', error);
        }
    }

    function renderComments(comments) {
        content.style.display = 'block';
        content.innerHTML = '';

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            content.appendChild(commentElement);
        });
    }

    loadComments();
});
