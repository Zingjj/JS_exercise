/**
 * 先序遍历
 * @param {TreeNode} node 
 * @returns 
 */
function preOrder(node) {
    if (!node) {
        return;
    }
    visit(node);
    preOrder(node.left);
    preOrder(node.right);
}
/**
 * 中序遍历
 * @param {TreeNode} node 
 * @returns 
 */
function inOrder(node) {
    if (!node) {
        return;
    }
    inOrder(node.left);
    visit(node);
    inOrder(node.right);
}

/**
 * 后序遍历
 * @param {TreeNode} node 
 * @returns 
 */
function postOrder(node) {
    if (!node) return;
    postOrder(node.left);
    postOrder(node.right);
    visit(node);
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


/**
 * n*n 的矩阵，代表一个迷宫，[0,0], [n,n]
 * 判断是否有一条通路可以从出口到入口？递归形式、非递归形式
 */
var exist = function (board) {
    if (board.length <= 0) return false;
    // 初始化一个visited数组来表示位置是否访问过
    let visited = new Array(board.length).fill(0).map(() => new Array(board.length).fill(false));
    return DFS(0, 0);
    /**
     * 
     * @param {number} i 行标
     * @param {number} j 列标
     */
    function DFS(i, j) {
        // 终止条件
        // 行或列索引越界
        if (i >= board.length || i < 0
            || j < 0 || j >= board[i].length) return false;
        // 如果当前位置是迷宫中的障碍
        if (board[i][j] == 1) return false;
        // 当前矩阵元素已访问过(visited[i][j]==true)
        if (visited[i][j]) return false;
        // 访问当前位置
        visited[i][j] = true;
        if (i == board.length - 1 && j == board.length - 1) return true;
        // 上，下，左，右
        let res = (DFS(i - 1, j) || DFS(i + 1, j)
            || DFS(i, j - 1) || DFS(i, j + 1))
        // 恢复该位置为未访问过的状态
        visited[i][j] = false;
        return res;
    }
};

var exist = function (board) {
    const n = board.length;
    if (n <= 0) return false;
    // 初始化一个visited数组来表示位置是否访问过
    let visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
    return BFS(0, 0);
    function BFS() {
        let queue = [];
        queue.push([0, 0]);
        visited[0][0] = true;
        while (q.length) {
            let curPos = queue.shift();
            // 判断迷宫出口
            if (curPos === [n - 1, n - 1]) return true;
            // 判断是否越界
            if (curPos[0] >= board.length || curPos[0] < 0
                || curPos[1] < 0 || curPos[1] >= board[i].length) return false;
            // 将当前位置的上下左右方向分别放入队列中
            // 上:
            tryToVisit(i - 1, j);
            // 下:
            tryToVisit(i + 1, j);
            // 左
            tryToVisit(i, j - 1);
            // 右
            tryToVisit(i, j + 1);
        }
        return false;
    }
    function tryToVisit(i, j) {
        if (!visited[i][j]) {
            visited[i][j] = true;
            queue.push([i, j]);
        }
    }
}