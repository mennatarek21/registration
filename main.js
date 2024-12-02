const users = JSON.parse(localStorage.getItem('users')) || []; 
if (window.location.pathname.includes('index.html')) {
    const toggleForm = document.getElementById('toggleForm');
    const toggleLogin = document.getElementById('toggleLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const formTitle = document.getElementById('formTitle');

    toggleForm.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('d-none');
        signupForm.classList.remove('d-none');
        formTitle.textContent = 'Sign Up';
    });

    toggleLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('d-none');
        loginForm.classList.remove('d-none');
        formTitle.textContent = 'Login';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        if (users.some((user) => user.email === email)) {
            alert('Email already registered. Please log in.');
            signupForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
            formTitle.textContent = 'Login';
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users)); 
        alert('Account created successfully. Please log in.');
        signupForm.classList.add('d-none');
        loginForm.classList.remove('d-none');
        formTitle.textContent = 'Login';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', user.name); 
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password.');
        }
    });
}

if (window.location.pathname.includes('home.html')) {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        welcomeMessage.textContent = `Welcome, ${loggedInUser}`; 
    } else {
        window.location.href = 'index.html'; 
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); 
        window.location.href = 'index.html';
    });
}
