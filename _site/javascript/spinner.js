(function() {
  $(document).on('page:fetch', function() {
    return $(".page, .post").css("opacity", "0");
  });

}).call(this);
