// most of the code would go here

$('#main-bar').html(`
    <p>Hello World. Click this button to continue</p>
    <button type="btn btn-primary" id='test-btn'>
        Test it out
    </button>
`)

$(document).on('click', '#test-btn', event => {
    event.preventDefault()

    const success = request => {
        console.log(request.response)
    }

    const error = request => {
        console.log(request)
    }

    // calling the back end
    requestService(`/echo`, "POST", {
        msg: "abc"
        }, success, error)
})
