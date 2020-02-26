/* globals $ FormData */

$(document).ready(() => {
  $("#the-section-with-questions")
    .addClass("d-block")
    .removeClass("d-none");
  $("#the-section-after-pressing-submit")
    .addClass("d-none")
    .removeClass("d-block");

  $.ajax({
    url: "/team/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some data!", data);
      $.each(data, function(i, item) {
        $("#numBox").append(
          $("<option>", {
            value: item.num,
            text: item.num + ": " + item.name
          })
        );
      });
    }
  });

  $.ajax({
    url: "/user/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some data!", data);
      $.each(data, function(i, item) {
        $("#nameBox").append(
          $("<option>", {
            value: item.num,
            text: item.name
          })
        );
      });
    }
  });

  $("#createQr").click(e => {
    e.preventDefault();
    let ballAbilityValue = 0;
    $('input[name="ball_ability_checkbox"]:checked').each(function() {
      ballAbilityValue += parseInt(this.value);
    });
    let shooterDistanceValue = 0;
    $('input[name="shooter_distance_radio"]:checked').each(function() {
      shooterDistanceValue += parseInt(this.value);
    });

    // generate qr code
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      // scouting_type, teamNum, weight, trench, ball, shooter, notes, created_time, created_by, drive_train
      text:
        "pit," +
        $("#numBox").val() +
        "," +
        $("#weightBox").val() +
        "," +
        $('input[name="trench_radio"]:checked').val() +
        ballAbilityValue +
        shooterDistanceValue +
        $("#notesBox").val() +
        Date.now() +
        $("#nameBox").val() +
        $('input[name="drive_train_radio"]:checked').val() +
        $('input[name="wheel_radio"]:checked').val(),
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

//     // send data directly to server
//     $.ajax({
//       // all URLs are relative to http://localhost:3000/
//       url: "/pit-report/",
//       type: "POST", // <-- this is POST, not GET
//       data: {
//         num: $("#numBox").val(),
//         weight: $("#weightBox").val(),
//         trench: $('input[name="trench_radio"]:checked').val(),
//         ball_ability: ballAbilityValue,
//         shooter_distance: shooterDistanceValue,
//         notes: $("#notesBox").val(),
//         created_time: Date.now(),
//         created_by: $("#nameBox").val(),
//         drive_train: $('input[name="drive_train_radio"]:checked').val(),
//         color_wheel: $('input[name="wheel_radio"]:checked').val()
//       },
//       success: data => {
//         console.log(data.message);
//         $("#the-section-with-questions")
//           .addClass("d-none")
//           .removeClass("d-block");
//         $("#the-section-after-pressing-submit")
//           .addClass("d-block")
//           .removeClass("d-none");
//         $("#after-title").html("You did it!");
//         $("#after-status").html(data.message);
//       }
//     });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});
