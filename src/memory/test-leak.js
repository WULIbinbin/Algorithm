let arr = [];
let content = document.getElementById('content');
function closures() {
  let test = new Array(1000).fill('isboyjc');

  return function () {
    return test;
  };
}

document.getElementById('click').addEventListener('click', function () {
  arr.push(closures());
  arr.push(closures());

  content.innerHTML = arr.length;
});
