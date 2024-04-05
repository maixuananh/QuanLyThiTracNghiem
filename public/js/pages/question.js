Dashmix.helpersOnLoad(["jq-select2", "js-ckeditor"]);
CKEDITOR.replace("option-content");

Dashmix.onLoad(() =>
  class {
    static initValidation() {
      Dashmix.helpers("jq-validation"),
        jQuery("#form_add_question").validate({
          rules: {
            "mon-hoc": {
              required: true,
            },
            "chuong": {
              required: true,
            },
            "dokho": {
              required: true,
            },
            "js-ckeditor": {
              required: true,
            },
          },
          messages: {
            "mon-hoc": {
              required: "Vui lòng chọn môn học",
            },
            "chuong": {
              required: "Vui lòng chọn chương.",
            },
            "dokho": {
              required: "Vui lòng chọn mức độ.",
            },
            "js-ckeditor": {
              required: "Vui lòng không để trống câu hỏi.",
            },
          },
          errorClass: "is-invalid",
          validClass: "is-valid",
        });
    }
    static init() {
      this.initValidation();
    }
  }.init()
);

function showData(data) {
  let html = "";
  let index = 1;
  let offset = (this.valuePage.curPage - 1) * this.option.limit;
  data.forEach((question) => {
    let dokho = "";
    switch (question["dokho"]) {
      case "1":
        dokho = "Cơ bản";
        break;
      case "2":
        dokho = "Trung bình";
        break;
      case "3":
        dokho = "Nâng cao";
        break;
    }
    html += `<tr>
              <td class="text-center fs-sm">
                  <a class="fw-semibold" href="#">
                    <strong>${offset + index++}</strong>
                  </a>
              </td>
              <td>${question["noidung"]}</td>
              <td class="d-none d-xl-table-cell fs-sm">
                  <a class="fw-semibold">${question["tenmonhoc"]}</a>
              </td>
              <td class="d-none d-sm-table-cell fs-sm">
                  <strong>${dokho}</strong>
              </td>
              <td class="text-center col-action">
                  <a data-role="cauhoi" data-action="update" class="btn btn-sm btn-alt-secondary btn-edit-question" data-bs-toggle="tooltip"
                              aria-label="Chỉnh sửa" data-bs-original-title="Chỉnh sửa" data-id="${question["macauhoi"]}">
                              <i class="fa fa-fw fa-pencil" ></i>
                          </a>
                  <a data-role="cauhoi" data-action="delete" class="btn btn-sm btn-alt-secondary btn-delete-question" 
                      data-bs-toggle="tooltip" aria-label="Xoá" data-bs-original-title="Xoá"  data-id="${
                        question["macauhoi"]
                      }">
                      <i class="fa fa-fw fa-times"></i>
                  </a>
              </td>
          </tr>`;
  });
  $("#listQuestion").html(html);
  $('[data-bs-toggle="tooltip"]').tooltip();
}

$(document).ready(function () {
  let options = [];
  $(".js-select2").select2();
  $("#mon-hoc").select2({
    dropdownParent: $("#modal-add-question"),
  });
  
  $("#chuong").select2({
    dropdownParent: $("#modal-add-question"),
  });
  
  $("#dokho").select2({
    dropdownParent: $("#modal-add-question"),
  });
  
  $("#monhocfile").select2({
    dropdownParent: $("#modal-add-question"),
  });
  
  $("#chuongfile").select2({
    dropdownParent: $("#modal-add-question"),
  });

  $("[data-bs-target='#add_option']").on("click", function () {
    $("#update-option").hide();
    $("#save-option").show();
  });

  $("#save-option").click(function (e) {
    e.preventDefault();
    let content_option = CKEDITOR.instances["option-content"].getData();
    let true_option = $("#true-option").prop("checked");
    let option = {
      content: content_option,
      check: true_option,
    };
    options.push(option);
    $("#add_option").collapse("hide");
    resetForm();
    showOptions(options);
  });

  $("#update-option").click(function (e) {
    e.preventDefault();
    options[$(this).data("id")].content =
      CKEDITOR.instances["option-content"].getData();
    showOptions(options);
    resetForm();
    $("#add_option").collapse("hide");
  });

  function showOptions(options) {
    let data = "";
    options.forEach((item, index) => {
      data += `<tr>
                    <th class="text-center" scope="row">${index + 1}</th>
                    <td>
                    ${item.content}
                    </td>
                    <td class="d-none d-sm-table-cell">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="da-dung" data-id="${index}" id="da-${index}" ${
        item.check == true ? `checked` : ``
      }>
                            <label class="form-check-label" for="da-${index}">
                                Đáp án đúng
                            </label>
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-alt-secondary btn-edit-option"
                                data-bs-toggle="tooltip" title="Edit" data-id="${index}">
                                <i class="fa fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-alt-secondary btn-delete-option"
                                data-bs-toggle="tooltip" title="Delete" data-id="${index}">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
    });
    $("#list-options").html(data);
  }

  function resetForm() {
    CKEDITOR.instances["option-content"].setData("");
    $("#true-option").prop("checked", false);
  }

  $(document).on("click", ".btn-edit-option", function () {
    let index = $(this).data("id");
    $("#update-option").show();
    $("#save-option").hide();
    $("#update-option").data("id", index);
    $("#add_option").collapse("show");
    CKEDITOR.instances["option-content"].setData(options[index].content);
    if (options[index].check == true) {
      $("#true-option").prop("checked", true);
    }
  });

  $(document).on("click", ".btn-delete-option", function () {
    let index = $(this).data("id");
    let e = Swal.mixin({
      buttonsStyling: !1,
      target: "#page-container",
      customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
      },
    });

    e.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xoá câu trả lời?",
      icon: "warning",
      showCancelButton: !0,
      customClass: {
        confirmButton: "btn btn-danger m-1",
        cancelButton: "btn btn-secondary m-1",
      },
      confirmButtonText: "Vâng, tôi chắc chắn!",
      html: !1,
      preConfirm: (e) =>
        new Promise((e) => {
          setTimeout(() => {
            e();
          }, 50);
        }),
    }).then((t) => {
      if (t.value == true) {
        e.fire("Deleted!", "Xóa câu trả lời thành công!", "success");
        options.splice(index, 1);
        showOptions(options);
      }
    });
  });

  $(document).on("change", "[name='da-dung']", function () {
    let index = $(this).data("id");
    options.forEach((item) => {
      item.check = false;
    });
    options[index].check = true;
    console.log(options);
  });

  $.get(
    "./subject/getSubjectAssignment",
    function (data) {
      let html = "<option></option>";
      data.forEach((item) => {
        html += `<option value="${item.mamonhoc}">${item.tenmonhoc}</option>`;
      });
      $(".data-monhoc").html(html);
      $("#main-page-monhoc").html(html);
    },
    "json"
  );

  $(".data-monhoc").on("change", function () {
    let selectedValue = $(this).val();
    let id = $(this).data("tab");
    let html = "<option></option>";
    $.ajax({
      type: "post",
      url: "./subject/getAllChapter",
      data: {
        mamonhoc: selectedValue,
      },
      dataType: "json",
      success: function (data) {
        data.forEach((item) => {
          html += `<option value="${item.machuong}">${item.tenchuong}</option>`;
        });
        $(`.data-chuong[data-tab="${id}"]`).html(html);
      },
    });
  });

  $("#main-page-monhoc").on("change", function () {
    let mamonhoc = $(this).val();
    let id = $(this).data("tab");
    let html = "<option></option>";
    $.ajax({
      type: "post",
      url: "./subject/getAllChapter",
      data: {
        mamonhoc: mamonhoc,
      },
      dataType: "json",
      success: function (data) {
        data.forEach((item) => {
          html += `<option value="${item.machuong}">${item.tenchuong}</option>`;
        });
        $(`#main-page-chuong[data-tab="${id}"]`).html(html);
      },
    });

    // Reset filter
    $("#main-page-dokho").val(0).trigger("change");
    mainPagePagination.option.filter = {};

    // Ajax call + pagination
    mainPagePagination.option.filter.mamonhoc = mamonhoc;
    mainPagePagination.getPagination(
      mainPagePagination.option,
      mainPagePagination.valuePage.curPage
    );
  });

  $("#main-page-chuong").on("change", function () {
    const machuong = $(this).val();
    mainPagePagination.option.filter.machuong = machuong;
    mainPagePagination.getPagination(
      mainPagePagination.option,
      mainPagePagination.valuePage.curPage
    );
  });

  $("#main-page-dokho").on("change", function () {
    const dokho = +$(this).val();
    mainPagePagination.option.filter.dokho = dokho;
    mainPagePagination.getPagination(
      mainPagePagination.option,
      mainPagePagination.valuePage.curPage
    );
  });

  $("#file-cau-hoi").change(function (e) {
    e.preventDefault();
    var file = $("#file-cau-hoi")[0].files[0];
    var formData = new FormData();
    formData.append("fileToUpload", file);
    $.ajax({
      type: "post",
      url: "./question/xulyDocx",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        Dashmix.layout("header_loader_on");
      },
      success: function (response) {
        console.log(response);
        questions = response;
        loadDataQuestion(response);
      },
      complete: function () {
        Dashmix.layout("header_loader_off");
      },
    });
  });

  $("#btnAddExcel").click(function (e) {
    e.preventDefault();
    var file = $("#file-cau-hoi")[0].files[0];
    var formData = new FormData();
    formData.append("fileToUpload", file);
    $.ajax({
      type: "post",
      url: "./question/addExcel",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        Dashmix.layout("header_loader_on");
      },
      success: function (response) {
        console.log(response);
        questions = response;
        loadDataQuestion(response);
      },
      complete: function () {
        Dashmix.layout("header_loader_off");
      },
    });
  });

  function loadDataQuestion(questions) {
    let data = ``;
    questions.forEach((item, index) => {
      data += `<div class="question rounded border mb-3">
            <div class="question-top p-3">
                <p class="question-content fw-bold mb-3">${index + 1}. ${
        item.question
      } </p>
                <div class="row">`;
      item.option.forEach((op, i) => {
        data += `<div class="col-6 mb-1">
                <p class="mb-1"><b>${String.fromCharCode(
                  i + 65
                )}.</b> ${op}</p></div>`;
      });
      data += `</div></div>`;
      data += `<div class="test-ans bg-primary rounded-bottom py-2 px-3 d-flex align-items-center"><p class="mb-0 text-white me-4">Đáp án của bạn:</p>`;
      item.option.forEach((op, i) => {
        data += `<input type="radio" class="btn-check" name="options-c${index}" id="option-c${index}_${i}" autocomplete="off" ${
          i + 1 == item.answer ? `checked` : ``
        } disabled>
                <label class="btn btn-light rounded-pill me-2 btn-answer" for="option-c${index}_${i}">${String.fromCharCode(
          i + 65
        )}</label>`;
      });
      data += `</div></div>`;
    });
    $("#content-file").html(data);
  }

  // loadQuestion();

  //add question
  $("#add_question").click(function (e) {
    if ($("#form_add_question").valid()) {
      let ch = CKEDITOR.instances["js-ckeditor"].getData().length==0;
      if(ch==""){
        if (options.length == 0) {
          Dashmix.helpers("jq-notify", {
            type: "danger",
            icon: "fa fa-times me-1",
            message: "Vui lòng thêm câu trả lời!",
          });
        } else {
          if (!checkSOption(options)) {
            Dashmix.helpers("jq-notify", {
              type: "danger",
              icon: "fa fa-times me-1",
              message: "Vui lòng chọn câu trả lời đúng!",
            });
          } else {
            let mamonhoc = $("#mon-hoc").val();
            let machuong = $("#chuong").val();
            let dokho = $("#dokho").val();
            let noidung = CKEDITOR.instances["js-ckeditor"].getData();
            $.ajax({
              type: "post",
              url: "./question/addQues",
              data: {
                mamon: mamonhoc,
                machuong: machuong,
                dokho: dokho,
                noidung: noidung,
                cautraloi: options,
              },
              success: function (response) {
                Dashmix.helpers("jq-notify", {
                  type: "success",
                  icon: "fa fa-check me-1",
                  message: "Tạo câu hỏi thành công!",
                });
  
                $("#modal-add-question").modal("hide");
                // loadQuestion();
                mainPagePagination.getPagination(
                  mainPagePagination.option,
                  mainPagePagination.valuePage.curPage
                );
              },
            });
          }
        }
      } else {
        Dashmix.helpers("jq-notify", {
          type: "danger",
          icon: "fa fa-times me-1",
          message: "Vui lòng không để trống câu hỏi",
        });
      }
    }
  });

  function checkSOption(options) {
    let check = false;
    options.forEach((question) => {
      if (question["check"] == true) {
        check = true;
      }
    });
    return check;
  }

  $("#addquestionnew").click(function () {
    $("#add_question").show();
    $("#edit_question").hide();
    $("#mon-hoc").val("").trigger("change");
    $("#chuong").val("").trigger("change");
    $("#dokho").val("").trigger("change");
    $("#monhocfile").val("").trigger("change");
    $("#chuongfile").val("").trigger("change");
    CKEDITOR.instances["js-ckeditor"].setData("");
    options = [];
    $("#add_option").collapse("hide");
    $("#list-options").html("");
    $("#file-cau-hoi").val(null);
    $("#btabs-alt-static-home-tab").tab("show");
    $("#content-file").html("");
  });

  $("#nhap-file").click(function () {
    $.ajax({
      type: "post",
      url: "./question/addQuesFile",
      data: {
        monhoc: $("#monhocfile").val(),
        chuong: $("#chuongfile").val(),
        questions: questions,
      },
      success: function (response) {
        $("#modal-add-question").modal("hide");
        // loadQuestion();
        mainPagePagination.getPagination(
          mainPagePagination.option,
          mainPagePagination.valuePage.curPage
        );
        setTimeout(function () {
          Dashmix.helpers("jq-notify", {
            type: "success",
            icon: "fa fa-check me-1",
            message: "Thêm câu hỏi từ file thành công!",
          });
        }, 10);
      },
    });
  });

  $(document).on("click", ".btn-edit-question", function () {
    $("#add_question").hide();
    $("#edit_question").show();
    let id = $(this).data("id");
    $("#question_id").val(id);
    getQuestionById(id);
    $("#modal-add-question").modal("show");
  });

  $("#edit_question").click(function () {
    let mamonhoc = $("#mon-hoc").val();
    let machuong = $("#chuong").val();
    let dokho = $("#dokho").val();
    let noidung = CKEDITOR.instances["js-ckeditor"].getData();
    let cautraloi = options;
    let id = $("#question_id").val();
    if (
      mamonhoc != "" &&
      machuong != "" &&
      dokho != "" &&
      noidung != "" &&
      cautraloi.length > 1 &&
      checkSOption(options) == true
    ) {
      $.ajax({
        type: "post",
        url: "./question/editQuesion",
        data: {
          id: id,
          mamon: mamonhoc,
          machuong: machuong,
          dokho: dokho,
          noidung: noidung,
          cautraloi: options,
        },
        success: function (response) {
          Dashmix.helpers("jq-notify", {
            type: "success",
            icon: "fa fa-check me-1",
            message: "Sửa câu hỏi thành công!",
          });

          $("#modal-add-question").modal("hide");
          // loadQuestion();
          mainPagePagination.getPagination(
            mainPagePagination.option,
            mainPagePagination.valuePage.curPage
          );
        },
        error: function (err) {
          console.error(err.responseText);
        },
      });
    } else {
      if (mamonhoc == "") {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng chọn mã môn học",
        });
        $("#mon-hoc").focus();
      } else if (machuong == "") {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng chọn mã chương",
        });
        $("#chuong").focus();
      } else if (dokho == "") {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng chọn độ khó",
        });
        $("#dokho").focus();
      } else if (noidung == "") {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng nhập nội dung",
        });
        CKEDITOR.instances["js-ckeditor"].focus();
      } else if (cautraloi.length < 2) {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng thêm câu trả lời",
        });
      } else if (checkSOption(options) == false) {
        Dashmix.helpers("jq-notify", {
          type: "error",
          icon: "fa fa-check me-1",
          message: "Vui lòng chọn đáp án đúng",
        });
      }
    }
  });

  function getQuestionById(id) {
    $.ajax({
      type: "post",
      url: "./question/getQuestionById",
      data: {
        id: id,
      },
      dataType: "json",
      success: function (response) {
        let data = response;
        let monhoc = data["mamonhoc"];
        let machuong = data["machuong"];
        let dokho = data["dokho"];
        let noidung = data["noidung"];
        CKEDITOR.instances["js-ckeditor"].setData(noidung);
        $("#mon-hoc").val(monhoc).trigger("change");
        $("#dokho").val(dokho).trigger("change");
        setTimeout(function () {
          $("#chuong").val(machuong).trigger("change");
        }, 100);
      },
    });

    $.ajax({
      type: "post",
      url: "./question/getAnswerById",
      data: {
        id: id,
      },
      dataType: "json",
      success: function (response) {
        options = [];
        let data = response;
        data.forEach((option_get) => {
          let option = {
            content: option_get["noidungtl"],
            check: option_get["ladapan"] == 1 ? true : false,
          };
          options.push(option);
        });
        showOptions(options);
      },
    });
  }

  $(document).on("click", ".btn-delete-question", function () {
    let trid = $(this).data("id");
    let e = Swal.mixin({
      buttonsStyling: !1,
      target: "#page-container",
      customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
      },
    });

    e.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xoá câu hỏi này?",
      icon: "warning",
      showCancelButton: !0,
      customClass: {
        confirmButton: "btn btn-danger m-1",
        cancelButton: "btn btn-secondary m-1",
      },
      confirmButtonText: "Vâng, tôi chắc chắn!",
      html: !1,
      preConfirm: (e) =>
        new Promise((e) => {
          setTimeout(() => {
            e();
          }, 50);
        }),
    }).then((t) => {
      if (t.value == true) {
        $.ajax({
          type: "post",
          url: "./question/delete",
          data: {
            macauhoi: trid,
          },
          success: function (response) {
            e.fire("Deleted!", "Xóa câu hỏi thành công!", "success");
            mainPagePagination.getPagination(
              mainPagePagination.option,
              mainPagePagination.valuePage.curPage
            );
          },
        });
      }
    });
  });

  // loadDataQuestion
  var page = 1;
  var select = "Tất cả";
  function loadQuestion() {
    $.get(
      "./question/getQuestion",
      {
        page: page,
        selected: $(".btn-filter").text(),
        content: $("#search-input").val().trim(),
      },
      function (data) {
        showData(data);
      },
      "json"
    );
  }
});

// Get current user ID
const container = document.querySelector(".content");
const currentUser = container.dataset.id;
delete container.dataset.id;

// Pagination
const mainPagePagination = new Pagination();
mainPagePagination.option.controller = "question";
mainPagePagination.option.model = "CauHoiModel";
mainPagePagination.option.limit = 10;
mainPagePagination.option.id = currentUser;
mainPagePagination.option.filter = {};
mainPagePagination.getPagination(
  mainPagePagination.option,
  mainPagePagination.valuePage.curPage
);
