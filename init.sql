CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL PRIMARY KEY,
    login character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address character varying(255),
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL
);