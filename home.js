let posts = document.getElementById("posts")
//let editposttitle = document.getElementById("editpost-title").value
//let editpostbody = document.getElementById("editpost-body").value
//let editpostphoto = document.getElementById("editpost-photo").files[0]
let newt;
let loader = document.getElementById("loader")
let lastpage;
let ount;
let b = 2;



window.onscroll = function() {
    
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && b < lastpage) {
        
        getposts(b)
        b++
    }
   }

getposts(1)
//
function getposts(n) {
            axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=10&page=${n}`).then((json,) => {
            data = json.data.data
            console.log(data)
            
            data.forEach(p => {
                
            posts.innerHTML += `
            <div class="card mb-5">
                            <h5 class="card-header d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;border: 1px solid rgb(189, 189, 189); margin-right: 10px;">
                                            <a href="#" style="text-decoration: none;" onclick="gotoprofile('${p.author.id}')"><img style="width: 100%; height: 100%;" src="${p.author.profile_image || "gold.png"}" alt=""></a>
                                        </div>
                                        <div style="margin-right: 10px;">
                                            <a href="#" style="text-decoration: none;color:rgb(72, 72, 255)" onclick="gotoprofile('${p.author.id}')"><strong>@${p.author.username}</strong></a>
                                        </div>
                                </div>   
                                <a id="editpost-ptn" href="#" style="display:none" class="btn btn-outline-info" onclick="editpost('${p.title}', '${p.body}', '${p.image}','${p.id}')">Edit</a>
                            </h5>
                            <div class="card-body" onclick="goto(${p.id})" style="cursor:pointer;">
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
                                    <span id="tags-${p.id}">
                                        
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
            `
            /*if(localStorage.username != null) {
                let user = JSON.parse(localStorage.username)
                if(user.id === p.author.id) {
                    document.getElementById("editpost-ptn").style.display = "inline"
                }
            }*/
            let tags = document.getElementById(`tags-${p.id}`)
            let t = p.tags

            t.forEach(() => {
                tags.innerHTML += `
                <a href="#" style="margin-left:10px; border-radius: 20px;background-color: rgb(78, 78, 78); padding:5px" class=" text-light btn">${t.name}</a>
                `
            })
            
            
            });
            
            //
            lastpage = json.data.meta.last_page;
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

function goto(id) {
    window.location = `postdetails.html?postId=${id}`
}
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
        ////////////////////////////////////////
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
        /////////////////////////////////////////
        console.log(error)
    })
}
function gotoprofile(id) {
    window.location = `profile.html?userid=${id}`
}