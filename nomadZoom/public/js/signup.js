const idinput = document.getElementsByClassName('id')[0];
const pwinput = document.getElementsByClassName('pw')[0];
const pwinput2 = document.getElementsByClassName('pw2')[0];
const idhelp = document.getElementsByClassName('help-id')[0];
const pwhelp = document.getElementsByClassName('help-pw')[0];
const pwhelp2 = document.getElementsByClassName('help-pw2')[0];
const btn = document.getElementsByClassName('btn')[0];
const checkBtn = document.getElementsByClassName('dup-check')[0];

// //아이디 정규표현식
// function is_nickname(asValue) {//아이디를 벨류값으로 받아옴
//     //a~z,A~Z까지는 필수조건, a~z,A~Z,0~9,2~10글자
//     var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
//     //regExp로 벨류를 test해줌 (boolean값을 반환)
//     return regExp.test(asValue);
// }
// //비밀번호 정규표현식
// function is_password(asValue) {
//     //정수,a~z,A~Z는 필수조건, 0~9,a~z,A~Z,!@#$%^&*은 선택조건, 8~20글자
//     var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
//     //regExp로 벨류를 test
//     return regExp.test(asValue); //
// }

async function check_dup(){
    let id = idinput.value;

    if(id === ""){
        idhelp.innerHTML = "아이디입력."
        idhelp.classList.add('warn');
        idhelp.classList.remove('pass');
        return
    }else{
        idhelp.innerHTML = ""
        idhelp.classList.remove('warn');
        
        let res = await fetch('/user/checkDup',{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            //객체를 문자열화 해줌
            body: JSON.stringify({
                id:id
            })
        })
        if(res.status === 200){
            let data = await res.json()
            if(data.result === "pass"){
                idhelp.innerHTML = "사용가능한 아이디.";
                idhelp.classList.add('pass');
                idhelp.classList.remove('warn');
                return;
            }else{
                idhelp.innerHTML = "중복";
                idhelp.classList.add('warn');
                idhelp.classList.remove('pass');
                return;
            }
        }

        // .then((res)=>{
        //     return res.json();
        // }).then((res)=>{
        //     if(res.result == "pass"){
        //         idhelp.innerHTML = "사용가능한 아이디.";
        //         idhelp.classList.add('pass');
        //         idhelp.classList.remove('warn');
        //         return;
        //     }else{
        //         idhelp.innerHTML = "중복";
        //         idhelp.classList.add('warn');
        //         idhelp.classList.remove('pass');
        //     }
        // })
    }
}

async function signup(){
    let id = idinput.value;
    let pw = pwinput.value;
    let pw2 = pwinput2. value;
    if(idhelp.classList.contains('warn')){
        idhelp.innerHTML = "다시 중복체크하길";
        idinput.focus();
        return;        
    }else if(!idhelp.classList.contains('pass')){
        idhelp.innerHTML = "중복체크를 해주세요";
        idhelp.classList.add('warn');
        idinput.focus();
        return;
    }
    if(pw ===""){
        pwhelp.innerHTML = "패스워드입력";
        pwhelp.classList.add('warn');
        pwhelp.classList.remove('pass');
        pwinput.focus();
        return;
    }else if(pw !== pw2){
        pwhelp2.innerHTML = "패스워드 재확인"
        pwhelp2.classList.add('warn');
        pwhelp2.classList.remove('pass');
    }else{
        let res = await fetch('/user/signup', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                id:id,
                pw:pw
            })
        })
        let data = await res.json();
        if(data.result === "success"){
            alert('회원가입을 축하드립니다')
            window.location.href = "/user/login"
        }else if(data.result === "dup"){
            alert("중복중복중복중복중복중복")
        }
    }
}

btn.addEventListener('click', signup);
checkBtn.addEventListener('click',check_dup)