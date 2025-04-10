const users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser') || null;

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authBtn = document.getElementById('auth-btn');
    const toggleAuth = document.getElementById('toggle-auth');
    const authSwitch = document.getElementById('auth-switch');
    const errorMessage = document.getElementById('error-message');
    const loginFields = document.getElementById('login-fields');
    const registerFields = document.getElementById('register-fields');

    let isLogin = true;

    // Toggle funksiyasi (fade animatsiyasi)
    function toggleForms() {
        if (isLogin) {
            // Login’dan Register’ga
            loginFields.classList.add('fade-out');
            setTimeout(() => {
                loginFields.style.display = 'none';
                loginFields.classList.remove('fade-out');
                registerFields.style.display = 'block';
                registerFields.classList.add('fade-in');
                setTimeout(() => registerFields.classList.remove('fade-in'), 500);

                authTitle.textContent = 'Register';
                authSubtitle.textContent = 'Create your account today!';
                authBtn.textContent = 'Register';
                authSwitch.innerHTML = `Already have an account? <a href="#" id="toggle-auth" class="switch-link">Login</a>`;
                document.getElementById('toggle-auth').addEventListener('click', toggleFormsHandler);
            }, 500);
        } else {
            // Register’dan Login’ga
            registerFields.classList.add('fade-out');
            setTimeout(() => {
                registerFields.style.display = 'none';
                registerFields.classList.remove('fade-out');
                loginFields.style.display = 'block';
                loginFields.classList.add('fade-in');
                setTimeout(() => loginFields.classList.remove('fade-in'), 500);

                authTitle.textContent = 'Login';
                authSubtitle.textContent = 'Welcome back! Let\'s get started.';
                authBtn.textContent = 'Login';
                authSwitch.innerHTML = `Don't have an account? <a href="#" id="toggle-auth" class="switch-link">Register</a>`;
                document.getElementById('toggle-auth').addEventListener('click', toggleFormsHandler);
            }, 500);
        }
        isLogin = !isLogin;
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    function toggleFormsHandler(e) {
        e.preventDefault();
        toggleForms();
    }

    toggleAuth.addEventListener('click', toggleFormsHandler);

    // Form submission
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        authBtn.disabled = true;
        authBtn.textContent = 'Loading...';
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isLogin) {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (users[email] && users[email] === password) {
                currentUser = email;
                localStorage.setItem('currentUser', currentUser);
                window.location.href = 'home.html';
            } else {
                errorMessage.textContent = 'Invalid email or password!';
                errorMessage.style.display = 'block';
            }
        } else {
            const fullname = document.getElementById('reg-fullname').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const confirmPassword = document.getElementById('reg-confirm-password').value.trim();

            if (!fullname || !email || !password || !confirmPassword) {
                errorMessage.textContent = 'Please fill in all fields!';
                errorMessage.style.display = 'block';
                authBtn.disabled = false;
                authBtn.textContent = 'Register';
                return;
            }

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match!';
                errorMessage.style.display = 'block';
                authBtn.disabled = false;
                authBtn.textContent = 'Register';
                return;
            }

            if (users[email]) {
                errorMessage.textContent = 'Email already exists!';
                errorMessage.style.display = 'block';
            } else {
                users[email] = password;
                localStorage.setItem('users', JSON.stringify(users));
                currentUser = email;
                localStorage.setItem('currentUser', currentUser);
                window.location.href = 'home.html';
            }
        }

        authBtn.disabled = false;
        authBtn.textContent = isLogin ? 'Login' : 'Register';
    });
});