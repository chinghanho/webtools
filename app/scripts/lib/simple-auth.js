var SimpleAuth = function(callback) {
  this.check = function() {
    $.ajax({
      url: '/api/sessions/check',
    })
    .done(function(result) {
      callback(result);
    });
  };
}
