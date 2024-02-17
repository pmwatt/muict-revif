create database if not exists revif;
use revif;

-- ///////////////////////////////////////////////////////////
-- admin info

create table if not exists admin_info(
  username varchar(45) primary key,
  fname varchar(45) not null,
  lname varchar(45) not null,
  DOB date,
  phone varchar(10),
  email varchar(45) unique not null
);

insert into admin_info
  value ('gordonrando123','Gordon','Rando','1986-05-12','0968712769','gordon123@gmail.com'),
        ('jomama1010','Joe','Mam','2000-10-22','0696969696','joemama69@gmail.com'),
        ('asdfasdf01','Lisa','Hana','2001-07-18','0864734821','asdf01@gmail.com'),
        ('hakunamatata','Hakunma','Namatata','1994-10-30', '0815486243','hakun1337@gmail.com'),
        ('realbillgates','Steve','Jab','1998-04-01','0986754328','steve303@gmail.com');

-- ///////////////////////////////////////////////////////////
-- admin login info
create table if not exists admin_login(
	username varchar(45) primary key,
	pwd varchar(45),
	adminRole varchar(45),
	lastLoginDate date,
	constraint fk_adminLoginUsername foreign key (username) references admin_info (username)
);

insert into admin_login values
('gordonrando123', 'wheresthelambsauce', 'CTO', '2015-01-11'),
('jomama1010', 'whoisjoe69', 'CFO', '2019-09-12'),
('asdfasdf01', 'password01', 'CEO', '2017-10-14'),
('hakunamatata', 'letmeinalready', 'CSI', '2010-10-22'),
('realbillgates', 'appleissupreme', 'CGO', '2015-02-12');

-- ///////////////////////////////////////////////////////////
-- commission/product data
create table if not exists commission(
  commission_id int primary key,
  commission_name varchar(30) not null,
  issue_date date not null,
  due_date date not null,
  price decimal(12,2) not null,
  imageURL varchar(200),

  -- contact details
  commissioner_email varchar(50) not null,
  commissioner_phoneNum int not null
);

insert into commission values
(001, 'Wattana Kanchana', '2012-01-13', '2012-02-12', 1000000.00,'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'Wattana.Kan@gmail.com',0841151067),
(002, 'Ubon Porntip', '2022-02-12', '2022-04-23',350000.00,'https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', 'Ubon.por@gmail.com',0671506361),


(003, 'Intira Sunan', '2013-02-15', '2013-03-16', 2035.00,'https://images.unsplash.com/photo-1608501773255-d8cd9e5ba968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', 'intira.sum@gmail.com',0937561520),


(004, 'Somchai Suriya', '2020-04-12', '2021-04-23',750000.00,'https://images.unsplash.com/photo-1612107634878-93569d1ecc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Somchai.sur@gmail.com',0642242113),
(005, 'Thaksin Mongkut', '2017-10-19', '2021-01-01', 89400.00,'https://images.unsplash.com/photo-1604871038809-0462d7c3a3a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Thaksin.mon@gmail.com', 0236634965);create database if not exists revif;
use revif;
