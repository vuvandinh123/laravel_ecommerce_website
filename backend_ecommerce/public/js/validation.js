function validateNumber(inputSelector) {
    for(let selector  of inputSelector){
        $(selector).keydown(function(e) {
            
            var keyCode = e.keyCode || e.which;
            if (!(keyCode >= 48 && keyCode <= 57 ) && keyCode !== 8 && keyCode !== 9 && keyCode != 39 && keyCode !=37) {
                e.preventDefault();
            }
        });
    }
    
}
function validationName(table,id){
    $(document).ready(function(){
        $(id).keyup(function(e){
            $(id + ' + ' + '.alert').text('');
            let url = `/admin/${table}/validateName`
            let value = $(this).val();
            connectAjax(url,value,function(data){
                if(data.mes == 1){
                    $(id + '+ .alert').text('Tên này đã tồn tại')
                    $(id + ' + .alert').addClass('invalid');
                    $(id ).addClass('border-danger');
                }
                else{
                    $(id + ' + .alert').removeClass('invalid');
                }
            })
        });
        $(id).blur(function(e) {
            value = $(this).val();
            if (value == '') {
                $(id + '+ .alert').text('Trường này không được để trống');
            }
        });
    });
    
}
function validateInput(inputSelector,message) {
        for(let selector  of inputSelector){
            $(selector).keydown(function(e) {
                $(selector + ' + ' + '.alert').text('');
                $(selector ).removeClass('border-danger');
            });
           

            $(selector).blur(function(e) {
                let isName = $(selector + ' + ' + ' .alert').hasClass('invalid');
                value = $(this).val();
                if (value == '') {
                    $(selector + ' + ' + '.alert').text(message || 'Trường này không được để trống');
                    $(selector ).addClass('border-danger');

                }
                else if(!isName){
                    $(selector + ' + ' + '.alert').text('');
                    $(selector ).removeClass('border-danger');
                }
            });
        }
    
}
function validate(obj,message,name){
    let isValidate = true
    let isName = $(name + '+ .alert').hasClass('invalid');
    for( let key in obj){
        console.log(obj[key]);
        if(isName){
            $(name + '+ .alert').text('Tên này đã tồn tại')
            isValidate = false
        }
        if(obj[key]=='' || obj[key]==null){
            
            $('#'+key + ' + ' + '.alert').text(message || 'Trường này không được để trống')
            $('#'+key ).addClass('border-danger');
            isValidate = false
        }
        else{
            $('#'+key + ' + ' + '.alert').text('');
        }
    }
    console.log(isValidate);
    return isValidate
}
function handleSubmit(event,fieldIds,message,name){

    let formData = {}
    for(value of fieldIds){
        formData[value] = $('#'+value).val()
    }
    let isvalidate = validate(formData,message,name)
    if(isvalidate){
        return true;
    }
    else{
        event.preventDefault();
    }

}
