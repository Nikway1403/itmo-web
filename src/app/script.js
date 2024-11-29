document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Login',
            html: `
                <label for="username">Логин:</label>
                <input type="text" id="username" class="swal2-input" placeholder="Имя пользователя">
                <label for="password">Пароль:</label>
                <input type="password" id="password" class="swal2-input" placeholder="Пароль">
            `,
            showCancelButton: true,
            confirmButtonText: 'Login',
            preConfirm: () => {
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();

                if (!username || !password) {
                    Swal.showValidationMessage('Нужно заполнить оба поля');
                    return false;
                }

                return { username, password };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { username, password } = result.value;

                if (username === 'Nikita' && password === '12345') {
                    Swal.fire({
                        icon: 'success',
                        title: 'респект+',
                        text: `Привет, ${username}!`,
                        timer: 3000,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Потрачено',
                        text: 'Неверный пароль или имя пользователя',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            }
        });
    });
});