--1
select * from v$pdbs;
--2
select * from v$instance;
--3
select * from dba_registry;
--4
grant alter session to U1_SDS_PDB;
alter pluggable database SDS_PDB open;
--5
select * from v$pdbs;
--6
create tablespace TS_SDS_PDB
datafile 'C:/app/Tablespaces/TS_SDS_PDB.dbf'
size 7M
autoextend on next 5M
maxsize 20M
extent management local; 

create temporary tablespace TS_SDS_PDB_TEMP
tempfile 'C:/app/Tablespaces/TS_SDS_PDB_TEMP.dbf'
size 5M
autoextend on next 3M
maxsize 30M
extent management local;

alter session set "_ORACLE_SCRIPT"=true;  
create role RL_SDSCORE_PDB;

grant create session,
      create table,
      create view,
      create procedure,
      drop any table,
      drop any view,
      drop any procedure to RL_SDSCORE_PDB;

create profile EXAM_PROFILE limit
  password_life_time 180 --number of password's days alive
  sessions_per_user 3 -- number of user's sessions
  failed_login_attempts 7 --number of loggin attempts
  password_lock_time 1 --number of locked days after failed login
  password_reuse_time 10 --after this days number you can repeat password
  password_grace_time default --days number of warning about change password
  connect_time 180 --in minute
  idle_time 30 --in minute    

create user U1_SDS_PDB identified by 16619
  default tablespace TS_SDS_PDB quota unlimited on TS_SDS_PDB
  temporary tablespace TS_SDS_PDB_TEMP
  profile EXAM_PROFILE
  account unlock;

grant RL_SDSCORE_PDB to U1_SDS_PDB;
      
--drop user U1_SDS_PDB;


--7
create table SDS_table
(
  x number
);
insert into SDS_table values (1);
select * from SDS_table;

--8
-- from SDS_PDB
select * from user_tablespaces;

select * from dba_data_files;
select * from dba_temp_files;

select * from dba_roles;
select * from dba_role_privs order by grantee;

select * from dba_profiles;
select * from dba_users;

select u.username, r.granted_role
  from dba_users u
  join dba_role_privs r on u.username = r.grantee;

--9
create user c##SDS identified by 16619
account unlock;
grant create session to C##SDS;

-- from SDS_pdb
grant create session to c##SDS;

--11
-- from SDS_pdb
select * from v$session where username is not null;

--12
select * from dba_data_files;
--13
-- from sysdba
alter pluggable database SDS_PDB close immediate;
drop pluggable database SDS_PDB;


-- drop all
drop user c##SDS cascade;