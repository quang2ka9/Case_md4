function logout() {
    localStorage.removeItem("token")
    sessionStorage.clear(); // nếu bạn lưu thông tin vào sessionStorage
    location.reload(true);
    showFormLogin()
}