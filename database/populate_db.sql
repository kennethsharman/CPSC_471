delete from customer;
delete from shift_log;
delete from employee;
delete from made_from;
delete from food;
delete from item;
delete from ingredient;
delete from customer_order;
delete from order_consists_of;

-- EMPLOYEE table
ALTER SEQUENCE employee_employee_id_seq RESTART WITH 1; -- reset serial auto-numbering
insert into employee
values(default, 'Mr. Manager', 'Man', '333-123-1111', '123 Fantasy St.', true, null, true, null, null, true, '2010-05-12', 'elvin.limpin@ucalgary.ca');
insert into employee
values(default, 'Mr Cook', 'ey-Monster', '403-456-9089', '123 Nowhere Cresc.', true, null, true, null, null, false, null, 'peter.schulze@ucalgary.ca');
insert into employee
values(default, 'Ms. Server', 'Sam', '780-567-8934', '123 Home Rd.', false, null, true, null, null, false, null, 'kenneth.sharman@ucalgary.ca');

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
insert into customer
values(default, 2);
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
insert into customer
values(default, 2);

-- ITEM table
ALTER SEQUENCE item_item_number_seq RESTART WITH 1; -- reset serial auto-numbering
insert into item
values(default, 12.99);
insert into item
values(default, 12.99);
insert into item
values(default, 10.00);
insert into item
values(default, 6.50);
insert into item
values(default, 2000.00);

-- FOOD table
insert into food
values(1, 'S&P Wings', null, 'FRY', false);
insert into food
values(2, 'Hot Wings', null, 'FRY', false);
INSERT INTO food
  VALUES(3, 'Soylent Soup', null, 'SOUP', true);
INSERT INTO food
  VALUES(4, 'Toast', null, 'BREAKFAST', false);
INSERT INTO food
  VALUES(5, 'Lightly Cocained Caviar', null, 'BREAKFAST', false);

-- INGREDIENT table
insert into ingredient
values(1, 'GFS', 'Pound Wings', 72, 1, 3);
insert into ingredient
values(1, 'Sysco', 'Hot Sauce', 100, 1, 2);
INSERT INTO ingredient
  VALUES(1, 'Petes Mystery Meats', 'Soylent Green', 10, 5, 1);
INSERT INTO ingredient
  VALUES(2, 'GFS', 'White Bread', 100, 20, 30);
INSERT INTO ingredient
  VALUES(3, 'GFS', 'Strawberry Jam', 50, 10, 15);
INSERT INTO ingredient
  VALUES(2, 'Petes Mystery Meats', 'Caviar', 3, 2, 1);
INSERT INTO ingredient
  VALUES(1, 'Sketchy Business Student', 'Not-Cocaine (that would be illegal)', 3, 2, 1);

-- MADE_FROM table
insert into made_from
values(1, 'GFS', 1, 1, 1.0);
insert into made_from
values(1, 'GFS', 2, 1, 1.0);
insert into made_from
values(1, 'Sysco', 2, 1, 0.25);
INSERT INTO made_from
  VALUES(1, 'Petes Mystery Meats', 3, 3, 10.0);
INSERT INTO made_from
  VALUES(2, 'GFS', 4, 2, 0.1);
INSERT INTO made_from
  VALUES(3, 'GFS', 4, 1, 0.1);
INSERT INTO made_from
  VALUES(2, 'Petes Mystery Meats', 5, 1, 0.1);
INSERT INTO made_from
  VALUES(1, 'Sketchy Business Student', 5, 1, 0.0625);

ALTER SEQUENCE customer_order_order_number_seq RESTART WITH 1;
-- An open order for employee 1
INSERT INTO customer_order
  VALUES (default, 1, 1, '2016-06-22 20:07:25-06', '2016-06-22', 12.99, '15 minute', true, 'Nothing because I am not a pain in the ass.');
INSERT INTO customer_order
  VALUES (default, 2, 1, '2016-06-22 20:08:25-06', '2016-06-22', 10.00, '7 minute', true, 'Have it not be cold when it comes out k thx');
INSERT INTO customer_order
  VALUES (default, 3, 1, '2016-06-22 20:10:25-06', '2016-06-22', 2000.00, null, false, 'Make sure its made with EXTRA love <3');
INSERT INTO customer_order
  VALUES (default, 4, 1, '2016-06-22 20:14:25-06', '2016-06-22', 19.49, null, false, 'Extra fries plz');

INSERT INTO order_consists_of
  VALUES(1, 1, true);
INSERT INTO order_consists_of
  VALUES(2, 3, true);
INSERT INTO order_consists_of
  VALUES(3, 5, false);
INSERT INTO order_consists_of
  VALUES(4, 2, false);
INSERT INTO order_consists_of
  VALUES(4, 4, false);
