let posts = document.getElementById("post")
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
let commentshow = document.getElementById("comment-show")
let btnment = document.getElementById("btn-ment")
let url = new URLSearchParams(window.location.search)
let urlid = url.get("postId")
console.log(urlid)

getposts(urlid)
getuser()
setui()

function getposts(n) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${n}`).then((json,) => {
    p = json.data.data
    posts.innerHTML = `
    <h1 style="margin-bottom: 30px;">${p.author.username} Post</h1>
    <div class="card mb-5">
                    <h5 class="card-header d-flex align-items-center">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;border: 1px solid rgb(189, 189, 189); margin-right: 10px;">
                            <img style="width: 100%; height: 100%; " src="${p.author.profile_image || "gold.png"}" alt="">
                        </div>
                        <div style="margin-right: 10px;">
                            <strong>@${p.author.username}</strong>
                        </div>
                    </h5>
                    <div class="card-body" >
                        <img style="width: 100%; " src="${p.image}" alt="">
                        <small class="mt-1" style="color: rgb(112, 112, 112);">${p.created_at}</small>
                        <h5 class="card-title mt-3">${p.title || ""}</h5>
                        <p class="card-text">${p.body}</p>
                        <hr>
                        <div id="tags" class="d-flex">
                            <span>
                                <i class="fas fa-pen"> </i>
                            </span>
                            
                            <p style="margin-left: 5px;"><span>${p.comments_count} </span>Comments</p>
                            <span id="tags">
                                
                            </span>
                            
                          
                            
                        </div>
                        <div id="showments" class=" p-3" style="margin-top:50px">
                                
                                
                        </div>
                        <div id="comment-show">
                            <input type="text" class="form-control" id="comment" >
                            <a id="btn-ment" href="#" class="btn btn-primary mt-3 text-align-right" onclick="uouo()">Comment</a>
                        </div>
                    </div>
                </div>

    `
    let ments = document.getElementById(`showments`)
    let hkl = p.comments
    hkl.forEach((ment) => {
        ments.innerHTML += `
                    <div class="mb-3">
                        <div class="d-flex mb-1 align-items-center">
                            <div style="width: 40px; height: 40px; margin-right: 10px;border-radius: 50%; overflow: hidden;">
                                <img class="w-100" src="${ment.author.profile_image}" alt="">
                            </div>
                            <strong>${ment.author.username}</strong>
                        </div>
                        <div>
                            <p>${ment.body}</p>
                        </div>
                    </div>
                    <hr>
        `
    })
    let tags = document.getElementById(`tags`)
    let t = p.tags
    t.forEach((tag) => {
        tags.innerHTML += `
        <a href="#" style="margin-left:10px; border-radius: 20px;background-color: rgb(78, 78, 78); padding:5px" class=" text-light btn">${tag.name}</a>
        `
    })
    
    
    //console.log()
    }).catch((error) => {
    console.log(error)
    })
}

function opop()  {
    console.log("sonffg")
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
        //////////////////////////////////////////////
    })
    .catch((error) => {
        console.log(error.response.data.message)
    })
}
login.onclick = () => {
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
        //////////////////////////////////////////////
    })
    .catch((error) => {
        console.log(error.response.data.message)
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
        commentshow.style.display = "inline"
    } else {
        loginui.style.display = "inline"
        signupui.style.display = "inline"
        logout.style.display = "none"
        add.style.display = "none"
        profilelogo.style.display = "none"
        profilelogo.classList.remove("d-flex")
        commentshow.style.display = "none"
    }
}
function getuser() {
    let user = JSON.parse(localStorage.username)
    imgprofile.src = user.profile_image || "k.png"
    usernamelogo.innerHTML = user.username
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
    let alerthide = bootstrap.Alert.getOrCreateInstance("#liveAlertPlaceholder")
}

addpostbtn.onclick = () => {
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
    })
    .catch((error) => {
        console.log(error.response.data.message)
    })
    
}

function uouo() {
    console.log("response")
    let comment = document.getElementById("comment").value
    let token = localStorage.token;
    let bodys = {
        "body": comment
    }
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${urlid}/comments`, bodys, {
        headers : {
            "Accept" : "application/json",
            "authorization" : `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response)
        getposts(urlid)
    }).catch((error) => {
        console.log(error)
    })

}

