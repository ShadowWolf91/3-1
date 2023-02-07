--1
create or replace procedure get_salesreps(bcode in orders.order_date%type,ocode in orders.rep%type)
    is
    cursor salesreps_cur is select * from orders where bcode = ocode;
    
    c_salesreps salesreps.empl%type;
    c_salesreps_name salesreps.name%type;
    c_office salesreps.rep_office%type;
    begin
        dbms_output.put_line('salesreps  salesreps_name                                                                                        office             ');
        dbms_output.put_line('---------- ---------------------------------------------------------------------------------------------------- --------------------');
        open salesreps_cur;
        loop
            fetch salesreps_cur into c_salesreps, c_salesreps_name, c_gender, c_office;
            exit when salesreps_cur%notfound;
            dbms_output.put_line(rpad(c_salesreps, 10) || ' ' || rpad(c_salesreps_name, 100) || ' ' || rpad(c_office, 20));
        end loop;
        close salesreps_cur;
end salesreps_cur;

begin
    salesreps_cur('');
end;

--2
create or replace function get_num_salesreps(rcode orders.rep%type, mcode orders.mfr%type)
    return number is rc number(2);
    begin
        select count(*) into rc from orders where rcode != mcode;
        return rc;
    exception 
        when others then return -1;
end get_num_salesreps;


select get_num_salesreps(108, 2117) from dual;