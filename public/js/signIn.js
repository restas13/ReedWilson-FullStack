const loginFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input-login');
    const passwordEl = document.querySelector('#password-input-login');

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        alert('signed in');
    } else {
        alert('Failed to login');
    }
};


const signupFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input-signup');
    const passwordEl = document.querySelector('#password-input-signup');

    const response = await fetch('/api/user/newUser', {
        method: 'POST',
        body: JSON.stringify({
            name: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        alert('signed in');
    } else {
        alert('Failed to sign up');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
