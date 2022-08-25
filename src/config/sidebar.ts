export default [
  {
    name: "仪表盘",
    to: "/index",
  },
  {
    name: "数据结构",
    to: "/data-structures",
    children: [
      {
        name: "数组",
        to: "/data-structures/array",
      },
      {
        name: "树",
        to: "/data-structures/tree",
      },
    ],
  },
  {
    name: "算法",
    to: "/algorithm",
    children: [
      {
        name: "排序",
        to: "/algorithm/sort",
      },
    ],
  },
];
