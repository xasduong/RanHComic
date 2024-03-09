const z = document.querySelector.bind(document)
const zz = document.querySelectorAll.bind(document);

const api = {
    "website" : [
        {
            nameWeb: "Postimage",
            linkWeb: ""
        },
        {
            nameWeb: "Google drive",
            linkWeb: ""
        },
        {
            nameWeb: "Sayhentai",
            linkWeb: ""
        },
        {
            nameWeb: "Computer",
            linkWeb: ""
        },
    ]
};
let myImage = JSON.parse(localStorage.getItem('myImage'));
(function startWeb() {
    if(myImage == null) {
        let isChoose = confirm("Trang Web sẽ lấy giá trị khi bạn nhập dữ liệu! Yes or No");
        if(isChoose) {
            localStorage.setItem('myImage', JSON.stringify([]));
        } else {
            localStorage.setItem('myImage', JSON.stringify([]));
        }
    }
} ());
function handleFormBox() {
    let formBox = z('form .col');
    let formDown = zz('.form-down');

    let isFormBox = localStorage.getItem('formBox');
    if (isFormBox == null) {
        formDown[1].classList.add('close');
        displayFormBox();
    } else if(isFormBox == 1) {
        formDown[0].classList.add('close');
        formBox.classList.remove('close');
        displayFormBox();
    } else {
        formDown[1].classList.add('close');
        formBox.classList.add('close');
        displayFormBox();
    }
    function displayFormBox() {
        formDown[0].onclick = () => {
            formBox.classList.add('close');
            formDown[0].classList.add('close');
            formDown[1].classList.remove('close');
            localStorage.setItem("formBox", 0);
        }
        formDown[1].onclick = () => {
            formBox.classList.remove('close');
            formDown[1].classList.add('close');
            formDown[0].classList.remove('close');
            localStorage.setItem("formBox", 1);
        }
    }

} handleFormBox();
//  handleServerBtn--------------------------------------------
    function handleServerBtn() {
        let serverBtns = zz('.box_server span');
        let getIndexServer = localStorage.getItem('indexServer')
        if (getIndexServer == null || getIndexServer == 0) {
            serverBtns[0].classList.add('choose');
            localStorage.setItem('indexServer', 0);
            serverBtn();
        } else {
            serverBtns[getIndexServer].classList.add('choose');
            serverBtn();
        }
        function serverBtn() {
            serverBtns.forEach((btn, index) => {
                btn.onclick = () => {
                    z('.box_server span.choose').classList.remove('choose');
                    btn.classList.add('choose');
                    localStorage.setItem('indexServer', index);
                }
            })
        } serverBtn();
    } handleServerBtn();

// ------------------------------------------------------------
let getA = localStorage.getItem('a-ReadicCom');
(function handleWebsiteImage() {
    const getWeb = api.website;
    let boxWebBtn = z('.website-btn');
    boxWebBtn.innerHTML = getWeb.map(renderWebsite).join('')
    function renderWebsite(web) {
        let {nameWeb} = web;
        return (`
            <span>${nameWeb}</span>
        `)
    }
    let webBtns = zz('.website-btn span');
    if( getA == null) {
        webBtns[0].classList.add('choose');
        clickWebsite();
    } else {
        webBtns[getA].classList.add('choose');
        clickWebsite();
    } ;
   
    function clickWebsite() {
        webBtns.forEach((btn, index) => {
            btn.onclick =() => {
                z('.website-btn span.choose').classList.remove('choose')
                btn.classList.add('choose');
                localStorage.setItem('a-ReadicCom', index);
                location.reload();
            }
        })
    }
}) ();
// ------------------------------------------------------------
const numImgInput = z('#num_img');
let webFunctionNum = z('.website-function');
(function handleImageDemo() {
    let inputLink = z('.web-form_link');
    let boxDemo = z('.box-demo');
    let numLength = z('.num-length');
    let nameComic = z('.name-comic');
    if (getA == 3) {
        webFunctionNum.classList.remove('close') ;
    } else {
        webFunctionNum.classList.add('close') ;
    }
    function hanleValueImg() {
        inputLink.oninput = () => {
            let getValue = inputLink.value;
            let website = z('.website-btn span.choose').innerText.toLowerCase();
            switch (website) {
                case "postimage": {
                    getValueToPostImage(getValue);
                    break;
                }
                case "sayhentai": {
                    getValueToSayHentai(getValue)
                    break;
                }
                case "computer": {
                    getValueToApi(getValue);
                    break;
                }
                default: {
                    console.log("Không tìm thấy")
                }
            }
        }
    } hanleValueImg();
// Khi nguoi dung click vao anh----------------------------------------
    function eventClickItem() {
        let demoItem = zz(".box-demo_item > img");
        let textareaLink = zz('.box-demo_item > textarea');
        demoItem.forEach((item, index) => {
            item.onclick = () => {
                textareaLink[index].classList.toggle('open');
            }
        })
    }  
    function getValueToPostImage(getValue) {
        let linkImages = getValue.split(' ');
        function handleGetName() {
            let a1 = linkImages[0].split("/")[4];
            let a2 = a1.split('-');
            let lastValue = a2[a2.length - 1];
            let getName = a1.replace("-" +lastValue, "");
            nameComic.innerText = getName;
            return getName;
        }
        function handleListImg() {
            let arrImg = [];
            for (let i = 0; i < linkImages.length; i++) {
                let a1 = linkImages[i].split("/")[4];
                let a2 = a1.split('-');
                let lastValue = a2[a2.length - 1];
                let getUrlImg= lastValue.replace('.jpg', '');
                arrImg.push({
                    nameUrl: linkImages[i].split("/")[3],
                    numImg: getUrlImg
                });
            }
            return arrImg;
        }
        valueForm(handleListImg(), handleGetName());
        function valueForm(array, nameComic) {
            numLength.innerText = array.length;
            let valueImage = {
                nameComic: nameComic.replace(/ /g, "-"),
                lengthImg: array.length,
                listImg: array
            }
            function renderImg(boxImg) {
                let linkWebsite = "https://i.postimg.cc/";
                // ------------
                let listImg = array.sort((a, b) => a.numImg - b.numImg);
                for (let i = 1; i < array.length; i ++ ){
                    let img = document.createElement('img');
                    let nameHref = listImg[i].nameUrl + '/' + nameComic +'-'+ listImg[i].numImg +'.jpg';
                    let imgHref = linkWebsite + nameHref;
                    let div = document.createElement('div');
                    let textarea = document.createElement('textarea');
                    div.className = "box-demo_item";
                    img.setAttribute('src', imgHref);
                        textarea.placeholder = "Đường dẫn ảnh";
                        textarea.value = nameHref;
                    div.appendChild(img);
                    div.appendChild(textarea);
                    boxImg.appendChild(div);
                }
                eventClickItem()
            } renderImg(boxDemo);
            // Đẩy giá trị vào mảng arrImages
            let postApi = z('input[type="button"]')
            postApi.onclick = () => {
                alert("Đã đẩy mảng lên thành công!");
                myImage.push(valueImage);
                localStorage.setItem('myImage', JSON.stringify(myImage));
                location.reload();
            }
        }
    }
    function getValueToApi(getValue) {
        numImgInput.oninput = () => {
            localStorage.setItem('lengthImg', numImgInput.value);
        }
        let lengthImage = localStorage.getItem('lengthImg');
        const arrImg = {
            lengthImg :  lengthImage,
            nameComic :  getValue,
        }
        let postApi = z('input[type="button"]')
        postApi.onclick = () => {
            alert("Đã đẩy mảng lên thành công!");
            myImage.push(arrImg);
            localStorage.setItem('myImage', JSON.stringify(myImage));
            location.reload();
        }
        function renderImg(boxImg) {
            // ------------
            for (let i = 1; i < lengthImage; i ++ ){
                let img = document.createElement('img');
                let imgHref = 'src/img/' + getValue +"/" + getValue + " ("+i+ ").jpg";
                let div = document.createElement('div');
                let textarea = document.createElement('textarea');
                div.className = "box-demo_item";
                img.setAttribute('src', imgHref);
                    textarea.placeholder = "Đường dẫn ảnh";
                    textarea.value = "Ảnh " + i + " .jpg";
                div.appendChild(img);
                div.appendChild(textarea);
                boxImg.appendChild(div);
            }
            eventClickItem()
        } renderImg(boxDemo);
    }
}) ();
// ----------------------------------------------------------------------
let random = Math.floor(Math.random() * myImage.length);
let  linkBackTop = zz('.back_top-comic a') 
let boxRandom = z('.box-random .col');
function handleRanComic() {
    if(myImage.length >= 1 ) {
        linkBackTop[0].setAttribute('href', "#" + myImage[random].nameComic);
        linkBackTop[0].innerText = myImage[random].nameComic;
        renderImgRandom(); handleBoxComic()
    }
} handleRanComic();

let section = z('section');
let overlay = z('#over-lay');
let btnClose = z('section > span');
let boxComicNav = z('.box-comic_nav');
let widthScreen = screen.width;
if (widthScreen < 480)  {
    comicNav('-100%');
} else {
    comicNav('-70%');
}
function comicNav(x) {
    boxComicNav.onclick = () => {
        section.style.left = "0%";
        overlay.classList.remove('close');
    }
    btnClose.onclick = () => {
        section.style.left = x;
        overlay.classList.add('close');
    }
    overlay.onclick = () => {
        section.style.left = x;
        overlay.classList.add('close');
    }
}
function renderImgRandom() {
    let linkWebsite = "https://i.postimg.cc/"; 
    let currentComic = myImage[random];
    let listImage = currentComic.listImg;
    let nameComic = currentComic.nameComic.replace(/ /g, "-");
    let getIndexServer = localStorage.getItem('indexServer')
    if (getIndexServer == null || getIndexServer == 0) {
        for (let i = 1; i <= currentComic.lengthImg; i++) {
            let img = document.createElement('img');
            let imgHref = linkWebsite + listImage[i].nameUrl + '/' + nameComic +'-'+ listImage[i].numImg +'.jpg'
            img.setAttribute('src', imgHref);
            boxRandom.appendChild(img);
        }
    } else {
        for (let i = 1; i <= currentComic.lengthImg; i++) {
            let img = document.createElement('img');
            let imgHref = 'src/img/' + nameComic +'/'+ nameComic +" (" + i +').jpg';
            img.setAttribute('src', imgHref);
            boxRandom.appendChild(img);
        }
    }
    let getImages = zz('.box-random .col >img');
    getImages[0].setAttribute('id', nameComic);
    z('.box-random_title').innerText = currentComic.nameComic.replace(/-/g, " ");
    getImages[0].style.marginTop = "20px"
    z('#back-top').href = "#" + nameComic;
} ;
function handleBoxComic() {
    let boxComic = z('.box-comic');
    // myImage
    for (let i = 0; i < myImage.length; i++) {
        let img = document.createElement('img');
        let div = document.createElement('div');
        let p = document.createElement('p');
        let linkImg = "src/img/" + myImage[i].nameComic+ "/" + myImage[i].nameComic +' (1).jpg';
        p.innerText = myImage[i].nameComic.replace(/-/g, " " );
        img.setAttribute('src', linkImg);
        div.appendChild(img); div.appendChild(p);
        boxComic.appendChild(div);
    }
    let imgListComic = zz('section .box-comic img');
    imgListComic[random].classList.add('choose');
    imgListComic.forEach((img, index) => {
        img.onclick = () => {
            img.classList.add('choose');
            let newArrImage = myImage.filter((e) => {
                return e.nameComic == myImage[index].nameComic;
            } )
            createBoxImg(newArrImage);
            handleBackTop(index)
        }
    })
    let numInfor = z('.box-comic_infor div');
    numInfor.innerText = myImage.length; 
} ;
let backTopList = z('.back_top-comic');
    let boxTopInfor = z('.back_top-infor');

//  Xu lys khi nguoi dung nhan 2 nut mui ten trai phai
function handlePressKeyBoard() {
    // random
    document.addEventListener('keyup', (event) => {
        let btnKeyBoard = event.which;
        if (btnKeyBoard == 37) {
            // Nhan mui ten Trai
            let newIndex = --random;
            if (newIndex <=0) {
                newIndex = 0;
                insertValueImgPress(newIndex);
            } else {
                insertValueImgPress(newIndex);
            }
        } else if( btnKeyBoard == 39) {
            // Nhan mui ten Phai
            let newIndex = ++random;
            let lengthArr = myImage.lengh;
            if (newIndex >= lengthArr) {
                insertValueImgPress(lengthArr);
            } else {
                insertValueImgPress(newIndex);
            }
        }
    })
}handlePressKeyBoard()
    function insertValueImgPress(lengthArr) {
        newIndex = lengthArr;
        let imgListComic = zz('section .box-comic img');
        imgListComic[newIndex].classList.add('choose');
        let newComic = myImage.filter((a) => a.nameComic ==myImage[newIndex].nameComic )
        createBoxImg(newComic); handleBackTop(newIndex); 
    }
function createBoxImg(arr) {
    let p = document.createElement('p');
    p.innerText = arr[0].nameComic.replace(/ /g, " ");
    p.setAttribute('id', arr[0].nameComic)
    let currentImage = arr[0];
    boxRandom.appendChild(p);
    let getIndexServer = localStorage.getItem('indexServer')
    if (getIndexServer == 0 || getIndexServer == null) {
        for( let i = 1; i <= currentImage.lengthImg; i++ ) {
            let img = document.createElement('img');
            let linkImg = "https://i.postimg.cc/" + currentImage.listImg[i].nameUrl + '/' + currentImage.nameComic 
                +'-'+ currentImage.listImg[i].numImg +'.jpg'
            img.setAttribute('src', linkImg);
            boxRandom.appendChild(img);
        }
    } else {
        for( let i = 1; i <= currentImage.lengthImg; i++ ) {
            let img = document.createElement('img');
            let linkImg = "src/img/"  + currentImage.nameComic +"/" +currentImage.nameComic + " (" + i + ").jpg";
            img.setAttribute('src', linkImg);
            boxRandom.appendChild(img);
        }
    }
}
function handleBackTop(index) {
    let a = document.createElement('a');
    let linkTopList = "#" + myImage[index].nameComic;
        a.setAttribute('href', linkTopList)
        a.innerText = myImage[index].nameComic.replace(/-/g, " ");
    backTopList.appendChild(a);
    let numImg = zz('.box-comic img.choose').length;
    boxTopInfor.innerText = numImg;
} ;
