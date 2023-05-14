function showComment(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/comment/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let html = ``;
            data.forEach(item => {
                html += `
                        <div style="display: flex">
                         <img style="width: 30px;height: 30px; border-radius: 100%;margin-top: 10px" src="${String(item.authors?.image)}">
                         <p style="margin-left: 10px;font-weight: 700">${String(item.authors?.username)}</p>
                         </div> 
                         <div style="display: flex;justify-content: space-between">
                           <p>${item.contents}</p>
                         <div style="margin-top: 15px">
                              <span style="margin-right: 10px" onclick="removeComment(${item.id}, ${id})" ><i class="fa-solid fa-trash"></i></span>
                              <span onclick="updateComment(${item.id}, ${id})"><i class="fa-solid fa-pen-to-square"></i></span>
                         </div>
                         </div>
                     
                          `
                $('#body').html(html)
            })
        }
    })
}

function submitComment(postId) {
    let contents = $(`#contents_${postId}`).val();
    let authors = $(`#authors_${postId}`).val();
    let post = postId;

    let comment = {
        contents: contents,
        authors: authors,
        post: post,
    }


    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/comment',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(comment),
        success: () => {
            showComment(postId);
        }
    })
}

function removeComment(id, idPost) {
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
                url: `http://localhost:3000/comment/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                success: () => {
                    showComment(idPost);
                    toast({
                        title: "Thành công!",
                        message: "Xóa bình luận thành công.",
                        type: "success",
                        duration: 5000
                    })
                }
                ,
                error: () => {
                    toast({
                        title: "Lỗi!",
                        message: "Xóa bình luận thất bại!.",
                        type: "error",
                        duration: 5000
                    });
                }
            });
        }
    });
}

function updateComment(id,idPost) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/comment/find/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: (comment) => {
            let htmlFormEdit = `
                <link rel="stylesheet" href="user/login.css">
                <div class="login-form">
                <div class="form-group">
                     <input type="hidden" id="id" name="id" value="${comment.id}" readonly>
                      </div>
                      <div class="form-group">
                      <input type="text" id="contents" name="contents" value="${comment.contents}" >
                      </div>
                      <button onclick="saveComment(${comment.id},${idPost})" class="btn btn--success">Lưu</button>
                </div>
                
                </div>
`
            $('#body').html(htmlFormEdit)
        }
    })
}

function saveComment(idComment, idPost) {

    let id = $('#id').val();
    let contents = $('#contents').val();
    let comment = {
        id: id,
        contents: contents,
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/comment/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(comment),
        success: () => {
            showComment(idPost);
            toast({
                title: "Thành công!",
                message: "Sửa bình luận thành công.",
                type: "success",
                duration: 5000
            });

        }
        ,
        error: () => {
            toast({
                title: "Lỗi!",
                message: "Sửa  bình luận bại!.",
                type: "error",
                duration: 5000
            });
        }
    })
}