<?php include "inc/config.php" ?>
<?php require "inc/head.php" ?>
<body>
    <!-- Page Container -->
    <div id="page-container" class="sidebar-o sidebar-light enable-page-overlay side-scroll page-header-fixed main-content-narrow remember-theme">
        <?php 
        include "inc/navbar.php";
        include "inc/header.php";
        ?>
        <!-- Main Container -->
        <main id="main-container">
        <!-- Page Content -->
        <?php include "./mvc/views/pages/".$data['Page'].".php" ?>
        <!-- END Page Content -->
        </main>
        <?php include "inc/footer.php" ?>
    </div>
    <!-- END Page Container -->
    <?php include "inc/script.php" ?>
    <script src="./public/js/permission.js"></script>
</body>
</html>

