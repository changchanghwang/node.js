async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000)
    });
  
    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
  
    console.log(result); // "완료!"
  }
  
  f();