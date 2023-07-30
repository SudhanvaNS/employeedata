create database emp;
use emp;
create table emp_data (
    id int primary key,
    name varchar(100) not null,
    phone varchar(15),
    address varchar(100),
    departments varchar(100)
);