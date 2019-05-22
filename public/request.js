// interface with backend

const deployment = false

const requestService = (url, method, params, success, error) => {
    const serverURL = deployment? `https://us-central1-seng471project.cloudfunctions.net/app`: `http://localhost:5001/seng471project/us-central1/app`


    console.log("URL", url)
    console.log("METHOD", method)
    console.log("PARAMS", params)

    console.log(JSON.stringify(params))

    let req = new XMLHttpRequest()
    
    // interfaces response from back end
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

    req.open(method,`${serverURL}${url}`,true) // backend
    req.setRequestHeader("Content-Type", "application/json")
    req.setRequestHeader('Access-Control-Allow-Headers', '*')
    req.setRequestHeader('Access-Control-Allow-Origin', `*`) // front end
    req.send(JSON.stringify(params))
}