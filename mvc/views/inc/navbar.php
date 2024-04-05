<?php require_once "config.php" ?>
<!-- Sidebar -->
<nav id="sidebar" aria-label="Main Navigation">
    <!-- Side Header -->
    <div class="bg-header-dark">
        <div class="content-header bg-white-5">
            <!-- Logo -->
            <a class="fw-semibold text-white tracking-wide" href="./">
                <span class="smini-visible">
                    <span class="opacity-75">TEAM 5 ONLINE</span>
                </span>
                <span class="smini-hidden">
                    <span class="opacity-75">TEAM 5 </span> ONLINE
                </span>
            </a>
            <!-- END Logo -->
            <!-- Options -->
            <div>
                <button type="button" class="btn btn-sm btn-alt-secondary d-lg-none" data-toggle="layout"
                    data-action="sidebar_close">
                    <i class="fa fa-times-circle"></i>
                </button>
            
            </div>
        </div>
    </div>
    <!-- END Side Header -->
    <!-- Sidebar Scrolling -->
    <div class="js-sidebar-scroll">
        <!-- Side Navigation -->
        <div class="content-side">
            <ul class="nav-main">
                <li class="nav-main-item">
                    <a class="nav-main-link <?php if(getActiveNav() == 'dashboard') echo "active" ?>" href="./dashboard">
                        <i class="nav-main-link-icon fa fa-rocket"></i>
                        <span class="nav-main-link-name">Tổng quan</span>
                    </a>
                </li>
                <?php build_navbar() ?>
            </ul>
        </div>
        <!-- END Side Navigation -->
    </div>
    <!-- END Sidebar Scrolling -->
</nav>
<!-- END Sidebar -->