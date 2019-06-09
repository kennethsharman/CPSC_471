 
--drop schema public cascade;
--create schema public;

CREATE TABLE employee (
	employee_id serial PRIMARY KEY,
	f_name text,
	l_name text,
	phone_number text,
	address text,
	cook_flag boolean,
	station text,
	server_flag boolean,
	cash_out numeric,
	tip_out numeric,
	manager_flag boolean,
	mgr_start_date date,
	email text NOT NULL UNIQUE,
);

CREATE TABLE shift_log (
	employee_id int REFERENCES employee(employee_id) NOT NULL,
	shift_date date NOT NULL,
	time_in timestamp NOT NULL,
	time_out timestamp CHECK (time_out > time_in),
	PRIMARY KEY (employee_id, shift_date, time_in)
);

CREATE TABLE customer (
	customer_number serial PRIMARY KEY,
	group_size int
);

CREATE TABLE customer_order (
	order_number serial PRIMARY KEY,
	customer_number int REFERENCES customer(customer_number),
	employee_id int REFERENCES employee(employee_id),
	start_time timestamp,
	order_date date,
	price numeric,
	ticket_time interval,
	completed_flag boolean,
	special_request text
);

CREATE TABLE allergy (
	order_number int REFERENCES customer_order(order_number),
	allergy text,
	PRIMARY KEY (order_number, allergy)
);

CREATE TABLE ingredient (
	ingredient_number int NOT NULL,
	supplier text NOT NULL,
	name text NOT NULL,
	recommended_count int CHECK (recommended_count > 0),
	critical_count int CHECK (critical_count > 0),
	on_hand_count int CHECK (on_hand_count > 0),
	PRIMARY KEY (ingredient_number, supplier)
);

CREATE TABLE takes_inventory (
	manager_id int REFERENCES employee(employee_id) NOT NULL,
	ingredient_number int NOT NULL,
	supplier text NOT NULL,
	inventory_date date NOT NULL,
	count int,
	FOREIGN KEY (ingredient_number, Supplier) REFERENCES ingredient(ingredient_number, supplier),
	PRIMARY KEY (manager_id, ingredient_number, supplier, inventory_date)
);

CREATE TABLE payment (
	order_number int REFERENCES customer_order(order_number) PRIMARY KEY,
	customer_number int REFERENCES customer(customer_number),
	employee_id int REFERENCES employee(employee_id),
	payment_time timestamp,
	payment_method text,
	total_payment numeric
);

CREATE TABLE item (
	item_number serial PRIMARY KEY,
	price numeric
);

CREATE TABLE drink (
	item_number int REFERENCES item(item_number) PRIMARY KEY,
	description text
);

CREATE TABLE food (
	item_number int REFERENCES item(item_number) PRIMARY KEY,
	food_name text,
	cook_id int REFERENCES employee(employee_id),
	station text,
	out_of_stock_flag boolean
);

CREATE TABLE wings (
	item_number int REFERENCES food(item_number) PRIMARY KEY,
	sauce text,
	dip text
);

CREATE TABLE pasta (
	item_number int REFERENCES food(item_number) PRIMARY KEY,
	baked_flag boolean
);

CREATE TABLE menu_pizza (
	item_number int REFERENCES food(item_number) PRIMARY KEY,
	crust text,
	dip text
);

CREATE TABLE custom_pizza (
	item_number int REFERENCES food(item_number) PRIMARY KEY,
	crust text,
	sauce text,
	cheese text,
	topping1 text,
	topping2 text
);

CREATE TABLE made_from (
	ingredient_number int NOT NULL,
	supplier text NOT NULL,
	item_number int REFERENCES food(item_number),
	amount int,
	weight numeric,
	FOREIGN KEY (ingredient_number, supplier) REFERENCES ingredient(ingredient_number, supplier),
	PRIMARY KEY (ingredient_number, supplier, item_number)
);

CREATE TABLE order_consists_of (
	order_number int REFERENCES customer_order(order_number),
	item_number int REFERENCES item(item_number),
	completed_flag boolean,
	PRIMARY KEY (order_number, item_number)
);
