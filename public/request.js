// interface with backend

const requestService = (url, method, params, success, error) => {
    console.log("URL", url)
    console.log("METHOD", method)
    console.log("PARAMS", params)

    console.log(JSON.stringify(params))

    let req = new XMLHttpRequest()
    
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log('success!')
            success(this)
        }
        else if(this.readyState==4) {
            console.log("ERROR")
            console.log("STATUS:", this.status)
            console.log("MSG:", this.statusText)
            error(this)
        }
    }

    req.open(method,`https://us-central1-seng471project.cloudfunctions.net/app${url}`,true)
    req.setRequestHeader("Content-Type", "application/json")
    req.setRequestHeader('Access-Control-Allow-Headers', '*')
    req.setRequestHeader('Access-Control-Allow-Origin', `https://seng471project.firebaseapp.com/`)
    req.send(JSON.stringify(params))
}