var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id);
    }
}
let id = "not awesome";
obj.cool();
setTimeout(obj.cool, 2000);