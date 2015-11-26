(function() {
  $(document).on('page:fetch', function() {
    return $(".page, .post, #feature-image-container").css("opacity", "0");
  });

}).call(this);
