let posts = document.getElementById("post")
let btnment = document.getElementById("btn-ment")
let url = new URLSearchParams(window.location.search)
let urlid = url.get("postId")
console.log(urlid)

getposts(urlid)

function editpost(title, body, img, postid) {
    document.getElementById("editpost-title").value = title;
    document.getElementById("editpost-body").value = body;
    document.getElementById("editpost-photo").files[0] = img
    let editmodel = document.getElementById("editpost-model");
    let btn = new bootstrap.Modal(editmodel, {});
    btn.toggle();
    newt = postid;
    
}
function update() {
    document.getElementById("editbtn-loading").style.display = "inline"
    document.getElementById("editbtn").style.display = "none"
    let token = localStorage.token
    let formdata = new FormData()
    formdata.append("title", document.getElementById("editpost-title").value)
    formdata.append("body", document.getElementById("editpost-body").value)
    if(document.getElementById("editpost-photo").files.length != 0) {
        formdata.append("image", document.getElementById("editpost-photo").files[0])
    }
    
    formdata.append("_method", "put")
    
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${newt}`, formdata, {
        headers : {
            "Content-Type" : "multipart/form-data",
            "authorization" : `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response)
        let loginmodel = document.getElementById("editpost-model")
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
        appendAlert(`Your Post has been successfully Updated`, 'success')
        //////////////////////////////////////////////
        posts.innerHTML = "";
        getposts(1)
    })
    .catch((error) => {
        document.getElementById("editbtn-loading").style.display = "none"
        document.getElementById("editbtn").style.display = "inline"
        /////////////////////////////////////////////
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
        /////////////////////////////////////////////////
        console.log(error)
    })
}

function getposts(n) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${n}`).then((json,) => {
    p = json.data.data
    posts.innerHTML = `
    <h1 style="margin-bottom: 30px;">${p.author.username} Post</h1>
    <div class="card mb-5">
                    <h5 class="card-header d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;border: 1px solid rgb(189, 189, 189); margin-right: 10px;">
                                    <img style="width: 100%; height: 100%;" src="${p.author.profile_image || "gold.png"}" alt="">
                            </div>
                            <div style="margin-right: 10px;">
                                    <strong>@${p.author.username}</strong>
                            </div>
                        </div>   
                        <div>
                            <a id="editpost-ptn" href="#" style="display:none; maegin-right:10px" class="btn btn-outline-info" onclick="editpost('${p.title}', '${p.body}')">Edit</a>
                            <a id="delpost-ptn" href="#" style="display:none" class="btn btn-outline-danger" onclick="delpost()">Delete</a>
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
                        <div id="showments" class=" p-3" style="margin-top:50px;margin-bottom:20px">
                                
                                
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
    let commentshow = document.getElementById("comment-show")
    let showments = document.getElementById("showments")
    if(hkl.length == 0) {
        showments.style.display = "none"
    }
    if(localStorage.token != null) {
        commentshow.style.display = "inline"
    } else {
        commentshow.style.display = "none"
    }
    let user = JSON.parse(localStorage.username)
                if(user.id === p.author.id) {
                    document.getElementById("editpost-ptn").style.display = "inline"
                    document.getElementById("delpost-ptn").style.display = "inline"
                }
    //console.log()
    }).catch((error) => {
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
        console.log(error)
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
        console.log(error)
    })

}

function delpost() {
    let delmodel = document.getElementById("delpost-model");
    let btn = new bootstrap.Modal(delmodel, {});
    btn.toggle();
}
function delpostbtn() {
    document.getElementById("delbtn-loading").style.display = "inline"
    document.getElementById("delbtn").style.display = "none"
    let token = localStorage.token
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${urlid}`, {
        headers : {
            "Content-Type" : "multipart/form-data",
            "authorization" : `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response)
        let loginmodel = document.getElementById("delpost-model")
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
        appendAlert(`Your Post has been successfully Deleted`, 'success')
        //////////////////////////////////////////////
        posts.innerHTML = `
        <h1 style="margin-top: 50px; font-size: 4rem;text-align: center;">This Page Has Been Moved To Another Url or Deleted</h1>
        `;
        
    })
    .catch((error) => {
        document.getElementById("delbtn-loading").style.display = "none"
        document.getElementById("delbtn").style.display = "inline"
        ////////////////////////////////////////////
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
        ////////////////////////////////////////
        console.log(error)
    })
}