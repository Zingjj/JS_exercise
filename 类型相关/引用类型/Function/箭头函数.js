let obj = {
    name: 18,
    sayhi: () => {
        console.log(this.age);
    }
}
obj.sayhi();