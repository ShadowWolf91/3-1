--1
-- from SDS
select * From dba_tablespaces;

--2
create tablespace SDS_QDATA_5
  datafile 'C:\app\LW5\SDS_QDATA.dbf'
  size 10 m
  autoextend on next 5 m
  maxsize 30 m
  extent management local
  offline;

alter tablespace SDS_QDATA_5 online;  

--Drop tablespace SDS_QDATA_5

alter user SDSCORE
  default tablespace SDS_QDATA_5 quota 2m on SDS_QDATA_5;


--from SDSCORE
create table SDS_T1(
num int primary key,
desctiprion varchar(150))tablespace SDS_QDATA_5;

insert into SDS_T1
  values (1, 'one');
insert into SDS_T1
  values (2, 'two');
insert into SDS_T1 
  values (3, 'three');

select * from SDS_T1;

--3
select distinct * from user_segments where tablespace_name = 'SDS_QDATA_5';
select distinct * from user_segments where tablespace_name != 'SDS_QDATA_5';

--4
drop table SDS_T1;

select distinct * from user_segments where tablespace_name = 'SDS_QDATA_5';

select * from user_recyclebin;

--5
flashback table SDS_T1 to before drop;

select * from SDS_T1;

--6

declare i int:= 4;
begin loop i:=i+1;
  Insert into SDS_T1 values (i,'number');
  exit when(i = 10000);
end loop;
end;  
select * from SDS_T1;

--7--
select * from user_segments where tablespace_name = 'SDS_QDATA_5';

select * from user_extents where tablespace_name = 'SDS_QDATA_5';

--8--
--from SDS
drop tablespace SDS_QDATA_5 including contents and datafiles;

--9
select Group#,Status,Members from V$LOG;

--10
select * from V$LOGFILE;

--11
select * from V$LOG; -- 10/10/2022

alter system switch logfile;
select GROUP#, SEQUENCE#,STATUS,FIRST_CHANGE#  From V$LOG;

--12--
alter database add logfile group 4 'C:\app\LW5\REDO04.LOG'
  size 50m blocksize 512;

select GROUP#, SEQUENCE#,STATUS,FIRST_CHANGE#  From V$LOG;

alter database add logfile member 'C:\app\LW5\REDO041.LOG' to group 4;
alter database add logfile member 'C:\app\LW5\REDO042.LOG' to group 4;
alter database add logfile member 'C:\app\LW5\REDO043.LOG' to group 4;

--13--
alter database drop logfile member 'C:\app\LW5\REDO041.LOG';
alter database drop logfile member 'C:\app\LW5\REDO042.LOG';
alter database drop logfile member 'C:\app\LW5\REDO043.LOG';

alter database drop logfile group 4;

--14--
select GROUP#, ARCHIVED from V$LOG;

select name, Log_MODE from v$database;
select Archiver, Active_State From v$instance;

--15--
select * from (select * from v$archive_dest_status order by dest_id desc) 
  where rownum = 1;

--16--
--sysdba
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
ALTER DATABASE ARCHIVELOG;
ALTER DATABASE OPEN;
archive log list;

--17--
alter system switch logfile;
select * From V$archived_log;

--18
--sysdba
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
ALTER DATABASE NOARCHIVELOG;
ALTER DATABASE OPEN;
archive log list;

--19--
select * from v$controlfile;

--20--
select * from v$controlfile_record_section;

--21--
Show Parameter control;

--C:\APP\PETRA\admin\XE\pfile
----C:\APP\PETRA\PRODUCT\21C\ORADATA\XE\CONTROL01.CTL
----C:\APP\PETRA\PRODUCT\21C\ORADATA\XE\CONTROL02.CTL

--22--
create pfile = 'SDS_PFILE.ORA' from spfile;

--23--
--C:\APP\PETRA\PRODUCT\21C\dbhomeXE\database

--24--
select * From v$diag_info;

--25--
--C:\app\petra\product\21c\diag\rdbms\xe\xe\alert