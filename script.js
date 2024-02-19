const menuToggle = document.getElementById('menu-toggle');
const body = document.body;
const closeBtn = document.getElementById('close-btn');


menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-hidden');
    body.classList.toggle('menu-visible');
});



closeBtn.addEventListener('click', () => {
    body.classList.remove('menu-visible');
    body.classList.add('menu-hidden');
});
