<?php require "inc/head.php" ?>

<body>
    <!-- Page Container -->
    <div id="page-container" class="sidebar-dark side-scroll page-header-fixed page-header-glass main-content-boxed remember-theme">
        <!-- Header -->
        <header id="page-header">
            <div class="content-header">
                <div class="space-x-1 d-flex align-items-center space-x-2 animated zoomInRight">
                    <a class="link-fx fw-bold" href="home">
                        <i class="fa fa-fire text-primary"></i>
                        <span class="fs-4 text-dual">TEAM 5 </span><span class="fs-4 text-primary">ONLINE</span>
                    </a>
                </div>
                <div class="space-x-1">
                    <ul class="nav-main nav-main-horizontal nav-main-hover nav">
                        <li class="nav-main-item">
                        </li>
                        <?php 
                        if(!isset($_COOKIE['token'])) {
                            echo '<li class="nav-main-item">
                                <a class="btn btn-hero btn-light rounded-pill" href="auth/signin">
                                    <i class="fa fa-right-to-bracket me-2"></i>Đăng nhập
                                </a>
                            </li>';
                        } else {
                            echo '<li class="nav-main-item">
                                <a class="btn btn-hero btn-primary rounded-pill" href="dashboard">
                                    <i class="fa fa-rocket me-2"></i>Dashboard
                                </a>
                            </li>';
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </header>
        <!-- END Header -->
        <!-- Main Container -->
        <main id="main-container">
            <!-- Hero -->
            <div class="hero bg-body-extra-light hero-bubbles hero-lg overflow-hidden">
                <div class="hero-inner">
                    <span class="hero-bubble hero-bubble-lg bg-warning" style="top: 20%; left: 10%;"></span>
                    <span class="hero-bubble bg-success" style="top: 20%; left: 80%;"></span>
                    <span class="hero-bubble hero-bubble-sm bg-xwork" style="top: 40%; left: 25%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-xmodern" style="top: 10%; left: 20%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-xeco" style="top: 30%; left: 90%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-danger" style="top: 35%; left: 20%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-warning" style="top: 60%; left: 35%;"></span>
                    <span class="hero-bubble bg-info" style="top: 60%; left: 80%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-xdream" style="top: 75%; left: 70%;"></span>
                    <span class="hero-bubble hero-bubble-lg bg-xpro" style="top: 75%; left: 10%;"></span>
                    <span class="hero-bubble bg-xplay" style="top: 90%; left: 90%;"></span>
                    <div class="position-relative d-flex align-items-center">
                        <div class="content content-full">
                            <div class="row g-6 w-100 py-7 overflow-hidden">
                                <div
                                    class="col-md-7 order-md-last py-4 d-md-flex align-items-md-center justify-content-md-end">
                                    <img class="img-fluid animated flipInX" src="./public/media/various/landing_3.png"
                                        alt="Hero Promo">
                                </div>
                                <div class="col-md-5 py-4 d-flex align-items-center invisible" data-toggle="appear"
                                    data-class="animated fadeInLeft">
                                    <div class="text-center text-md-start">
                                        <h1 class="fw-bold fs-2 mb-3">
                                        Xây dựng website thi trắc nghiệm .
                                        </h1>
                                        <p class="text-muted fw-medium mb-4">
                                            Thi trắc nghiệm TEAM 5 ONLINE
                                        </p>
                                        <a class="btn btn-alt-primary py-2 px-3 m-1" href="auth/signin" target="_blank">
                                            <i class="fa fa-arrow-right opacity-50 me-1"></i> Tham gia ngay
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <?php require "inc/script.php"?>
</body>

</html>