const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "../StaticFiles/IMG/nav-close.svg";
    } else {
        navBtnImg.src = "../StaticFiles/IMG/nav-open.svg";
    }
}