function showHome() {

    const token = localStorage.getItem('token')
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log(payload);
    const idUser = payload.idUser
    document.getElementById("username-display").textContent = payload.username;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (post) => {
            let html = ``;
            post.forEach(item => {
                html += `

    <div class="blog-header">
      <div class="blog-article header-article">
        <div class="blog-big__title">${item.title}</div>
        <div class="blog-menu small-title date">${item.date_created}</div>
      </div>
             <div style="display: flex">
       <div> <img style="width: 20px; height: 20px;border-radius: 100%" src="${item.author.image}"></div>
       <div style="margin-left: 15px;font-weight: 700">${item.author.username}</div>
      </div>
      <i class="fa-solid fa-earth-americas"></i>
      <div>${item.status}</div>
      <div style="display: flex; justify-content: right; margin-right: 20px" >
      <span style="margin-right: 10px" onclick="remove(${item.id})" ><i class="fa-solid fa-trash"></i></span>
      <span onclick="updates(${item.id})"><i class="fa-solid fa-pen-to-square"></i></span>
      </div>
    
      <div class="blog-article">
        <img src="${item.image}">
        <p>${item.content}</p>
       <div >
       <div class="like-container">
       <i style="margin-top: 18px" class="fas fa-heart" onclick="tym()"></i>
       </div>
       <button style="margin-bottom: 2px" onclick="showComment(${item.id})">Xem thêm bình luận</button>
      <input type="text" id="contents_${item.id}" placeholder="Viết bình luận...">
      <input type="hidden" id="authors_${item.id}" value="${idUser}">
      <input type="hidden" id="post_${item.id}" value="${item.id}">
      <button style="margin-top: 10px" id="btn-comment" onclick="submitComment(${item.id})" class="btn btn--success">comment</button>
    </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
 `
            })
            $('#body').html(html)
        }
    })
}

function remove(id) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa mục này?',
        text: 'Mục này sẽ bị xóa khỏi hệ thống.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#460202',
        cancelButtonColor: '#e1dbdb',
        confirmButtonText: 'Xóa'
    }).then((result) => {
        if (result.isConfirmed) {
            // Gửi yêu cầu AJAX lên máy chủ để xóa mục
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/post/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: () => {
                    toast({
                        title: "Thành công!",
                        message: "Xóa bài viết thành công.",
                        type: "success",
                        duration: 5000
                    });
                    showHome();
                }
                ,
                error: () => {
                    toast({
                        title: "Lỗi!",
                        message: "Xóa bài viết thất bại!.",
                        type: "error",
                        duration: 5000
                    });
                }
            });
        }
    });
}

function showCategory(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/category',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (category) => {
            let html = ``;
            category.forEach(item => {
                html += `
                <p>${item.name}</p>
                <button onclick="showDetailCategory(${item.id})">Show</button>
                `
            })
            $('#body').html(html)
        }
    })
}

function showDetailCategory(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/post/classify/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (category) => {
            console.log(category)
            let html = ``;
            category.forEach(item => {
                html += `
                <div style="display: flex">
                <img style="width: 20px;height: 20px;border-radius: 100%;margin-top: 15px" src="${item.author.image}">
                <p style="margin-left: 10px;font-weight: 700">${item.author.username}</p>
                </div> 
                <p>Title:${item.title}</p>    
                <p> Content:${item.content}</p>
                <p>Thể loại:${item.category.name}</p>
                <br>
                <br>
                `
            })
            $('#body').html(html)
        }
    })
}

function showFormAdd() {
    const token = localStorage.getItem('token')
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log(payload.idUser);
    const idUser = payload.idUser

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/category',
        headers: {
            'Content-Type': 'application/json'
        },
        success: (category) => {
            console.log(category)

            let htmlFormAdd = `
<link rel="stylesheet" href="user/login.css">
<div class="login-form">
    <div class="form-group">
    <label for="title">Tiêu đề:</label>
    <input type="text" id="title" name="title">
  </div>
    <div class="form-group">
    <label for="content">Nội dung:</label>
    <input type="text" id="content" name="content">
  </div>
    <div class="form-group">
    <label for="image">Ảnh:</label>
    <input type="hidden" id="image" name="image">
    <div id="imgDiv"></div>
    <input type="file" id="fileButton" onchange="uploadImage(event)"><br>
  </div>
    <div class="form-group">

    <input type="hidden" id="author" name="author" value="${idUser}" readonly>
  </div>
    <div class="form-group">
    <label for="category">Thể loại:</label>
    <select id="category" name="category">
  </div>
`
            category.forEach(item => {
                htmlFormAdd += `
                <option value="${item.id}">${item.name}</option>
                `
            })
            htmlFormAdd += `
        </select>
      </div>
      <button onclick="add()" class="btn btn--success">Thêm</button>
    </div>
  `
            $('#body').html(htmlFormAdd)
        }
    })
}

function add() {
    let title = $('#title').val();
    let content = $('#content').val();
    let image = $('#image').val();
    let author = $('#author').val();
    let category = $('#category').val();
    let posts = {
        title: title,
        content: content,
        image: image,
        author: author,
        category: category,
    }
    console.log(posts)

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(posts),
        success: () => {

            showHome();
            toast({
                title: "Thành công!",
                message: "Bạn đã thêm thành công.",
                type: "success",
                duration: 5000
            });
        }
    })
}

function updates(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/post/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (post) => {
            let htmlFormEdit = `
<link rel="stylesheet" href="user/login.css">

<div class="login-form">
  <h2>Sửa bài viết</h2>
      <div class="form-group">
    <input type="hidden" id="id" name="id" value="${post.id}" readonly>
  </div>
    <div class="form-group">
    <label for="title">Tiêu đề:</label>
    <input type="text" id="title" name="title" value="${post.title}">
  </div>

<div class="form-group">
  <label for="status">Trạng thái:</label>
  <select id="status" name="status">
    <option value="public" >public</option>
    <option value="private" >private</option>
  </select>
</div>

    <div class="form-group">
    <label for="content">Nội dung:</label>
    <input type="text" id="content" name="content" value="${post.content}">
  </div>

    <div class="form-group">
    <label for="image">Ảnh:</label>
    <input type="hidden" id="image" name="image" value="${post.image}">
    <div id="imgDiv"></div>
    <input type="file" id="fileButton" onchange="uploadImage(event)"><br>
  </div>

  <button onclick="savePost()" class="btn btn--success">Lưu</button>
    </div>
`
            $('#body').html(htmlFormEdit)
        }
    })
}

function savePost() {
    let id = $('#id').val();
    let title = $('#title').val();
    let status = $('#status').val();
    let content = $('#content').val();
    let image = $('#image').val();
    let post = {
        id: id,
        title: title,
        status: status,
        content: content,
        image: image
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/post/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(post),
        success: () => {
            toast({
                title: "Thành công!",
                message: "Sửa bài viết thành công.",
                type: "success",
                duration: 5000
            });
            showHome();
        }
        ,
        error: () => {
            toast({
                title: "Lỗi!",
                message: "Sửa viết thất bại!.",
                type: "error",
                duration: 5000
            });
        }
    })
}

function search(name) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/post/search/${name}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (post) => {
            console.log(post)
            let html = ``;
            post.forEach(item => {
                html += `
  <div class="blog-header-container">
    <div class="blog-header">
      <div class="blog-article header-article">
        <div class="blog-big__title">${item.title}</div>
        <div class="blog-menu small-title date">${item.date_created}</div>
      </div>
      <i class="fa-solid fa-earth-americas"></i>
      <div>${item.status}</div>
      <div style="display: flex; justify-content: right; margin-right: 20px" >
      <span style="margin-right: 10px" onclick="remove(${item.id})" ><i class="fa-solid fa-trash"></i></span>
      <span onclick="updates(${item.id})"><i class="fa-solid fa-pen-to-square"></i></span>
      </div>
     
      <div class="blog-article">
        <img src="${item.image}">
        <p>${item.content}</p>
      </div>
    </div>
  <div>
       `
            })
            $('#body').html(html)
        }
    })
}