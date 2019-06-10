const state = (name, value) => {
    switch(value) {
        // When null passed, clear the item from local storage
        case null:
            localStorage.removeItem(name)
            break
        // When undefined, return the value from local storage
        case undefined:
            const result = localStorage.getItem(name)
            return JSON.parse(result)
        // Otherwise set the value for the given key
        default:
            const obj = typeof(value)==='object'? JSON.stringify(value): value
            localStorage.setItem(name, obj)
            return obj
    }
}