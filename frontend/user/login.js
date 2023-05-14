function showFormLogin() {
    let htmlFormLogin = `
 <link rel="stylesheet" href="login.css">

<div class="login-form">
  <h2>Đăng nhập</h2>
  <div class="form-group">
    <label for="username">Tên đăng nhập:</label>
    <input type="text" id="username" name="username">
  </div>
  <div class="form-group">
    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password">
  </div>
  <div style="display: flex">
  <button onclick="dangnhap()" class="btn btn--success">Đăng nhập</button>
  <p style="margin-left: 80px" onclick="showFormDangKy()">Đăng ký</p>
  </div>
</div>
`
    $('#body').html(htmlFormLogin)
}

function dangnhap() {
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/auth/login",
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),
        success: (token) => {
            // const payload = JSON.parse(atob(token.split('.')[1]))
            // console.log(payload);
            localStorage.setItem('token', token)
            showHome();
            document.getElementById("username-display").textContent = user.username;
            $("#username-display").on("click", function () {
                thongtin(user.username, function (user) {
                    // Tạo HTML để hiển thị thông tin người dùng
                    let html = `
           
            <p>Tên: ${user.username}</p>
            <p>Ảnh: <img src="${user.image}" alt=""></p>
            <p>Chức vụ: ${user.role}</p>        
        
            <button onclick="xoaUser(${user.id})"><i class="fa-solid fa-trash"></i></button>
            <button onclick="suaUser(${user.id})"><i class="fa-solid fa-pen-to-square"></i></button>
          `;
                    // Thay đổi nội dung của phần tử có id="body" bằng HTML vừa tạo
                    $('#body').html(html)
                });
            });
        },
        error: () => {
            toast({
                title: "Lỗi!",
                message: "Tên đăng nhập hoặc mật khẩu sai!.",
                type: "error",
                duration: 5000
            });
        }
    })
}

function thongtin(id, callback) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/auth/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (user) => {
            callback(user);
        }
    })
}