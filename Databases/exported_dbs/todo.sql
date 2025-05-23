PGDMP  +                
    {            todo    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16516    todo    DATABASE     {   CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Hungarian_Hungary.1252';
    DROP DATABASE todo;
                postgres    false            �            1259    16518 
   dailytasks    TABLE     K   CREATE TABLE public.dailytasks (
    id integer NOT NULL,
    task text
);
    DROP TABLE public.dailytasks;
       public         heap    postgres    false            �            1259    16517    dailytasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dailytasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.dailytasks_id_seq;
       public          postgres    false    216            �           0    0    dailytasks_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.dailytasks_id_seq OWNED BY public.dailytasks.id;
          public          postgres    false    215            �            1259    16527 	   worktasks    TABLE     J   CREATE TABLE public.worktasks (
    id integer NOT NULL,
    task text
);
    DROP TABLE public.worktasks;
       public         heap    postgres    false            �            1259    16526    worktasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.worktasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.worktasks_id_seq;
       public          postgres    false    218            �           0    0    worktasks_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.worktasks_id_seq OWNED BY public.worktasks.id;
          public          postgres    false    217                       2604    16521    dailytasks id    DEFAULT     n   ALTER TABLE ONLY public.dailytasks ALTER COLUMN id SET DEFAULT nextval('public.dailytasks_id_seq'::regclass);
 <   ALTER TABLE public.dailytasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                        2604    16530    worktasks id    DEFAULT     l   ALTER TABLE ONLY public.worktasks ALTER COLUMN id SET DEFAULT nextval('public.worktasks_id_seq'::regclass);
 ;   ALTER TABLE public.worktasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    16518 
   dailytasks 
   TABLE DATA           .   COPY public.dailytasks (id, task) FROM stdin;
    public          postgres    false    216   r       �          0    16527 	   worktasks 
   TABLE DATA           -   COPY public.worktasks (id, task) FROM stdin;
    public          postgres    false    218   �       �           0    0    dailytasks_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.dailytasks_id_seq', 2, true);
          public          postgres    false    215            �           0    0    worktasks_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.worktasks_id_seq', 1, true);
          public          postgres    false    217            "           2606    16525    dailytasks dailytasks_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.dailytasks
    ADD CONSTRAINT dailytasks_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.dailytasks DROP CONSTRAINT dailytasks_pkey;
       public            postgres    false    216            $           2606    16534    worktasks worktasks_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.worktasks
    ADD CONSTRAINT worktasks_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.worktasks DROP CONSTRAINT worktasks_pkey;
       public            postgres    false    218            �   ?   x�3�t�RHM�T��/.Q�>�����ڒԒ����l.#�tAjJf:D����)���=... #�L      �   +   x�3��IU�N��Q�N,H.����THT�q��N-����� �y
;     