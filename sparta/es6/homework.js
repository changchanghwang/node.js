let personArray = [
    {"name": "John Doe", "age": 20},
    {"name": "Jane Doe", "age": 19},
];

// 위에서 배운 4가지 for문을 이용해서 아래 문장을 출력해봅시다 (console.log)
for(let i=0; i<personArray.length; i++){
    console.log(`His name is ${personArray[i]['name']}. He is ${personArray[i]['age']}`);
}
for(let person of personArray){
    console.log(`His name is ${person.name}. He is ${person.age}`);
}
for(let person in personArray){
    console.log(`His name is ${personArray[person]['name']}. He is ${personArray[person]['age']}`);
}
personArray.forEach((person)=>console.log(`His name is ${person.name}. He is ${person.age}`))

// His/her name is John Doe. He/She is 20 years old.
// His/her name is Jane Doe. He/She is 19 years old.


function isEven(n) { 
    // n이 짝수면 true, 홀수면 false 를 반환하는 함수를 만들어 봅시다
    if(n%2 === 0){
        return true;
    }else{
        return false;
    }
  }
  function isOdd(n) { 
    // 반대로 n이 홀수면 true, 짝수면 false 를 반환하는 함수를 만들어 봅시다
    if(n%2 === 1){
        return true;
    }else{
        return false;
    }
  }
  
  console.log(isEven(10)); // true
  console.log(isEven(3)); // false
  console.log(isOdd(5)); // true
  console.log(isOdd(8)); // false



personArray = [
    {"name": "Mark Bae", "age": 30},
    {"name": "John Doe", "age": 20},
    {"name": "Jane Doe", "age": 19},
];

function checkName(person) {
    // 사람의 이름이 "John Doe" 일때만 true 를 리턴해주도록 합시다.
    if(person.name == "John Doe"){
        return true;
    }else{
        return false;
    }
}

for (let person of personArray) {
	if (checkName(person)) {
		console.log("Here is your beer! ", person["name"]);
	} else {
		console.log("Get out! ", person["name"]);
	}
}



personArray = [
    {"name": "John Doe", "age": 10},
    {"name": "Jane Doe", "age": 29},
    {"name": "Fred Doe", "age": 13},
    {"name": "Chris Doe", "age": 22},
    {"name": "Layla Doe", "age": 8},
];

function getChildrens(personArray) {
	// 20세이하의 사람들만 배열로 반환해봅시다
    array =[];
    personArray.forEach((person)=>{
        if(person['age'] <=20){
            array.push(person)
        }
    })
    return array;
}

console.log(getChildrens(personArray)); 
// [
// 	{"name": "John Doe", "age": 10},
// 	{"name": "Fred Doe", "age": 13},
//  {"name": "Layla Doe", "age": 8},
// ]