/**
 *  快速排序（Quick sort）
 *  ①首先，我们需要选择一个基准元素，通常选择第一个或最后一个元素作为基准元素。
    ②然后，我们定义两个指针 i 和 j，分别指向数组的左右两端。
    ③接下来，我们从右侧开始，向左移动 j 指针，直到找到一个小于或等于基准元素的值。
    ④然后，我们从左侧开始，向右移动 i 指针，直到找到一个大于或等于基准元素的值。
    ⑤如果 i 指针小于或等于 j 指针，交换 i 和 j 指针所指向的元素。
    ⑥重复步骤 3-5，直到 i 指针大于 j 指针，这时，我们将基准元素与 j 指针所指向的元素交换位置，将基准元素放到中间位置。
    ⑦接着，我们将数组分为两部分，左侧部分包含小于或等于基准元素的元素，右侧部分包含大于基准元素的元素。
    ⑧然后，对左右两部分分别进行递归调用快速排序，直到左右两部分只剩下一个元素。
    ⑨最终，整个数组就变得有序了。
    链接：https://juejin.cn/post/7203714680316592188
 */

export default function QuickSort(arr = []) {
  const len = arr.length - 1
  function sort(left, right) {
    if (left >= right) return
    let i = left
    let j = right
    const base = arr[left]
    while (i < j) {
      while (i < j && arr[j] >= base) {
        j--
      }
      if (i < j) {
        arr[i] = arr[j]
        i++
      }
      while (i < j && arr[i] <= base) {
        i++
      }
      if (i < j) {
        arr[j] = arr[i]
        j--
      }
    }
    arr[i] = base
    sort(left, i - 1)
    sort(i + 1, right)
  }
  sort(0, len)
  return arr
}

