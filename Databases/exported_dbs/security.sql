PGDMP  (    4                 {            crypto    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16584    crypto    DATABASE     }   CREATE DATABASE crypto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Hungarian_Hungary.1250';
    DROP DATABASE crypto;
                postgres    false                        3079    16585    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                   false                       0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                        false    2            z           1247    16691    email    DOMAIN     �   CREATE DOMAIN public.email AS public.citext
	CONSTRAINT email_check CHECK ((VALUE OPERATOR(public.~) '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::public.citext));
    DROP DOMAIN public.email;
       public          postgres    false    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    16721 	   user_data    TABLE     f   CREATE TABLE public.user_data (
    id integer NOT NULL,
    email public.email,
    password text
);
    DROP TABLE public.user_data;
       public         heap    postgres    false    890            �            1259    16720    user_data_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_data_id_seq;
       public          postgres    false    217                       0    0    user_data_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_data_id_seq OWNED BY public.user_data.id;
          public          postgres    false    216            y           2604    16724    user_data id    DEFAULT     l   ALTER TABLE ONLY public.user_data ALTER COLUMN id SET DEFAULT nextval('public.user_data_id_seq'::regclass);
 ;   ALTER TABLE public.user_data ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    16721 	   user_data 
   TABLE DATA           8   COPY public.user_data (id, email, password) FROM stdin;
    public          postgres    false    217   �                  0    0    user_data_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_data_id_seq', 8, true);
          public          postgres    false    216            {           2606    16730    user_data user_data_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.user_data
    ADD CONSTRAINT user_data_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.user_data DROP CONSTRAINT user_data_email_key;
       public            postgres    false    217            }           2606    16728    user_data user_data_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_data
    ADD CONSTRAINT user_data_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_data DROP CONSTRAINT user_data_pkey;
       public            postgres    false    217               _   x�3�,�+H-I-222rH�M���K���L
ԯ��3I�p-6����I�L*����2��(M�/�DR��Q���U�Qh����T���� So     