<?php
class Home extends Controller{

    function default(){
        $this->view("landing", [
            "Title"=>"TEAM5 ONLINE - Hệ thống thi trực tuyến",
            "Script"=>"landing",
            "Plugin" => [
                "jq-appear" => 1,
                "slick" => 1
            ]
        ]);
    }
}
?>