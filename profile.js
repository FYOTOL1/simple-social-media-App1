let userprofile = document.getElementById("userprofile")
let posts = document.getElementById("posts")
let btnin;
let url = new URLSearchParams(window.location.search)
let urlid = url.get("userid")
console.log(urlid)

if(urlid != null) {
    getuserf()
} else {
    getuserh()
}


function getuserh() {
    if(localStorage.username != null) {
    let data = JSON.parse(localStorage.username);
    userprofile.innerHTML = `
                <div style="padding: 10px;;background-color: rgb(206, 206, 206); width: 100%; display: flex; align-items: center;flex-wrap: wrap; justify-content: space-between;">
                    <div class="d-flex align-items-center">
                        <div style="padding: 10px;border-radius: 50%;overflow: hidden;;background-color: white;width: 100px; height: 100px; margin-right: 10px;">
                            <img style="width: 100%; height: 100%;" src="${data.profile_image}" alt="">
                        </div>
                        <strong>@${data.username}</strong>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3" style="padding: 10px;background-color: antiquewhite;">
                    <h2 style="font-size: 1rem;"><span style="color:rgb(67, 199, 137)">${data.posts_count}</span> Posts</h2>
                    <h2 style="font-size: 1rem;"><span style="color:rgb(67, 199, 137)">${data.comments_count}</span> Comments</h2>
                </div>
        `
    getposts(data.id)
    btnin.style.display = "inline"
} else {
    posts.innerHTML = ""
    userprofile.innerHTML = `<h3 style="margin-top: 50px;">Please Login To Access This Page</h3>`
}
}
function getuserf() {
    axios.get(`https://tarmeezacademy.com/api/v1/users/${urlid}`).then((response) => {
        console.log(response)
        let data = response.data.data
        userprofile.innerHTML = `
                <div style="padding: 10px;;background-color: rgb(206, 206, 206); width: 100%; display: flex; align-items: center;flex-wrap: wrap; justify-content: space-between;">
                    <div class="d-flex align-items-center">
                        <div style="padding: 10px;border-radius: 50%;overflow: hidden;background-color: white;width: 100px; height: 100px; margin-right: 10px;">
                            <img style="width: 100%; height: 100%;" src="${data.profile_image}" alt="">
                        </div>
                        <strong>@${data.username}</strong>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3" style="padding: 10px;background-color: antiquewhite;">
                    <h2 style="font-size: 1rem;"><span style="color:rgb(67, 199, 137)">${data.posts_count}</span> Posts</h2>
                    <h2 style="font-size: 1rem;"><span style="color:rgb(67, 199, 137)">${data.comments_count}</span> Comments</h2>
                </div>
        `
        getposts(data.id)
    }).catch((error) => {
        userprofile.innerHTML = ``
        posts.innerHTML = ""
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
    })
}

function getposts(id) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts`).then((json,) => {
    posts.innerHTML = ""
    data = json.data.data
    console.log(data)
    data.forEach(p => {
    if(p.author.id == id) {
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
              btnin = document.getElementById("editpost-ptn").style.display = "inline"
              btnin = document.getElementById("editpost-ptn")
            }
        }*/
        let tags = document.getElementById(`tags-${p.id}`)
        let t = p.tags

        t.forEach(() => {
            tags.innerHTML += `
            <a href="#" style="margin-left:10px; border-radius: 20px;background-color: rgb(78, 78, 78); padding:5px" class=" text-light btn">${t.name}</a>
            `
        })
    
}
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
