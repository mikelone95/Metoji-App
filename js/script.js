
/* Navbar */
var menuButton = document.getElementById('menuButton')
var menulist = document.getElementById('menulist')
var all = document.getElementById('all')
var toggleMenu = function () {
    if (!menulist.classList.contains('open')) {
        document.body.style.overflow = 'hidden'
        menuButton.classList.add('open')
        menulist.classList.add('open')
        all.classList.add('open')
    } else {
        document.body.style.overflowY = 'visible'
        menuButton.classList.remove('open')
        menulist.classList.remove('open')
        all.classList.remove('open')
    }
}
var closeMenu = function () {
    if (menulist.classList.contains('open')) {
        document.body.style.overflowY = 'visible'
        menuButton.classList.remove('open')
        menulist.classList.remove('open')
        all.classList.remove('open')
    }
}


menuButton.addEventListener('click', toggleMenu);
all.addEventListener('click', closeMenu)