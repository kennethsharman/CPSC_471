/**
 * This is the main front end code.
 * 
 * We might want to split this up per view, such as for one for
 * * logging in
 * * admin view
 * * customer view
 * 
 *  depending on what the UX dictates
 * 
 */


{ // local scope
    const GREETING = "Hello World"
    /*
        Instead of navigating to different pages, since we're doing
        a web app, we can use JQuery as such:
        $(containerID).html(newContent)

        to display other content

        the alternative is to use something like React, but that's
        another learning curve
    */
    $('#main-bar').html(`
        <p>${GREETING}. Click this button to continue</p>
        <button type="btn btn-primary" id='test-btn'>
            Test it out
        </button>
    `)

    // jquery event listeners - moslty for clicking buttons
    $(document).on('click', '#test-btn', event => {
        event.preventDefault()

        const success = request => {
            console.log(request.response)
        }

        const error = request => {
            console.log(request)
        }

        // calling the back end - see request.js and functions/index.js
        requestService(`/echo`, "POST", {
            msg: "abc"
            }, success, error)
    })

}
