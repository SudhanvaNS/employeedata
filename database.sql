create database BIT_ISE;
use BIT_ISE;
create table students (
    usn varchar(10) primary key,
    name varchar(100) not null,
    phone varchar(15),
    gender enum('Male', 'Female');
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);

CREATE TABLE teacher (
    teacher_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password varchar(20)
);