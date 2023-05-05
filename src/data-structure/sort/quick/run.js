import QuickSort from './index'

const random = (i)=>{
  const r = []
  let k = 0
  while(i>++k){
      r.push(Math.ceil(Math.random()*100)+1)
  }
  return r
}

const li = random(30)

console.log('原数组:',li)

const arr = QuickSort(li)

console.log('排序后:',arr)
