delete from takes_inventory;
delete from order_consists_of;
delete from customer_order;
delete from customer;
delete from shift_log;
delete from employee;
delete from made_from;
delete from drink;
delete from wings;
delete from menu_pizza;
delete from pasta;
delete from food;
delete from item;
delete from ingredient;

-- EMPLOYEE table
ALTER SEQUENCE employee_employee_id_seq RESTART WITH 1; -- reset serial auto-numbering
insert into employee
values(default, 'Mr. Manager', 'Man', '333-123-1111', '123 Fantasy St.', true, null, true,  null, null, true, '2010-05-12', 'elvinlimpin@gmail.com');
insert into employee
values(default, 'Mr Cook', 'ey-Monster', '403-456-9089', '123 Nowhere Cresc.', true, null, true,  null, null, true, null, 'peter.schulze@ucalgary.ca');
insert into employee
values(default, 'Ms. Server', 'Sam', '780-567-8934', '123 Home Rd.', true, null, true,  null, null, true, null,'kenneth.sharman@ucalgary.ca');

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

-- default stuff in the pantry
-- meats & drinks
INSERT INTO ingredient values('GFS', 'pepperoni', 5, 2, 9);
INSERT INTO ingredient values('GFS', 'wings', 20, 10, 30);
INSERT INTO ingredient values('GFS', 'meat ball', 10, 5, 20);
INSERT INTO ingredient values('GFS', 'pop syrup', 10, 5, 20);

-- breads
INSERT INTO ingredient VALUES('Sysco', 'noodles', 5, 3, 5);
INSERT INTO ingredient VALUES('Sysco', 'macaroni', 5, 3, 6);
INSERT INTO ingredient VALUES('Sysco', 'dough', 5, 3, 7);

--cheeses 
INSERT INTO ingredient VALUES('Sysco', 'mozzarella cheese', 5, 3, 5);
INSERT INTO ingredient VALUES('Sysco', 'swiss cheese', 5, 3, 6);

-- misc
INSERT INTO ingredient VALUES('Sysco', 'buffalo sauce', 5, 3, 5);
INSERT INTO ingredient VALUES('Sysco', 'tomato sauce', 5, 3, 5);
INSERT INTO ingredient VALUES('Sysco', 'bell pepper', 5, 3, 6);


/*
Merged food tables - this has to all be set in the database
item * food * food category

  price,
  item_number,
	food_name,
	station,
	out_of_stock_flag,
	description,
  
  membership to one of {
    drink,
    wings,
    menu_pizza,
    pasta
  }

  made_from {
    name,
    supplier,
    amount,
    weight,
  }

  convention: all meats and drinks are GFS all rest is Sysco
*/

-- ITEM table
ALTER SEQUENCE item_item_number_seq RESTART WITH 1; -- reset serial auto-numbering

-- Pasta: Mom's Spaghetti
  INSERT INTO item VALUES (default, 15.99);
  INSERT INTO food VALUES (1, 'Mom''s spaghetti', 'BAKE', false, 'Made with creamy tomato sauce and never frozen meatballs.');
  INSERT INTO pasta VALUES(1, true);
  INSERT INTO made_from VALUES('noodles', 'Sysco', 1, 2);
  INSERT INTO made_from VALUES('tomato sauce', 'Sysco', 1, 1);
  INSERT INTO made_from VALUES('meat balls', 'GFS', 1, 5);
  INSERT INTO made_from VALUES('mozzarella cheese', 'Sysco', 1, 3);

-- Pasta: Dad's Macaroni
  INSERT INTO item VALUES (default, 12.99);
  INSERT INTO food VALUES (2, 'Dad''s macaroni', 'BAKE', false, 'Made with good the good old hearty macaroni and cheese recipe your dad made.');
  INSERT INTO pasta VALUES(2, true);
  INSERT INTO made_from VALUES('macaroni', 'Sysco', 2, 2);
  INSERT INTO made_from VALUES('swiss cheese', 'Sysco', 2, 2);

-- Wings: Hot and Spicy Wings
  INSERT INTO item VALUES (default, 10.99);
  INSERT INTO food VALUES (3, '6pc Hot and Spicy Wings', 'BAKE', false, 'Comes with the dip of your choice and smothered in buffalo sauce.');
  INSERT INTO wings VALUES(3, 'buffalo', 'gravy');
  INSERT INTO made_from VALUES('wings', 'GFS', 3, 6);
  INSERT INTO made_from VALUES('buffalo sauce', 'Sysco', 3, 1);

-- Wings: Salt and Pepper Wings
  INSERT INTO item VALUES (default, 9.99);
  INSERT INTO food VALUES (4, '6pc Salt and Pepper Wings', 'BAKE', false, 'Comes with the dip of your choice and crunchy seasoned breading.');
  INSERT INTO wings VALUES(4, 'salt and pepper', 'gravy');
  INSERT INTO made_from VALUES('wings', 'GFS', 4, 6);
  
-- Pizza: Canadian Deluxe
  INSERT INTO item VALUES (default, 19.99);
  INSERT INTO food VALUES (5, 'Canadian Deluxe Pizza', 'BAKE', false, 'Pepperoni, mushroom, bell pepper, eh?');
  INSERT INTO menu_pizza VALUES(5, 'thick', 'sour cream');
  INSERT INTO made_from VALUES('dough', 'Sysco', 5, 1);
  INSERT INTO made_from VALUES('mozzarella cheese', 'Sysco', 5, 4);
  INSERT INTO made_from VALUES('pepperoni', 'GFS', 5, 2);
  INSERT INTO made_from VALUES('bell pepper', 'Sysco', 5, 1);

-- Pizza: Pepperoni
  INSERT INTO item VALUES (default, 17.99);
  INSERT INTO food VALUES (6, 'Pepperoni Pizza', 'BAKE', false, 'Good for parties and late night netflix binges.');
  INSERT INTO menu_pizza VALUES(6, 'thick', 'sour cream');
  INSERT INTO made_from VALUES('dough', 'Sysco', 6, 1);
  INSERT INTO made_from VALUES('mozzarella cheese', 'Sysco', 6, 4);
  INSERT INTO made_from VALUES('pepperoni', 'GFS', 6, 2);


-- Drinks: Koka Soda
  INSERT INTO item VALUES (default, 2.99);
  INSERT INTO food VALUES (7, 'Koka Soda', 'EXPO', false, 'You''re not you when you''re thirsty.');
  INSERT INTO drink VALUES(7);
  INSERT INTO made_from VALUES('pop syrup', 'GFS', 7, 1);

-- Drinks: Sespi Loca
  INSERT INTO item VALUES (default, 2.99);
  INSERT INTO food VALUES (8, 'Sespi Loca', 'EXPO', false, 'Imported straight from Ruerto Pico.');
  INSERT INTO drink VALUES(8);
  INSERT INTO made_from VALUES('pop syrup', 'GFS', 8, 1);


ALTER SEQUENCE customer_order_order_number_seq RESTART WITH 1;
ALTER SEQUENCE takes_inventory RESTART WITH 1; 