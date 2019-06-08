delete from customer;
delete from shift_log;
delete from employee;
delete from made_from;
delete from food;
delete from item;
delete from ingredient;

-- EMPLOYEE table
ALTER SEQUENCE employee_employee_id_seq RESTART WITH 1; -- reset serial auto-numbering
insert into employee
values(default, 'Mr. Manager', 'Man', '333-123-1111', '123 Fantasy St.', true, null, true, null, null, true, '2010-05-12');
insert into employee
values(default, 'Mr Cook', 'ey-Monster', '403-456-9089', '123 Nowhere Cresc.', true, null, true, null, null, false, null);
insert into employee
values(default, 'Ms. Server', 'Sam', '780-567-8934', '123 Home Rd.', false, null, true, null, null, false, null);

-- SHIFT LOG table
insert into shift_log
values(1, '2016-06-22', '2016-06-22 19:10:25-06', '2016-06-22 21:10:25-06');
insert into shift_log
values(1, '2017-06-22', '2017-06-22 19:10:25-06', '2017-06-22 21:10:25-06');
insert into shift_log
values(2, '2018-06-22', '2018-06-22 19:10:25-06', '2018-06-22 21:10:25-06');
insert into shift_log
values(3, '2019-05-22', '2019-05-22 19:10:25-06', '2019-05-22 21:10:25-06');

-- CUSTOMER table
ALTER SEQUENCE customer_customer_number_seq RESTART WITH 1; -- reset serial auto-numbering
insert into customer
values(default, 4);
insert into customer
values(default, 3);
insert into customer
values(default, 6);
insert into customer
values(default, 2);
insert into customer
values(default, 2);

-- ITEM table
ALTER SEQUENCE item_item_number_seq RESTART WITH 1; -- reset serial auto-numbering
insert into item
values(default, 12.99);
insert into item
values(default, 12.99);

-- FOOD table
insert into food
values(1, 'S&P Wings', null, 'FRY', false);
insert into food
values(2, 'Hot Wings', null, 'FRY', false);

-- INGREDIENT table
insert into ingredient
values(1, 'GFS', 'Pound Wings', 72, 1, 3);
insert into ingredient
values(1, 'Sysco', 'Hot Sauce', 100, 1, 2);

-- MADE_FROM table
insert into made_from
values(1, 'GFS', 1, null, 1);
insert into made_from
values(1, 'GFS', 2, null, 1);
insert into made_from
values(1, 'Sysco', 2, 1, null);
