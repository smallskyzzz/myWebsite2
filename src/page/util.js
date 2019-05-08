var util = {
    request: function (param) {
        $.ajax({
            url: param.url || '',
            type: param.type || 'get',
            dataType: param.dataType || 'json',
            data: param.data || null,
            success: function(res) {
                param.success(res)
            },
            error: function(err) {
                alert(err)
            }
        })
    }
}

module.exports = util