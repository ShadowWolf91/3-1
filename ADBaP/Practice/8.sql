                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             --1
--C:\app\petra\product\21c\dbhomeXE\network\admin\sample\SQLNET.ORA
--C:\app\petra\product\21c\dbhomeXE\network\admin\sample\TNSNAMES.ORA

--2
show parameter instance

--3
--connect system/1661dss9@localhost:1521/SDS_PDB
--select * from v$pdbs;
--select * from v$tablespace;
--select * from dba_data_files;
--select * from all_users;
--select * from dba_role_privs;

--4
--regedit
--Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Oracle

--6
--conn U1_SDS_PDB/1661dss9@danila_pdb

--7
--select * from SDS_TABLE;

--8
--help
--help timing
--set timing on;
--select * from SDS_TABLE;
--set timing off;

--9
--help describe
--describe SDS_TABLE;

--10
--conn system/1661dss9@danila_pdb
--select * from dba_segments where owner = 'U1_SDS_PDB';

--11
--conn sys/1661dss9@danila_pdb as sysdba
create view EXTENTS as select extents, blocks, bytes from dba_segments;
select * from EXTENTS;