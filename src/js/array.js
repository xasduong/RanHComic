const z = document.querySelector.bind(document);
const zz = document.querySelectorAll.bind(document);

const textarea = z('textarea');
const apiInput = z('#api_input');
const formApiBtn = z('.form-api_btn');

let myImage = JSON.parse(localStorage.getItem('myImage'));
textarea.innerText = JSON.stringify(myImage);

apiInput.onkeyup = () => {
    let getValueInput = apiInput.value;
    formApiBtn.onclick = () => {
        let isChoose = confirm("Bạn có đẩy danh sách này lên Local Storage?")
        if( isChoose == 1) {
            localStorage.setItem('myImage', getValueInput);
            location.reload();
        } else {
            apiInput.value = "";
        }
    }
}

    let webImage = z('.web-image .col');
function renderImageComic() {
    for (let i = 0; i < myImage.length; i++) {
        let linkImg = "src/img/" + myImage[i].nameComic + "/" + myImage[i].nameComic +" (" + 1 + ").jpg";
        let div = document.createElement('div');
            div.className = "web-image_item";
        let img = document.createElement('img');
            img.src = linkImg;
        let span = document.createElement('span');
            span.innerText = myImage[i].nameComic.replace(/-/g, " ");
        let divEdit = document.createElement('div');
            divEdit.className = "image_item-edit";
            divEdit.innerText = "Sửa"
        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(divEdit);
        webImage.appendChild(div);
    }
} renderImageComic();

let imgItem = zz(".web-image_item");
let inputName = z('#input_name');
let inputLengthImg = z('#input_lengthImg');
let inputUrl = z('#input_url');
let updateBtn = z('.section-box_btn');
let section = z('section');
let overLay = z('#over-lay');
let boxDeleteBtn = z('.section-box_remove');
function handleSectionBox() {
    imgItem.forEach((item, index) => {
        item.onclick = () => {
            inputName.value = myImage[index].nameComic;
            inputLengthImg.value = myImage[index].lengthImg;
            inputUrl.value = JSON.stringify(myImage[index].listImg);
            section.classList.remove('close');
            overLay.classList.remove('close');
            a();
            boxDeleteBtn.display = "block";
            updateBtn.innerText = "Cập nhật";
            deleteComic(myImage[index], myImage);
            updateComic(myImage[index], myImage)
        }
    })
    
    function deleteComic(currentComic, originComic) {
        boxDeleteBtn.style.backgroundColor = '#a53838';
        boxDeleteBtn.style.borderRadius = '5px';
        boxDeleteBtn.onclick = () => {
            let removeComic = originComic.findIndex(item => item.nameComic == currentComic.nameComic);
                originComic.splice(removeComic, 1 );
            let isAnswer = confirm('Bạn có muốn xóa truyện "' + currentComic.nameComic + '" hay không?');
            if (isAnswer == 1) {
                console.log("Bạn đã xóa truyện!");
                localStorage.setItem('myImage', JSON.stringify(originComic));
                location.reload();
            } else {
                console.log("No delete");
            }
        }
    }
    function updateComic(currentComic, originComic) {
        updateBtn.onclick = () => {
            let stringImg = {
                nameComic: inputName.value,
                listImg: inputUrl.value,
                lengthImg: inputLengthImg.value
            }
            let removeComic = originComic.findIndex(item => item.nameComic == currentComic.nameComic);
            originComic.splice(removeComic, 1 );
            myImage.push(stringImg);
            localStorage.setItem('myImage', JSON.stringify(myImage));
            location.reload();
        }
    }
} handleSectionBox();

function extraComic() {
    let plusBtn = z('#web-plus_btn');
    plusBtn.onclick =() => {
        section.classList.remove('close');
            overLay.classList.remove('close');
        a();
        boxDeleteBtn.display = "none";
        updateBtn.innerText = "Thêm truyện";
        updateBtn.onclick =() => {
            handleGetValue();
        }
        function handleGetValue() {
            let stringImg = {
                nameComic: inputName.value,
                listImg: inputUrl.value,
                lengthImg: inputLengthImg.value
            }
            myImage.push(stringImg);
                localStorage.setItem('myImage', JSON.stringify(myImage));
                location.reload();
        }
    }
} extraComic();
function a() {
    let boxBtn = z('.section-box_close');
    boxBtn.onclick = () => {
        closeBoxEdit()
    }
    overLay.onclick = () => {
        closeBoxEdit()
    }

    function closeBoxEdit() {
        overLay.classList.add('close');
        section.classList.add('close');
        inputName.value = "";
        inputLengthImg.value = "";
        inputUrl.value = "";
    }
}