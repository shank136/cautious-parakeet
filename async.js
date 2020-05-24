const getData = () => {
    setTimeout(() => {
        console.log('getData')
    }, 3000)
}

console.log('Hello world')
console.log('hey there')

setTimeout(() => {
    getData();
    console.log('inside setTimeout')
}, 3000)