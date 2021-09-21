const idinput = document.getElementsByClassName('id')[0];
const pwinput = document.getElementsByClassName('pw')[0];
const idhelp = document.getElementsByClassName('help-id')[0];
const pwhelp = document.getElementsByClassName('help-pw')[0];
const btn = document.getElementsByClassName('btn')[0];

async function login(){
    id = idinput.value;
    pw = pwinput.value;
    let expTimeA = new Date();
    let expTimeR = new Date();
    expTimeA.setTime(expTimeA.getTime() + (12*60*60*1000));
    expTimeR.setTime(expTimeR.getTime() + (180*24*60*60*1000));
    if(id === ""){
        idhelp.innerHTML = "아이디를 입력하세요";
        idhelp.classList.add('warn');
        return;
    }else{
        idhelp.innerHTML = "";
        idhelp.classList.remove('warn');
    }
    if(pw === ""){
        pwhelp.innerHTML = "비밀번호를 입력하세요";
        pwhelp.classList.add('warn');
        return;
    }else{
        pwhelp.innerHTML = "";
        pwhelp.classList.remove('warn');
    }
    let res = await fetch('/user/login',{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            id:id,
            pw:pw
        })
    })
    let data = await res.json();
    if(data.result === "success"){
        document.cookie = `accessToken=${data.accessToken}; Expires=${expTimeA}; path='/login';`;
        document.cookie = `refreshToken=${data.refreshToken}; Expires=${expTimeR}; path='/'`;
        window.location.href ='/'
    }

}

btn.addEventListener('click', login)