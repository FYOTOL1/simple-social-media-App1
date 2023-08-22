let songup = document.getElementById("signup-btn")
let login = document.getElementById("login")
let loginui = document.getElementById("login-ui")
let signupui = document.getElementById("signupui")
let logout = document.getElementById("logout")
let profilelogo = document.getElementById("profile-logo")
let add = document.getElementById("add")
let addpostbtn = document.getElementById("addpost-btn")
let imgprofile = document.getElementById("img-profile")
let usernamelogo = document.getElementById("username-logo")


setui()
getuser()



function getuser() {
    let user = JSON.parse(localStorage.username)
    imgprofile.src = user.profile_image || "k.png"
    usernamelogo.innerHTML = user.username
}

function opop()  {
    document.getElementById("loadingbtn-reg").style.display = "inline"
    document.getElementById("signup-btn").style.display = "none"
    let signupfullname = document.getElementById("signup-fullname").value
    let signupusername = document.getElementById("signup-username").value
    let signupemail = document.getElementById("signup-email").value
    let signuppassword = document.getElementById("signup-password").value
    let signupimg = document.getElementById("signup-img").files[0]
    let formdata = new FormData()
    formdata.append("name", signupfullname)
    formdata.append("username", signupusername)
    formdata.append("email", signupemail)
    formdata.append("password", signuppassword)
    formdata.append("image", signupimg)

    axios.post("https://tarmeezacademy.com/api/v1/register",formdata).then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", JSON.stringify(response.data.user))
        let registermodel = document.getElementById("signup")
        let modelhide = bootstrap.Modal.getInstance(registermodel)
        modelhide.hide()
        setui()
        /////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`Welcome ${signupusername}, Your Account Has Created Successfully`, 'success')
        getuser()
        //////////////////////////////////////////////
        document.getElementById("loadingbtn-reg").style.display = "none"
        document.getElementById("signup-btn").style.display = "inline"
    })
    .catch((error) => {
        document.getElementById("loadingbtn-reg").style.display = "none"
        document.getElementById("signup-btn").style.display = "inline"
        //////////////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`${error.message}`, 'danger')
        ////////////////////////////////////////////////
    })
}
function loginn() {
    document.getElementById("loadingbtn-login").style.display = "inline"
    document.getElementById("login").style.display = "none"
    let loginusername = document.getElementById("login-username").value
    let loginpassword = document.getElementById("login-password").value
    /*fetch("https://tarmeezacademy.com/api/v1/login",  {
        method : "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: {
            "username" : "yarob",
            "password" : "HelloWorld"
        }
    }).then((response) => {
        console.log(response)
        return response.json()
    }).then((json) => {
        console.log(json)
    }).catch((error) => {
        console.log(error.message)
    })*/
    
    axios.post("https://tarmeezacademy.com/api/v1/login", {
        "username" : loginusername,
        "password" : loginpassword
    }).then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", JSON.stringify(response.data.user))
        let loginmodel = document.getElementById("login-model")
        let modelhide = bootstrap.Modal.getInstance(loginmodel)
        modelhide.hide()
        setui()
        /////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`Hello ${response.data.user.username}, Welcome Back`, 'success')
        getuser()
        //////////////////////////////////////////////
        document.getElementById("loadingbtn-login").style.display = "none"
        document.getElementById("login").style.display = "inline"
    })
    .catch((error) => {
        document.getElementById("loadingbtn-login").style.display = "none"
        document.getElementById("login").style.display = "inline"
        /////////////////////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`${error.message}`, 'danger')
        ////////////////////////////////////////////////////////
    })

    //console.log(loginusername, loginpassword)
}
function setui() {
    let token = localStorage.getItem("token")
    if (token != null) {
        loginui.style.display = "none"
        signupui.style.display = "none"
        logout.style.display = "inline"
        add.style.display = "inline"
        profilelogo.style.display = "inline"
        profilelogo.classList.add("d-flex")
    } else {
        loginui.style.display = "inline"
        signupui.style.display = "inline"
        logout.style.display = "none"
        add.style.display = "none"
        profilelogo.style.display = "none"
        profilelogo.classList.remove("d-flex")
    }
}

logout.onclick = () => {
    let y = JSON.parse(localStorage.username)
    ////////////////////////////////////////////////////////////////////
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    
    alertPlaceholder.append(wrapper)
    }
    appendAlert(`Good Bye ${y.username}, See You Later`, 'info')
    /////////////////////////////////////////////////////////////////////////////
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setui()
    getuser()
    let alerthide = bootstrap.Alert.getOrCreateInstance("#liveAlertPlaceholder")
}

addpostbtn.onclick = () => {
    document.getElementById("loadingbtn-add").style.display = "inline"
    document.getElementById("addpost-btn").style.display = "none"
    let addtitle = document.getElementById("add-title").value
    let addbody = document.getElementById("add-body").value
    let addphoto = document.getElementById("add-photo").files[0]
    let token = localStorage.token
    let formdata = new FormData()
    formdata.append("title", addtitle)
    formdata.append("body", addbody)
    formdata.append("image", addphoto)

    axios.post("https://tarmeezacademy.com/api/v1/posts", formdata, {
        headers : {
            "Content-Type" : "multipart/form-data",
            "authorization" : `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response)
        //localStorage.setItem("token", response.data.token)
        let loginmodel = document.getElementById("addpost")
        let modelhide = bootstrap.Modal.getInstance(loginmodel)
        modelhide.hide()
        setui()
        /////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`Your Post has been successfully created`, 'success')
        //////////////////////////////////////////////
        posts.innerHTML = "";
        getposts(1)
        document.getElementById("loadingbtn-add").style.display = "none"
        document.getElementById("addpost-btn").style.display = "inline"
    })
    .catch((error) => {
        document.getElementById("loadingbtn-add").style.display = "none"
        document.getElementById("addpost-btn").style.display = "inline"
        /////////////////////////////////////////////////////
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
        }
        appendAlert(`${error.message}`, 'danger')
        ////////////////////////////////////////////////////////
    })
}
