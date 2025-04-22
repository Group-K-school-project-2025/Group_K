--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-19 12:42:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 32772)
-- Name: schema.sql; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "schema.sql";


ALTER SCHEMA "schema.sql" OWNER TO postgres;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA "schema.sql"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA "schema.sql" IS 'AMI website';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 24582)
-- Name: ami; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ami (
    id integer NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.ami OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24581)
-- Name: ami_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ami_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ami_id_seq OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 218
-- Name: ami_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ami_id_seq OWNED BY public.ami.id;


--
-- TOC entry 227 (class 1259 OID 40977)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    template_id integer,
    quantity integer DEFAULT 1,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 40976)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 226
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 221 (class 1259 OID 24590)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24589)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO postgres;

--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 220
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- TOC entry 225 (class 1259 OID 40965)
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.templates (
    id integer NOT NULL,
    title character varying(100),
    image_url text,
    category character varying(50),
    price numeric(10,2),
    uploader character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    likes integer DEFAULT 0
);


ALTER TABLE public.templates OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 40964)
-- Name: templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.templates_id_seq OWNER TO postgres;

--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 224
-- Name: templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.templates_id_seq OWNED BY public.templates.id;


--
-- TOC entry 223 (class 1259 OID 32774)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(100) NOT NULL,
    mobile character varying(20),
    username character varying(50) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32773)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4662 (class 2604 OID 24585)
-- Name: ami id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ami ALTER COLUMN id SET DEFAULT nextval('public.ami_id_seq'::regclass);


--
-- TOC entry 4668 (class 2604 OID 40980)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4663 (class 2604 OID 24593)
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- TOC entry 4665 (class 2604 OID 40968)
-- Name: templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates ALTER COLUMN id SET DEFAULT nextval('public.templates_id_seq'::regclass);


--
-- TOC entry 4664 (class 2604 OID 32777)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4833 (class 0 OID 24582)
-- Dependencies: 219
-- Data for Name: ami; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ami (id, description) FROM stdin;
1	My test ami 1
2	My test ami 2
3	My test ami 1
4	My test ami 2
\.


--
-- TOC entry 4841 (class 0 OID 40977)
-- Dependencies: 227
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, user_id, template_id, quantity, added_at) FROM stdin;
\.


--
-- TOC entry 4835 (class 0 OID 24590)
-- Dependencies: 221
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, description) FROM stdin;
\.


--
-- TOC entry 4839 (class 0 OID 40965)
-- Dependencies: 225
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, title, image_url, category, price, uploader, created_at, likes) FROM stdin;
1	e-commerce Template 1	/images/business1_template.jpg	ecommerce	15.00	Minou	2025-04-11 09:58:58.065448	0
2	e-commerce Template 2	/images/business2_template.jpg	ecommerce	20.00	Minou	2025-04-11 09:58:58.065448	0
3	e-commerce Template 3	/images/business3_template.jpg	ecommerce	15.00	Minou	2025-04-11 09:58:58.065448	0
4	e-commerce Template 4	/images/business4_template.jpg	ecommerce	22.00	Minou	2025-04-11 09:58:58.065448	0
5	e-commerce Template 5	/images/business5_template.jpg	ecommerce	20.00	Minou	2025-04-11 09:58:58.065448	0
6	e-commerce Template 6	/images/business6_template.jpg	ecommerce	30.00	Minou	2025-04-11 09:58:58.065448	0
7	e-commerce Template 7	/images/business7_template.jpg	ecommerce	20.00	Minou	2025-04-11 09:58:58.065448	0
8	e-commerce Template 8	/images/business8_template.jpg	ecommerce	12.00	Minou	2025-04-11 09:58:58.065448	0
9	Business Template 1	/images/e-commerceWebsite1.jpg	business	15.00	Minou	2025-04-11 09:58:58.065448	0
10	Business Template 2	/images/e-commerceWebsite2.jpg	business	20.00	Minou	2025-04-11 09:58:58.065448	0
11	Business Template 3	/images/e-commerceWebsite3.jpg	business	15.00	Minou	2025-04-11 09:58:58.065448	0
12	Business Template 4	/images/e-commerceWebsite4.jpg	business	22.00	Minou	2025-04-11 09:58:58.065448	0
13	Business Template 5	/images/e-commerceWebsite5.jpg	business	20.00	Minou	2025-04-11 09:58:58.065448	0
14	Business Template 6	/images/e-commerceWebsite6.jpg	business	30.00	Minou	2025-04-11 09:58:58.065448	0
15	Education Template 1	/images/EducationWebsite1.jpg	education	15.00	Minou	2025-04-11 09:58:58.065448	0
16	Education Template 2	/images/EducationWebsite2.jpg	education	20.00	Minou	2025-04-11 09:58:58.065448	0
17	Education Template 3	/images/EducationWebsite3.jpg	education	15.00	Minou	2025-04-11 09:58:58.065448	0
18	Event Template 1	/images/EventWebsite1.jpg	event	15.00	Minou	2025-04-11 09:58:58.065448	0
19	Event Template 2	/images/EventWebsite2.jpg	event	20.00	Minou	2025-04-11 09:58:58.065448	0
20	Event Template 3	/images/EventWebsite3.jpg	event	15.00	Minou	2025-04-11 09:58:58.065448	0
21	Non-profit Template 1	/images/Non-profitWebsite1.jpg	nonprofit	15.00	Minou	2025-04-11 09:58:58.065448	0
22	Non-profit Template 2	/images/Non-profitWebsite2.jpg	nonprofit	20.00	Minou	2025-04-11 09:58:58.065448	0
23	Non-profit Template 3	/images/Non-profitWebsite3.jpg	nonprofit	15.00	Minou	2025-04-11 09:58:58.065448	0
24	Portfolio Template 1	/images/PortfolioWebsite1.jpg	portfolio	15.00	Minou	2025-04-11 09:58:58.065448	0
25	Portfolio Template 2	/images/PortfolioWebsite2.jpg	portfolio	20.00	Minou	2025-04-11 09:58:58.065448	0
26	Portfolio Template 3	/images/PortfolioWebsite3.jpg	portfolio	15.00	Minou	2025-04-11 09:58:58.065448	0
27	Portfolio Template 4	/images/PortfolioWebsite4.jpg	portfolio	12.00	Minou	2025-04-11 09:58:58.065448	0
28	Portfolio Template 5	/images/PortfolioWebsite5.jpg	portfolio	20.00	Minou	2025-04-11 09:58:58.065448	0
29	Real-Estate Template 1	/images/RealEstateWebsite1.jpg	realestate	15.00	Minou	2025-04-11 09:58:58.065448	0
30	Real-Estate Template 2	/images/RealEstateWebsite2.jpg	realestate	20.00	Minou	2025-04-11 09:58:58.065448	0
31	Real-Estate Template 3	/images/RealEstateWebsite3.jpg	realestate	15.00	Minou	2025-04-11 09:58:58.065448	0
32	Real-Estate Template 4	/images/RealEstateWebsite4.jpg	realestate	12.00	Minou	2025-04-11 09:58:58.065448	0
33	Real-Estate Template 5	/images/RealEstateWebsite5.jpg	realestate	20.00	Minou	2025-04-11 09:58:58.065448	0
34	Restaurant Template 1	/images/ResturantWebsite1.jpg	restaurant	15.00	Minou	2025-04-11 09:58:58.065448	0
35	Restaurant Template 2	/images/ResturantWebsite2.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
36	Restaurant Template 3	/images/ResturantWebsite3.jpg	restaurant	15.00	Minou	2025-04-11 09:58:58.065448	0
37	Restaurant Template 4	/images/ResturantWebsite4.jpg	restaurant	12.00	Minou	2025-04-11 09:58:58.065448	0
38	Restaurant Template 5	/images/ResturantWebsite5.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
39	Restaurant Template 6	/images/ResturantWebsite6.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
40	Restaurant Template 7	/images/ResturantWebsite7.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
41	Restaurant Template 8	/images/ResturantWebsite8.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
42	Restaurant Template 9	/images/ResturantWebsite9.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
43	Restaurant Template 10	/images/ResturantWebsite10.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
44	Restaurant Template 11	/images/ResturantWebsite11.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
45	Restaurant Template 12	/images/ResturantWebsite12.jpg	restaurant	20.00	Minou	2025-04-11 09:58:58.065448	0
\.


--
-- TOC entry 4837 (class 0 OID 32774)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, mobile, username, password) FROM stdin;
1	Minou	Vahedi	minoovahedinezhad@gmail.com	+453229161	minoovn	minoovn
3	Ieva	Ieva	Ieva@gmail.com	123456	Ieva	Ieva123
4	Xy	xy	xy@gmail.com	123	xy	qwe
5	Ali	Ali	Ali@gmail.com	123456	Ali	Ali123
6	sara	sara	sara@gmail.com	123456	sara	sara123
7	as	as	as@gmail.com	123	as	$2b$10$WlnwRO.yxWlszv8DauWq1uQpT7ryBGQfK3r8wBxndYTrFwGQP0PR.
\.


--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 218
-- Name: ami_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ami_id_seq', 4, true);


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 226
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 220
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 1, false);


--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 224
-- Name: templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.templates_id_seq', 45, true);


--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4672 (class 2606 OID 24587)
-- Name: ami ami_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ami
    ADD CONSTRAINT ami_pkey PRIMARY KEY (id);


--
-- TOC entry 4684 (class 2606 OID 40984)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4674 (class 2606 OID 24595)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- TOC entry 4682 (class 2606 OID 40974)
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- TOC entry 4676 (class 2606 OID 32783)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4678 (class 2606 OID 32781)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4680 (class 2606 OID 32785)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4685 (class 2606 OID 40990)
-- Name: cart_items cart_items_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.templates(id) ON DELETE CASCADE;


--
-- TOC entry 4686 (class 2606 OID 40985)
-- Name: cart_items cart_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-04-19 12:42:23

--
-- PostgreSQL database dump complete
--

