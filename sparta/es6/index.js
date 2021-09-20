let age = 20;
// console.log(age);

let name = "hwang";
// console.log(name);

let personArray = ['hwang', 'chang', 'hwan'];
// console.log(personArray);

let personDictOb = [{
    first:'hwang',
    'second':'chang',
    third:'hwan',
    age:27
}, {
    first:'hwang',
    'second':'chang',
    third:'hwan',
    age:18
}
]
// console.log(personDictOb['age']);
// console.log(personDictOb.age);


if(personDictOb['age']>19){
    // console.log('beer');
}else{
    // console.log('coke');
}

personArray.forEach(b => {
    // console.log(b);
});

function isValidAge(person){
    if (person['age'] > 19){
        return true;
    }else{
        return false;
    }
}

for (let i=0; i<personDictOb.length; i++){
    console.log(personDictOb[i]['age']);
    if (isValidAge(personDictOb[i])){
        console.log('Beer');
    }else{
        console.log('coke');
    }
}