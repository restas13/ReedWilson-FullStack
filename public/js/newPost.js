const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    console.log(title);
    console.log(body);
    await fetch(`/api/post`, {
        method: 'POST',
        content: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type': 'application/json' },

    });

    document.location.replace('/');
    console.log('ran');
};

document
    .querySelector('#Search-Button')
    .addEventListener('click', newFormHandler);