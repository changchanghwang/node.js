// array, object

// var i = if(true){
//     console.log(1)
// }
// 오류.

// var w = while(true){console.log(1)};
// 오류

let f = function (){
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f();

let a = [f];
a[0]();

let o = {
    func:f
}
o.func();