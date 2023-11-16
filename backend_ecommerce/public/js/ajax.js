function connectAjax(url,data='',getData){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: url,
        data: {data:data},
        success: function(data) {
            if (typeof getData === 'function') {
                getData(data);
            }
        }
    });
}