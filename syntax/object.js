const { access } = require("fs");

//배열
let member = ['hwang', 'chang', 'hwan'];
console.log(member[1]);
for(i=0; i<member.length; i++){
    console.log('array loop', member[i]);
}

let roles = {
    'programmer':'hwang',
    'designer' : 'chang',
    'manager' : 'hwan'
}
console.log(roles.designer);
console.log(roles['designer']);

for(a in roles){
  console.log('object', a, 'value => ', roles[a]);
}