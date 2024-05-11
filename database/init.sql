CREATE TABLE public.candidates (
	id SERIAL PRIMARY KEY,
	enabled bool NULL DEFAULT true,
	slug varchar NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	gender varchar NULL,
	birth_day timestamp NULL,
	email varchar NOT NULL,
	description varchar NULL,
	image varchar NULL,
	address varchar NULL,
	city varchar NULL,
	state varchar NULL,
	occupation varchar NULL,
	hobbies varchar NULL,
	remember_token varchar NULL,
	CONSTRAINT candidates_email_key UNIQUE (email),
	CONSTRAINT candidates_slug_key UNIQUE (slug)
);

INSERT INTO candidates (slug, first_name, last_name, gender, email) VALUES 
('bjarne-stroustrup', 'Bjarne', 'Stroustrup', 33, 'bjarne-stroustrup@cv.com'), 
('martin-fowler', 'Martin', 'Fowler', 44, 'martin-fowler@cv.com'),
('goran-subic', 'Goran', 'Subic', 43, 'goran-subic@cv.com');