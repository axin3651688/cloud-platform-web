/**
 * 将list转换成树，必须要有对应的id和Pid，leaf，text,rootPid属性
 * @param data  数据
 * @param id    id在你的数据中的键
 * @param pid   pid在你的数据中的键
 * @param leaf  是否是叶子节点在你的数据中的键
 * @param text  标题在你数据中的键
 * @param rootPid  根节点
 * @returns {Array}   树形结构数据
 */
export function listToTreeNode ({ data, id = 'id', pid = 'pid', leaf = 'leaf', text = 'text', rootPid = '0' }) {
  if (!Array.isArray(data)) {
    throw Error('请传入正确的数组')
  }
  if (data.length === 0) {
    return []
  }
  const treeNodes = data.map(ele => {
    const treeNode = {}
    Object.assign(treeNode, ele)
    treeNode.key = ele[id]
    treeNode.isLeaf = ele[leaf] != '0'
    treeNode.title = ele.text
    treeNode.id = ele[id]
    treeNode.pid = ele[pid]
    treeNode.text = ele[text]
    treeNode.value = ele[id]
    treeNode.scopedSlots = {
      title: 'title'
    }
    return treeNode
  })
  return getChildTree(treeNodes, rootPid)
}

function getChildTree (data, pid) {
  const tree = []
  data.forEach(function (ele) {
    if (ele.pid === pid) {
      if (isParentNode(ele, data)) {
        ele.children = getChildTree(data, ele.id)
      }
      tree.push(ele)
    }
  })
  return tree
}

function isParentNode (node, list) {
  const result = list.filter(function (ele) {
    return ele.pid === node.id
  })
  return result.length !== 0
}