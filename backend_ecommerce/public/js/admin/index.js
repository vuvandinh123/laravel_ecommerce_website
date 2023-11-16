function setHandleClick(table) {
    /**
     * set status 
     */
    $('.setStatus').click(function (e) {
        let id = $(this).attr('data-id');
        let element = $(this);
        let setUrlStatus = '/admin/' + table + '/' + id + '/status'
        connectAjax(setUrlStatus, '', function (data) {
            let isClass = $(element).hasClass('fa-toggle-on');
            if (isClass == true) {
                $(element).removeClass('fa-toggle-on');
                $(element).addClass('fa-toggle-off');
                toastr.success('Thay đổi trạng thái thành công!', 'Thành công')
            }
            else {
                $(element).removeClass('fa-toggle-off');
                $(element).addClass('fa-toggle-on');
                toastr.success('Thay đổi trạng thái thành công!', 'Thành công')
            }
        });

    });

    /**
     * set delete to trash
     */
    $('.delete').click(function (e) {
        let item = $(this)
        let id = $(this).attr('data-id');
        let setUrlDelete = '/admin/' + table + '/' + id + '/trash';
        connectAjax(setUrlDelete, '', function (data) {
            let parent = $(item).closest('tr')
            parent.remove();
            toastr.success('Thêm vô thùng rác!', 'Thành công')
        })

    });
    /**
     * set destroy 
     */

    $('.destroy').click(function (e) {
        let id = $(this).attr('data-id');
        let setUrlDestroy = `/admin/${table}/destroy`
        let element = $(this)
        connectAjax(setUrlDestroy, id, function (data) {
            let parent = element.closest('tr')
            $(parent).remove();
            toastr.success('Đã xóa!', 'Thành công')
        })

    })
    /**
     * restore from recycle bin
     */
    $('.restore').click(function (e) {
        let id = $(this).attr('data-id');
        let setUrlRestore = `/admin/${table}/restore`
        connectAjax(setUrlRestore, id, function (data) { })
        let parent = $(this).closest('tr')
        parent.remove();
    });
    /**
     * delete a lot of to trash
     */
    $('#btnDelete').click(function (e) {
        let data = []
        $.each($('.deletes:checked'), function (index, element) {
            data.push(element.value)
        });
        console.log(data);
        let setUrlDeletes = `/admin/${table}/deleteAll`
        connectAjax(setUrlDeletes, data, function (data) {
            $.each($('.deletes:checked'), function (index, element) {
                let parent = element.closest('tr')
                parent.remove();
            });
        })

    });
    /**
     * destroy a lot of to trash
     */
    $('#btnDestroy').click(function (e) {
        let data = []
        $.each($('.destroys:checked'), function (index, element) {
            data.push(element.value)
        });
        console.log(data);
        let setUrlDestroy = `/admin/${table}/destroyAll`
        connectAjax(setUrlDestroy, data, function (data) {
            $.each($('.destroys:checked'), function (index, element) {
                let parent = element.closest('tr')
                parent.remove();
            });
        })

    });

}

// function add(i = 1) {
//     var html = ''
//     for (let index = 0; index < i; index++) {
//         html += `
//         <tr>
//                             <td>
//                                 <select style="width: 150px" id="select-state${index}" class="select form-control" placeholder="Pick a state...">
//                                     <option value="${index}">${index}</option>
//                                 </select>
//                             </td>
//                             <td>
//                                 <select style="width: 150px" id="select-state${index+i*i}" class="select form-control" placeholder="Pick a state...">
//                                     <option value="${index}">${index}</option>
//                                 </select>
//                             </td>
//                             <td>
//                                 <input type="number" class="form-control w-50" >
//                             </td>
//                             <td>
//                                 <input type="number" class="form-control w-75" >
//                             </td>
//                             <td>
//                                 <input type="date" class="form-control w-75" >
//                             </td>
//                             <td class="text-center">
//                                 111111
//                             </td>
//                             <td class="text-center">
//                                 <span><i class="fa-regular fa-trash-can"></i></span>
//                             </td>
//                         </tr>
//         `
//     }
//     $('#add-product').html(html);
//     // $(selector).html(htmlString);
// }
// var i=1
// $('#btn-new').click(function () {
//     i++;
//     console.log(i);
//     add(i);
// });
// add(i)