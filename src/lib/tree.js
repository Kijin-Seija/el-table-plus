/*
 * 树形结构相关方法
 * 使用方式 tree(data).method1().method2()...
 * 除特别声明外，每个方法都返回Tree对象或Tree对象数组
 * tree.src - Tree对象实际存储的数据结构
 * tree.childrenKey - 子节点key，默认为children
 * 
 * TODO：移到公共组件库
 */


function findRecursive(arr, fn, childrenKey) {
  for (let item of arr) {
    if (fn(item)) return item;
    else if (item[childrenKey]) {
      let childrenResult = findRecursive(item[childrenKey], fn, childrenKey);
      if (childrenResult) return childrenResult;
    }
  }
  return null;
}

let pathList = [];
function findPathRecursive(arr, fn, childrenKey) {
  for (let item of arr) {
    pathList.push(item);
    if (fn(item)) return pathList;
    else if (item[childrenKey]) {
      let childrenResult = findPathRecursive(item[childrenKey], fn, childrenKey);
      if (childrenResult) return childrenResult;
    } else {
      pathList.pop();
    }
  }
  return null;
}

let flattenList = [];
function flattenRecursive(arr, childrenKey) {
  for (let item of arr) {
    flattenList.push(item);
    if (item[childrenKey]) flattenRecursive(item[childrenKey], childrenKey);
  }
}

/**
 * tree.src - Tree对象实际存储的数据结构
 * tree.childrenKey - 子节点key，默认为children
 */
class Tree {
  constructor(arrOrObj, childrenKey = 'children') {
    this.src = arrOrObj;
    this.childrenKey = childrenKey;
  }

  /**
   * 查找树中的一项
   * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
   * @returns {Tree} 查找结果子树
   */
  find(fn) {
    let arr = this.src instanceof Array ? this.src : [this.src];
    return new Tree(findRecursive(arr, fn, this.childrenKey), this.childrenKey);
  }

  /**
   * 查找树中到某一项所经过的路线
   * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
   * @returns {Array<Tree>} 到所查找项的路径节点数组，由上层至下层。
   * 例： [1, 2:[3, 4, 5: [6, 7]]] 查找7 会返回 [1, 2, 5, 7]
   */
  findPath(fn) {
    let arr = this.src instanceof Array ? this.src : [this.src];
    pathList = [];
    let result = findPathRecursive(arr, fn, this.childrenKey);
    if (result) return result.map(item => new Tree(item, this.childrenKey));
    else return [];
  }

  // findPathTree(fn) {
  //   // TODO 查找树中到某一项所经过的路线并返回该路线形成的树
  // }
  flatten() {
    let arr = this.src instanceof Array ? this.src : [this.src];
    flattenList = [];
    flattenRecursive(arr, this.childrenKey)
    return flattenList.map(item => new Tree(item, this.childrenKey));
  }
}

export default function (arrOrObject, childrenKey = 'children') {
  return new Tree(arrOrObject, childrenKey);
}

