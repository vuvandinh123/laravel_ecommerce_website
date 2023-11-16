function render(data,element){
    let html='<option selected value="" disabled >chọn cấp cha</option>'
    $.each(data, function (index, value) { 
         html += `<option value="${value.id}">${value.name}</option>`
    });
    $(element).html(html)
}
function render2(data,element){
    let html='<option selected value="0" disabled >Đầu tiên</option>'
    $.each(data, function (index, value) { 
         html += `<option value="${value.id+1}">sau: ${value.name}</option>`
    });
    $(element).html(html)
}

$('.rank').change(function(e){
    let value = $(this).val();
    let url = "menu/editMenu"
    connectAjax(url, value, function (data) {
        render(data.rank,'.parent_id')
        // render2(data.sort,'.sort_order')
    })
})
$('.parent_id').change(function(e){
    let value = $(this).val();
    let url = "menu/editSort"
    connectAjax(url, value, function (data) {
        console.log(data);
        render2(data.sort,'.sort_order')
    })
})
// function editMenu(id){
//     alert(id);
// }
// $('#position').change(function (e) {
//     let value = $(this).val();
//     let url = 'menu/position'
//     connectAjax(url, value, function (data) {
        
//     })

// });

$('#Btncate').click(function (e) {
    let value = []
    $('.category:checked').each(function () {
        value.push($(this).val());
    });
    let value2 = $('#position').val();
    value.push(value2)
    let url = "menu/pust"
    connectAjax(url, value, function (data) {
        console.log('thanh11');
    })
    let url2 = 'menu/position'
    connectAjax(url2, value2, function (data) {
        render(data)
    })
});