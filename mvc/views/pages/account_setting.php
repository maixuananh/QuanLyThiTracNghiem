<div class="content content-full content-boxed account_ID" data-id="<?php echo $_SESSION['user_id'] ?>">
    <!-- Hero -->
    <div class="rounded border overflow-hidden push">
        <div class="bg-image pt-9" style="background-image: url('./public/media/photos/photo24@2x.jpg');"></div>
        <div class="px-4 py-3 bg-body-extra-light d-flex flex-column flex-md-row align-items-center load-profile">
            <a class="d-block img-link mt-n5 avatar-Profile" href="javascript:void(0)">
                <img class="img-avatar img-avatar128 img-avatar-thumb" src="./public/media/avatars/<?php echo $data["User"]["avatar"] == '' ? "avatar2.jpg" : $data["User"]["avatar"] ?>" alt="">
            </a>
            <div class="ms-3 flex-grow-1 text-center text-md-start my-3 my-md-0 load-nameProfile">
                <h1 class="fs-4 fw-bold mb-1"><?php echo $_SESSION['user_name'] ?></h1>
                <h2 class="fs-sm fw-medium text-muted mb-0">
                    Chỉnh sửa hồ sơ
                </h2>
            </div>
        </div>
    </div>
    <!-- END Hero -->

    <!-- Edit Account -->
    <div class="block block-bordered block-rounded">
        <ul class="nav nav-tabs nav-tabs-alt" role="tablist">
            <li class="nav-item">
                <button class="nav-link space-x-1 active" id="account-profile-tab" data-bs-toggle="tab"
                    data-bs-target="#account-profile" role="tab" aria-controls="account-profile" aria-selected="true">
                    <i class="fa fa-user-circle d-sm-none"></i>
                    <span class="d-none d-sm-inline">Hồ sơ</span>
                </button>
            </li>
        </ul>
        <div class="block-content tab-content">
            <div class="tab-pane active" id="account-profile" role="tabpanel" aria-labelledby="account-profile-tab"
                tabindex="0">
                <div class="row push p-sm-2 p-lg-4">
                    
                    <div class="col-xl-6 order-xl-0">
                        <form class="form-update-profile" method="POST" enctype="multipart/form-data">
                            <div class="mb-4">
                                <label class="form-label" for="dm-profile-msv">Mã sinh viên</label>
                                <input type="text" class="form-control" id="dm-profile-msv"
                                    name="dm-profile-msv" placeholder="Enter your name.."
                                    value="<?php echo $data["User"]["id"]?>" disabled>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="dm-profile-edit-name">Họ và tên</label>
                                <input type="text" class="form-control" id="dm-profile-edit-name"
                                    name="dm-profile-edit-name" placeholder="Enter your name.."
                                    value="<?php echo $data["User"]["hoten"]?>">
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="dm-profile-edit-email">Địa chỉ email</label>
                                <input type="email" class="form-control" id="dm-profile-edit-email"
                                    name="dm-profile-edit-email" placeholder="Enter your email.."
                                    value="<?php echo $data["User"]["email"]?>">
                            </div>
                            <div class="mb-3 d-flex gap-4">
                                <label for="gender-male" class="form-label">Giới tính</label>
                                <div class="space-x-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="gender-male" name="user_gender"
                                            value="1" <?php echo $data["User"]["gioitinh"] == 1 ? "checked" : ""?>>
                                        <label class="form-check-label" for="gender-male">Nam</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="gender-female"
                                            name="user_gender" value="0" <?php echo $data["User"]["gioitinh"] == 0 ? "checked" : ""?>>
                                        <label class="form-check-label" for="gender-female">Nữ</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="user_ngaysinh" class="form-label">Ngày sinh</label>
                                <input type="text" class="js-flatpickr form-control form-control-alt" id="user_ngaysinh"
                                    name="user_ngaysinh" placeholder="Ngày sinh" value="<?php echo $data["User"]["ngaysinh"]?>">
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Ảnh đại diện</label>
                                <div class="push up-avatar">
                                    <img class="img-avatar" src="./public/media/avatars/<?php echo $data["User"]["avatar"] == '' ? "avatar2.jpg" : $data["User"]["avatar"] ?>" alt="">
                                </div>
                                <label class="form-label" for="dm-profile-edit-avatar">Chọn ảnh đại diện mới</label>
                                <input class="form-control" type="file" id="dm-profile-edit-avatar" name="file-img" accept="image/*">
                            </div>
                            <button type="submit" class="btn btn-alt-primary" id="update-profile">
                                <i class="fa fa-check-circle opacity-50 me-1"></i> Cập nhật hồ sơ
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END Edit Account -->
</div>