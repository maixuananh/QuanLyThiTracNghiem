Dashmix.helpersOnLoad(['js-flatpickr', 'jq-datepicker', 'jq-select2']);


Dashmix.onLoad((() => class {
    static initValidation() {
        Dashmix.helpers("jq-validation"), jQuery(".form-taothongbao").validate({
            rules: {
                "name-exam": {
                    required: !0,
                },
                "nhom-hp": {
                    required: !0,
                },
            },
            messages: {
                "name-exam": {
                    required: "Nhập nội dung thông báo cần gửi",
                },
                "nhom-hp": {
                    required: "Vui lòng chọn nhóm học phần",
                },
            }
        })
    }

    static init() {
        this.initValidation()
    }
}.init()));


let groups = [];

function showListAnnounce(announces) {
    let html = "";
    if (announces.length != 0) {
        announces.forEach(announce => {
            html += `
            <div class="block block-rounded block-fx-pop mb-2">
        <div class="block-content block-content-full border-start border-3 border-success">
        <div class="d-md-flex justify-content-md-between align-items-md-center">
                <div class="p-1 p-md-3">
                    <div class="flex-grow-1 fs-sm pe-2 mb-2">
                        <h4 class="fw-bold mb-2 truncate truncate--1">${announce.noidung}</h4>
                    </div>
                    <p class="fs-sm text-muted mb-2">
                        <i class="fa fa-layer-group me-1"></i> Gửi cho học phần <strong data-bs-toggle="tooltip" data-bs-animation="true" data-bs-placement="top" style="cursor:pointer" data-bs-original-title="${announce.nhom}">${announce.tenmonhoc} - NH${announce.namhoc} - HK${announce.hocky}</strong>
                    </p>
                </div>
                <div class="p-1 p-md-3">
                    <a class="btn btn-sm btn-alt-success rounded-pill px-3 me-1 my-1" href="javascript:void(0)">
                        <i class="fa fa-clock opacity-50 me-1"></i> ${formatDate(announce.thoigiantao)}
                    </a>
                    <a data-role="thongbao" và data-action="update" class="btn btn-sm btn-alt-primary rounded-pill px-3 me-1 my-1" href="./teacher_announcement/update/${announce.matb}">
                        <i class="fa fa-wrench opacity-50 me-1"></i> Chỉnh sửa
                    </a>
                    <a data-role="thongbao" và data-action="delete" class="btn btn-sm btn-alt-danger rounded-pill px-3 my-1 btn-delete" href="javascript:void(0)" data-id="${announce.matb}">
                        <i class="fa fa-times opacity-50 me-1"></i> Xoá thông báo
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>`;
        })
    } else {
        html += `<p class="text-center">Không có thông báo</p>`
        $(".pagination").hide();
    }
    $(".list-announces").html(html);
    $('[data-bs-toggle="tooltip"]').tooltip();
}

$(document).ready(function () {
    function showGroup() {
        let html = "<option></option>";
        $.ajax({
            type: "post",
            url: "./module/loadData",
            async: false,
            data: {
                hienthi: 1
            },
            dataType: "json",
            success: function (response) {
                groups = response;
                response.forEach((item, index) => {
                    html += `<option value="${index}">${item.mamonhoc + " - " + item.tenmonhoc + " - NH" + item.namhoc + " - HK" + item.hocky}</option>`;
                });
                $("#nhom-hp").html(html);
            }
        });
    }

    showGroup();


    function showListGroup(index) {
        let html = ``;
        if (groups[index].nhom.length > 0) {
            html += `<div class="col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="select-all-group">
                <label class="form-check-label" for="select-all-group">Chọn tất cả</label>
            </div></div>`
            groups[index].nhom.forEach(item => {
                html += `<div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input select-group-item" type="checkbox" value="${item.manhom}"
                            id="nhom-${item.manhom}" name="nhom-${item.manhom}">
                        <label class="form-check-label" for="nhom-${item.manhom}">${item.tennhom}</label>
                    </div>
                </div>`
            });
        } else {
            html += `<div class="text-center fs-sm"><img style="width:100px" src="./public/media/svg/empty_data.png" alt=""></div>`;
        }
        $("#list-group").html(html);
    }

    $("#nhom-hp").on("change", function () {
        let index = $(this).val();
        showListGroup(index);
    });

    $(document).on("click", "#select-all-group", function () {
        let check = $(this).prop("checked");
        $(".select-group-item").prop("checked", check);
    });

    function getGroupSelected() {
        let result = [];
        $(".select-group-item").each(function () {
            if ($(this).prop("checked") == true) {
                result.push($(this).val());
            }
        });
        return result;
    }

    $("#btn-send-announcement").click(function (e) {
        e.preventDefault();
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMonth = nowDate.getMonth() + 1;
        let nowDay = nowDate.getDate();
        let nowHours = nowDate.getHours();
        let nowMintues = nowDate.getMinutes();
        let nowSeconds = nowDate.getSeconds();
        let format = nowYear + "/" + nowMonth + "/" + nowDay + " " + nowHours + ":" + nowMintues + ":" + nowSeconds;
        if ($(".form-taothongbao").valid()) {
            if(getGroupSelected().length != 0) {
                $.ajax({
                    type: "post",
                    url: "./teacher_announcement/sendAnnouncement",
                    data: {
                        noticeText: $("#name-exam").val(),
                        mamonhoc: groups[$("#nhom-hp").val()].mamonhoc,
                        manhom: getGroupSelected(),
                        thoigiantao: format,
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            location.href = "./teacher_announcement";
                        } else {
                            Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: 'Gửi thông báo không thành công!' });
                        }
                    }
                })
            } else {
                Dashmix.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: 'Bạn phải chọn nhóm !' });
            }
        }

    });

    function loadListAnnounces() {
        return $.ajax({
            type: "post",
            url: "./teacher_announcement/getListAnnounce",
            dataType: "json",
            success: function (data) {
                showListAnnounce(data);
            }
        });
    }

    $(document).ready(function () {
        let e = Swal.mixin({
            buttonsStyling: !1,
            target: "#page-container",
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger m-1",
                input: "form-control",
            },
        });

        $(document).on("click", ".btn-delete", function () {
            let index = $(this).data("index");
            e.fire({
                title: "Are you sure?",
                text: "Bạn có chắc chắn muốn xoá thông báo?",
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
                        url: "./teacher_announcement/deleteAnnounce",
                        data: {
                            matb: $(this).data("id")
                        },
                        dataType: "json",
                        success: function (response) {
                            if (response) {
                                e.fire("Deleted!", "Xóa thông báo thành công!", "success");
                                mainPagePagination.getPagination(mainPagePagination.option, mainPagePagination.valuePage.curPage);
                            } else {
                                e.fire("Lỗi !", "Xoá thông báo không thành công !)", "error");
                            }
                        },
                    });
                }
            });
        });
    })

});

// Get current user ID
const container = document.querySelector(".content");
const currentUser = container.dataset.id;
delete container.dataset.id;

// Pagination
const mainPagePagination = new Pagination(null, null, showListAnnounce);
mainPagePagination.option.controller = "teacher_announcement";
mainPagePagination.option.model = "AnnouncementModel";
mainPagePagination.option.id = currentUser;
mainPagePagination.getPagination(mainPagePagination.option, mainPagePagination.valuePage.curPage);
