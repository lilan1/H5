<?php
open_mysql();
 function open_mysql(){
    $sql=mysqli_connect("localhost","root","root","game",3306);
     if(mysqli_connect_error()){
         echo "数据库打开失败";
     }else{
         echo "aa";
        $res=mysqli_query($sql,"INSERT INTO `user`(`user`, `password`, `name`, `age`, `sex`, `tel`, `email`) VALUES ('lilan','ll1213456','李岚',18,'女','12345678936','105689@qq.com')");
        echo $res;
    }
 }