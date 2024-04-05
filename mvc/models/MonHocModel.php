<?php
class MonHocModel extends DB
{
    public function create($mamon, $tenmon, $sotinchi, $sotietlythuyet, $sotietthuchanh)
    {
        $valid = true;
        $sql = "INSERT INTO `monhoc`(`mamonhoc`, `tenmonhoc`, `sotinchi`, `sotietlythuyet`, `sotietthuchanh`, `trangthai`) VALUES ('$mamon','$tenmon','$sotinchi','$sotietlythuyet','$sotietthuchanh', 1)";
        $result = mysqli_query($this->con, $sql);
        if (!$result) $valid = false;
        return $valid;
    }

    public function update($id, $mamon, $tenmon, $sotinchi, $sotietlythuyet, $sotietthuchanh)
    {
        $valid = true;
        $sql = "UPDATE `monhoc` SET `mamonhoc`='$mamon',`tenmonhoc`='$tenmon',`sotinchi`='$sotinchi',`sotietlythuyet`='$sotietlythuyet',`sotietthuchanh`='$sotietthuchanh' WHERE `mamonhoc`='$id'";
        $result = mysqli_query($this->con, $sql);
        if (!$result) $valid = false;
        return $valid;
    }

    public function delete($mamon)
    {
        $valid = true;
        $sql = "UPDATE `monhoc` SET `trangthai`= 0 WHERE `mamonhoc`='$mamon'";
        $result = mysqli_query($this->con, $sql);
        if (!$result) $valid = false;
        return $valid;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM `monhoc` WHERE `trangthai` = 1";
        $result = mysqli_query($this->con, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM `monhoc` WHERE `mamonhoc` = '$id'";
        $result = mysqli_query($this->con, $sql);
        return mysqli_fetch_assoc($result);
    }

    public function search($input)
    {
        $sql = "SELECT * FROM `monhoc` WHERE `mamonhoc` LIKE '%$input%' OR `tenmonhoc` LIKE N'%$input%';";
        $result = mysqli_query($this->con, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function getAllSubjectAssignment($userid)
    {
        $sql = "SELECT monhoc.* FROM phancong, monhoc WHERE manguoidung = '$userid' AND monhoc.mamonhoc = phancong.mamonhoc AND monhoc.trangthai = 1";
        $result = mysqli_query($this->con, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function getQuery($filter, $input, $args)
    {
        $query = "SELECT * FROM `monhoc` WHERE `trangthai` = 1";
        if ($input) {
            $query = $query . " AND (`monhoc`.`tenmonhoc` LIKE N'%${input}%' OR `monhoc`.`mamonhoc` LIKE '%${input}%')";
        }
        return $query;
    }

    public function checkSubject($mamon)
    {
        $sql = "SELECT * FROM `monhoc` WHERE `mamonhoc` = $mamon";
        $result = mysqli_query($this->con, $sql);
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
}
