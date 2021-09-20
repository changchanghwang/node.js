// const students = ['hwang', 'chang', 'hwan'];

// for (let student of students){ //배열의 값 뽑아내줌
//     console.log(student)
// }

// for (let index in students){  //배열의 순서를 뽑아내줌
//     console.log(index);
// }

// students.forEach((student)=>{ //forEach function안에 콜백함수.
//     console.log(student)
// })

function hello() {
	console.log("Hello function");
}

// 첫번째 arrow function
const arrowFunction = () => {
	console.log("Hello arrow function");
}

// 두번째 arrow function 코드블럭없을때.(한줄만 있을때)
const arrowFunctionWithoutReturn = () => console.log("Hello arrow function without return");

hello(); // Hello function
arrowFunction(); // Hello arrow function
arrowFunctionWithoutReturn(); // Hello arrow function without return


function a(){console.log('a')};
a = ()=>{console.log('a')};
