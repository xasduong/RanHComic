import {api} from "./api.js"
const z = document.querySelector.bind(document);
const zz = document.querySelectorAll.bind(document);

// Cac ham xu ly danh sach truyen tranh-----------------------------
(function handleBoxChap() {
    let getIdComic = 0;
    let getNameChap = api.comics[getIdComic].wnChap;
    const listChap = z('.chapter_box-list');
        //  Đao danh sach cac chuong
    let sortChap = getNameChap.sort((a, b) => {
        return b.nameChap - a.nameChap;
    })
    listChap.innerHTML = sortChap.map(renderLinkListChap).join('');
        function renderListChap(chap) {
            const {nameChap} = chap;
            return (`
                <li>Chương ${nameChap}</li>
            `)
        }
        function renderLinkListChap(chap) {
            const {nameChap} = chap;
            let createLink = "chuong" + nameChap + ".html";
            return (`
                <li><a class="a" href=${createLink}>Chương ${nameChap}</a></li>
            `)
        }
    function handleSearchChap() {
        const inputSearch = z('#input-search');
        inputSearch.oninput = () => {
            let getValueInput = inputSearch.value;
            let newListChap = sortChap.filter((item) =>{
                return item.nameChap.includes(getValueInput);
            })
            listChap.innerHTML = newListChap.map(renderLinkListChap).join('');
        }
    } handleSearchChap();
    function handleDisplayBox() {
        const chapterCurrent = zz('.nav-chapter_current');
        let boxListChap = z('.nav-chapter_box');
        let closeBtn = z('.chapter_box-btn');
        let overlay = z('#overlay');
        chapterCurrent.forEach((chapter) => {
            chapter.onclick = () => {
                Object.assign(boxListChap.style, {
                    top: '12%',
                    opacity: 1
                })
                overlay.classList.remove('close');
            }
        })
        closeBtn.onclick = () => {
            Object.assign(boxListChap.style, {
                top: '-38%',
                opacity: 0
            })
            overlay.classList.add('close');
        }
        overlay.onclick = () => {
            Object.assign(boxListChap.style, {
                top: '-38%',
                opacity: 0
            })
            overlay.classList.add('close');
        }
    } handleDisplayBox();
}) ();
//  Ham dung de bao loi cho Admin-----------------------------------

// Cac ham xu ly danh sach truyen tranh-----------------------------
    // Dùng JQuery
(function handlNavWeb() {
    window.onscroll = () => {
        let widthScreen = window.pageYOffset;
        if (widthScreen >= 160) {
            $(document).ready(function() {
                $(window).scroll(function() {
                    if($(this).scrollTop()) {
                        $('.nav-web').fadeIn();
                    } else {
                        $('.nav-web').fadeOut();
                    }
                })
            })
        }
    };
}) ();