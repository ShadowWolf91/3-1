create table SDS_t(x number(3), s varchar2(50));
alter table SDS_t add constraint x_pk primary key (x);

insert all
into SDS_t(x,s) values (1,'sd')
into SDS_t(x,s) values (2,'dg')
into SDS_t(x,s) values (3,'gg')
select * from dual;
select * from SDS_t;
commit;

--insert into SDS_t(x,s) values (4,'asdf');
--insert into SDS_t(x,s) values (5,'asdg');
--insert into SDS_t(x,s) values (6,'afgd');

--select * from SDS_t;

update SDS_t
set s = 'hah'
where x > 1;
commit;

delete from SDS_t
where SDS_t.s = 'sd'
commit;

create table SDS_t1(x1 number(3), s1 varchar2(50),constraint x_fk 
foreign key (x1) references SDS_t(x));

insert all
into SDS_t1(x1,s1) values (1,'sd1')
into SDS_t1(x1,s1) values (2,'dg1')
into SDS_t1(x1,s1) values (3,'gg1')
select * from dual;
select * from SDS_t1;

select * 
from SDS_t inner join SDS_t1
on sds_t.x = SDS_t1.x1;

select * 
from SDS_t left outer join SDS_t1
on sds_t.x = SDS_t1.x1;

select * 
from SDS_t right outer join SDS_t1
on sds_t.x = SDS_t1.x1;

drop table SDS_t1;
drop table SDS_t;