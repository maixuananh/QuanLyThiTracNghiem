<?php
require_once 'vendor/autoload.php';
require_once './mvc/models/NguoiDungModel.php';
class GoogleAuth extends DB{

    protected $client;
    protected $nguoidung;

    public function __construct() {
        parent::__construct();
        $this->client = new Google_Client();
        $this->client->setClientId('381736684532-nvaeqmmgriog6ctndltmnbtat450ks1e.apps.googleusercontent.com');
        $this->client->setClientSecret('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');
        $this->client->setRedirectUri(login_path);
        $this->client->setScopes('email');
        $this->client->addScope('profile');
        $this->nguoidung = new NguoiDungModel();
    }

    public function getAuthUrl() {

        return $this->client->createAuthUrl();
    }

    public function handleCallback($code) {
        try {
            $token = $this->client->fetchAccessTokenWithAuthCode($code);
            $this->client->setAccessToken($token['access_token']);

            $oauth = new Google_Service_Oauth2($this->client);
            $userInfo = $oauth->userinfo->get();

            // Lưu thông tin người dùng vào session hoặc database
            $email = $userInfo->email;
            $username = $userInfo->name;
            $userid = $userInfo->id;
            $token = time().password_hash($email,PASSWORD_DEFAULT);
            setcookie('token', $token, time() + 7 * 24 * 60 * 60, '/');
            $sqlcheck = "SELECT * FROM `nguoidung` WHERE email = '$email'";
            $check = mysqli_query($this->con, $sqlcheck);
            if(mysqli_num_rows($check) > 0){
                $sql = "UPDATE `nguoidung` SET `token`='$token' WHERE `email` = '$email'";
                mysqli_query($this->con,$sql);
            }
            // Chuyển hướng đến trang chủ
            header('Location: ../dashboard');
            exit;
        } catch (Exception $e) {
            echo $e->getMessage();
            exit;
        }
    }
    

    
}
