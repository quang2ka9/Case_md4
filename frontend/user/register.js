function showFormDangKy() {
    let htmlFormLogin = `



<link rel="stylesheet" href="login.css">
                            <div class="login-form" >
                              <h2>Đăng ký</h2>
                              <div class="form-group">
                                <label for="username">Tên đăng nhập:</label>
                                <input type="text" id="username" name="username" required>

                              </div>
                              <div class="form-group">
                                <label for="password">Mật khẩu:</label>
                                <input type="password" id="password" name="password" required>

                              </div>
                              <div class="form-group">
                                <label for="image">Hình ảnh:</label>
                                <input type="hidden" id="image" name="image">
                                <div id="imgDiv"></div>
                                <input type="file" id="fileButton" onchange="uploadImage(event)"><br>
                              </div>
                              <div style="display: flex">
                                  <button onclick="dangky()" class="btn btn--success">Đăng Ký</button>
                                  <p style="margin-left: 80px" onclick="showFormLogin()" >Đăng Nhập</p>
                              </div>
                            </div>
`
    $('#body').html(htmlFormLogin)
}

function dangky() {

    const emailInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    if (emailInput.trim() === "" || passwordInput.trim() === "") {
        toast({
            title: "Lỗi!",
            message: "Vui lòng nhập dữ liệu.",
            type: "error",
            duration: 5000
        });
        event.preventDefault();
    }else {
        let username = $('#username').val();
        let password = $('#password').val();
        let image = $('#image').val();
        let user = {
            username: username,
            password: password,
            image: image
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/auth/register",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(user),
            success: () => {


                toast({
                    title: "Thành công!",
                    message: "Bạn đã đăng ký thành công tài khoản.",
                    type: "success",
                    duration: 5000
                });
                showFormLogin();

            },
            error: () => {

                toast({
                    title: "Lỗi!",
                    message: "Tài khoản đã tồn tại.",
                    type: "error",
                    duration: 5000
                });
            }
        });
    }



}