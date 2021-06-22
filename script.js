const API_URL = 'https://graph.facebook.com/v11.0/'

window.onload = () => {
    let pageId = document.getElementById('page_id');
    let accessToken = document.getElementById('access_token');
    let postLink = document.getElementById('post_link');
    
    pageId.value  = localStorage.getItem('pageId');
    accessToken.value  = localStorage.getItem('access_token') || '';
    postLink.value  = localStorage.getItem('postLink') || '';

}

async function postMethod(access_token, pageId, data) {
    let url = API_URL + pageId + "/feed" + "?access_token=" + access_token;
    return (await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}


const sendBtn = document.querySelector('#form_btn');

let form = document.querySelector('form');
form.addEventListener('submit', async event => {
    event.preventDefault()

    let pageId = document.getElementById('page_id').value;
    let accessToken = document.getElementById('access_token').value;
    let postLink = document.getElementById('post_link').value;
    let loopLimit = document.getElementById('loop').value;

    let taskDisplay = document.getElementById('task_order');
    let taskError = document.getElementById('task_error');

    if(accessToken === '' || postLink === '' || pageId === '', loopLimit === '') return console.log('error');

    let limitTime = parseInt(loopLimit);
    if(isNaN(limitTime) || limitTime < 1) return console.log('error')



    if (typeof(Storage) !== "undefined") {

        localStorage.setItem("pageId", pageId);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("postLink", postLink);
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

    for(let i = 1; i<= parseInt(loopLimit); ++i) {
        try {
            await postMethod(accessToken, pageId, {link: postLink})
            taskDisplay.innerText = i.toString();
        } catch (error) {
            taskError.innerText = error;
            console.log('ERRORRRRRRRRRRRRRRRRRRRRR');
            console.log(error);
        }
    }
})

