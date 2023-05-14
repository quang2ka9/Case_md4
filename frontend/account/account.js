function showUser() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/auth',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (user) => {
            console.log(user)
            let html = ``;
            user.forEach(item => {
                html += `Tên tài khoản:
                             <div style="font-size: 40px" class="blog-big__title">${item.username}
                             <button style="margin-left: 30px" onclick="xoaAccount(${item.id})"><i class="fa-solid fa-trash"></i></button>
                             </div>
                            `
            })
            $('#body').html(html)
        }
    })
}




function xoaUser(id) {

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
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/auth/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: () => {
                    toast({
                        title: "Thành công!",
                        message: "Xóa tài khoản thành công.",
                        type: "success",
                        duration: 5000
                    });
                    showFormDangKy();
                }
                ,
                error: () => {
                    toast({
                        title: "Lỗi!",
                        message: "Xóa tài khoản thất bại!.",
                        type: "error",
                        duration: 5000
                    });
                }
            });
        }
    });
}



function xoaAccount(id) {
    // Hiển thị thông báo xác nhận bằng SweetAlert2
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
                url: `http://localhost:3000/auth/account/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: () => {
                    toast({
                        title: "Thành công!",
                        message: "Xóa tài khoản thành công.",
                        type: "success",
                        duration: 5000
                    });
                    showHome();
                }
                ,
                error: () => {
                    toast({
                        title: "Lỗi!",
                        message: "Xóa tài khoản thất bại!.",
                        type: "error",
                        duration: 5000
                    });
                }
            })
        }
    });
}


function suaUser(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/auth/update/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (user) => {
            let htmlFormEdit = `

<link rel="stylesheet" href="user/login.css">
<div class="login-form">
  <h2>Sửa thông tin cá nhân</h2>
      <div class="form-group">
    
    <input type="hidden" id="id" name="id" value="${user.id}" readonly>
  </div>
    <div class="form-group">
    <label for="username">Tên tài khoản:</label>
    <input type="text" id="username" name="username" value="${user.username}">
  </div>

   

    <div class="form-group">
    <label for="image">Ảnh:</label>
    <input type="text" id="image" name="image" value="${user.image}">
        <div id="imgDiv"></div>
    <input type="file" id="fileButton" onchange="uploadImage(event)"><br>
  </div>
    <div class="form-group">
    <label for="role">Vai trò:</label>
    <input type="text" id="role" name="role" value="${user.role}" readonly>
  </div>
  <button onclick="luuUser()">Lưu</button>
 </div>
`
            $('#body').html(htmlFormEdit)
        }
    })
}

function luuUser() {
    let id = $('#id').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let image = $('#image').val();
    let role = $('#role').val();
    let user = {
        username: username,
        password: password,
        image: image,
        role: role,
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/auth/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(user),
        success: () => {
            toast({
                title: "Thành công!",
                message: "Sửa tài khoản thành công.",
                type: "success",
                duration: 5000
            });
            showHome();
        }
        ,
        error: () => {
            toast({
                title: "Lỗi!",
                message: "Sửa tài khoản thất bại!.",
                type: "error",
                duration: 5000
            });
        }
    })


}