// function getAgeAverage(personArray) {
// 	var average = 0;
//     for(let i=0; i<personArray.length; i++){
//         average+=personArray[i]['age'];
//     }
//     average/=personArray.length;
// 	return average;
// }

// var personArray = [
// 										{"name": "John Doe", "age": 20},
// 										{"name": "Jane Doe", "age": 19},
// 										{"name": "Fred Doe", "age": 32},
// 										{"name": "Chris Doe", "age": 45},
// 										{"name": "Layla Doe", "age": 37},
// 									];
// console.log(getAgeAverage(personArray)); // 30.6

let personArray = [
    {"name": "John Doe", "age": 20},
    {"name": "Jane Doe", "age": 19},
    {"name": "Fred Doe", "age": 32},
    {"name": "Chris Doe", "age": 45},
    {"name": "Layla Doe", "age": 37},
];

// personArray의 나이 평균을 구해주는 Arrow Function을 작성해봅시다.
const getAgeAverage = (personArray) => {
    let average = 0;
    personArray.forEach((ob) =>{
        average += ob.age;
        console.log(average)
    })
    average /= personArray.length;
    return average;
}

console.log(getAgeAverage(personArray));