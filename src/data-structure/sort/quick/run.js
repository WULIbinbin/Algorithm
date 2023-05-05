import QuickSort from './index'
import { init } from './view';

const random = (i)=>{
  const r = []
  let k = 0
  while(i>++k){
      r.push(Math.ceil(Math.random()*80)+1)
  }
  return r
}

const li = random(40)

console.log('原数组:',li)

const arr = QuickSort(li)

console.log('排序后:',arr)
init(li)
