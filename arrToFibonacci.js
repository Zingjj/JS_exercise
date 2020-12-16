var splitIntoFibonacci = function (S, start = 0, prev = [], r = []) {
    if (start === S.length) return r.push(...prev), r.end = true
    for (var i = start, cur = 0; i < S.length; i++) {
        cur = cur * 10 + (S[i] | 0)
        console.log(cur);
        if (cur > Math.pow(2, 31) - 1) break
        if (prev.length === 2) {
            if (prev[0] + prev[1] === cur) {
                r.push(prev[0])
                if (splitIntoFibonacci(S, i + 1, [prev[1], cur], r) === true) return true
                r.pop()
            }
        } else if (i < S.length - 1) {
            prev.push(cur)
            if (splitIntoFibonacci(S, i + 1, prev.slice(), r) === true || cur === 0 || r.end) break
            prev.pop()
        }
    }
    return r
};

console.log(splitIntoFibonacci("11235813"));