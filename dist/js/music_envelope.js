is_envelope_implemented = $(".inv-envelope").length > 0;

if (is_envelope_implemented) {
  $("body,html").css("overflow", "hidden");
}

$("#open-env").click(function () {
  window.scrollTo({ top: 0, behavior: "auto" });
  $(".inv-envelope").animate({ opacity: 0 }, 500, function () {
    $(".inv-envelope").css("display", "none");
  });

  $("body,html").css("overflow", "");

  audio = $("audio")[0];
  audio.play();
});
