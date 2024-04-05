<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';
require 'vendor/phpmailer/phpmailer/src/OAuth.php';
require 'vendor/phpmailer/phpmailer/src/POP3.php';

class MailAuth extends DB
{
    protected $mail;

    public function __construct()
    {
        parent::__construct();
        $this->mail = new PHPMailer(true);
        $this->mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output
        $this->mail->isSMTP(); // gửi mail SMTP
        $this->mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $this->mail->SMTPAuth = true; // Enable SMTP authentication
        $this->mail->Username = 'maixuananh2k1@gmail.com'; // SMTP username
        $this->mail->Password = '0981440270'; // SMTP password
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $this->mail->Port = 587; // TCP port to connect to
        $this->mail->setFrom('maixuananh2k1@gmail.com', 'TEAM5 ONLINE');
    }

    public function sendOpt($email,$opt)
    {
        try {
            $this->mail->addAddress($email); // Name is optional
            $this->mail->isHTML(true);   // Set email format to HTML
            $this->mail->Subject = 'Code OPT';
            $this->mail->Body = '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">TEAM5 ONLINE</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">'.$opt.'</h2>
                <p style="font-size:0.9em;">Regards,<br />TEAM5 ONLINE</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>QA Inc</p>
                    <p>Số 180 Cao Lỗ, Phường 4, Quận 8, TP. HCM</p>
                    <p>Việt Nam</p>
                </div>
                </div>
                </div>';
            $this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            $this->mail->send();
            echo "Success send";
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }
}