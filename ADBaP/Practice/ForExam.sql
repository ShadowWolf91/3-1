create or replace function second_try(params orders.product%type)
return number is rc number(2);
begin
select count(*) into rc from orders o join customers on o.cust = customers.cust_num where product = params;
return rc;
end second_try;

select second_try('XK47') from dual;

create or replace function tenth_task2(repp orders.rep%type, pyear number)
return orders.amount%type is v orders.amount%type;
begin
select count(*) into v from orders where orders.rep = repp and trunc(orders.order_date, 'YYYY') = to_date(pyear, 'YYYY');
return v;
end tenth_task2;

select tenth_task2(108, '2008') from dual;

create or replace function dfdfd(dfdf orders.order_num%type)
return number is sss number(3);
begin
select count(*) into sss from orders where orders.order_num = dfdf;
return sss;
end dfdfd;

begin
dbms_output.put_line(dfdfd(113012));
end;




















create or replace procedure seventh_task(begyear in date, endyear in date)
is
cursor sev_curs is select distinct cust from orders where order_date between begyear and endyear;
o_cust orders.cust%type;
begin
    open sev_curs;
    loop
        fetch sev_curs into o_cust;
        exit when sev_curs%notfound;
        dbms_output.put_line(o_cust);
    end loop;
    close sev_curs;
    exception
        when others then dbms_output.put_line('код ошибки: '|| SQLCODE  ||SQLERRM);
end seventh_task;

begin
    seventh_task('11.01.2008','24.02.2008');
end;







create or replace procedure ddd(nnumm orders.order_num%type)
is
cursor fff is select order_num from orders where order_num = nnumm;
oo_ff orders.order_num%type;
begin
open fff;
    loop
    fetch fff into oo_ff;
    exit when fff%notfound;
    dbms_output.put_line(oo_ff);
    end loop;
    close fff;
    exception
    when others then
    dbms_output.put_line('код ошибки: '|| SQLCODE  ||SQLERRM);
end ddd;




















