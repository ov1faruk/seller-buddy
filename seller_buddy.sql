PGDMP     3    4                {            seller_buddy    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    seller_buddy    DATABASE     �   CREATE DATABASE seller_buddy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE seller_buddy;
                postgres    false            �            1259    16400    buyer    TABLE     �   CREATE TABLE public.buyer (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.buyer;
       public         heap    postgres    false            �            1259    16399    buyer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.buyer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.buyer_id_seq;
       public          postgres    false    215                       0    0    buyer_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.buyer_id_seq OWNED BY public.buyer.id;
          public          postgres    false    214            �            1259    24591    cart    TABLE     �   CREATE TABLE public.cart (
    id integer NOT NULL,
    quantity integer NOT NULL,
    "productId" integer,
    "buyerId" integer
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    24590    cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public          postgres    false    219                       0    0    cart_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;
          public          postgres    false    218            �            1259    16409    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    price numeric(10,2) NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16408    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    217                       0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    216            o           2604    16403    buyer id    DEFAULT     d   ALTER TABLE ONLY public.buyer ALTER COLUMN id SET DEFAULT nextval('public.buyer_id_seq'::regclass);
 7   ALTER TABLE public.buyer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            q           2604    24594    cart id    DEFAULT     b   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            p           2604    16412 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            	          0    16400    buyer 
   TABLE DATA           4   COPY public.buyer (id, email, password) FROM stdin;
    public          postgres    false    215   �                 0    24591    cart 
   TABLE DATA           D   COPY public.cart (id, quantity, "productId", "buyerId") FROM stdin;
    public          postgres    false    219   �                 0    16409    product 
   TABLE DATA           ?   COPY public.product (id, name, description, price) FROM stdin;
    public          postgres    false    217   �                  0    0    buyer_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.buyer_id_seq', 3, true);
          public          postgres    false    214                       0    0    cart_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.cart_id_seq', 1, true);
          public          postgres    false    218                       0    0    product_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.product_id_seq', 310, true);
          public          postgres    false    216            s           2606    16407 $   buyer PK_0480fc3c7289846a31b8e1bc503 
   CONSTRAINT     d   ALTER TABLE ONLY public.buyer
    ADD CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.buyer DROP CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503";
       public            postgres    false    215            u           2606    16416 &   product PK_bebc9158e480b949565b4dc7a82 
   CONSTRAINT     f   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82";
       public            postgres    false    217            w           2606    24596 #   cart PK_c524ec48751b9b5bcfbf6e59be7 
   CONSTRAINT     c   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.cart DROP CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7";
       public            postgres    false    219            x           2606    24597 #   cart FK_371eb56ecc4104c2644711fa85f    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES public.product(id);
 O   ALTER TABLE ONLY public.cart DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f";
       public          postgres    false    217    3189    219            y           2606    24604 #   cart FK_affc4f2e8c70c434f766e4b2808    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "FK_affc4f2e8c70c434f766e4b2808" FOREIGN KEY ("buyerId") REFERENCES public.buyer(id);
 O   ALTER TABLE ONLY public.cart DROP CONSTRAINT "FK_affc4f2e8c70c434f766e4b2808";
       public          postgres    false    219    215    3187            	   8   x�3�L*�L-rH�H�-�I�K���,NM.-J-H,..�/J�2�L$�Ę��=... ��'�            x������ � �         �  x����n�F�k�)�c�v�4�]4F����745��P��%���R�0�9�nbK�v8C����O>f��޳���-�!���)Ó��kh�}ɲj��2��o�>~7a�a��^��-�*+[VW����o!����F��]]�����z��]1lV�_�ݾ�BÖy�<$�ǯ��U[|���U��6EU��eE5n4����M��L"y���2��m]�x��~?ǏB%�k+�.���˯E������MX�q�<ۅ&�
��]6���z8��\ϻ�-�X;{̪lv���]��E����x�� ��K��}�Ն=�wߍ�7�m"�u�i8އ�d=-��_��n����l��a���ئ	Y��m]��<&�m�Rt�8�t�����g]Ɩ]��Ў�\����7c�&C�T,\.5l޾�<�l>�H<��v�X�m�����2۵}��>+�o��"���6��س�4m�W�p�VE�/��x¼���۰��"c�å�&�T�9�vW����u�Uq҄0��}�ʆFf1��i.�́=�7.L;�;�Z�]��T:�f�z���̋�a�����{>�£��R�߰z�>�&x;N�W�K�S%�\�c�|C��P�I�)�q-�<��H���S8iwٴ�6�OX,,N�C�7��'�k�ߏ�}]o��ŷP2��8��3N�m�������Yg�8h�n���.ߞ�����9&/�Ekf�"��/�]��y��n�b���c��^ٴ��n8U6L%���̺��b��}�����u7}��ヰ`��{m��6����O���ڬ���C|�è�Ǘ����8��Sh�M����jH~��M0�M_k��ç�;a�/��S����*<�� Ϟ�:���')��������Wż���{5�i�R�d��� �AZ�d��$�G&���dP�J�%�R�dP)8��%�2�dP�<��B2(O�)�)�)�R3�P3�P3�P3��fHAfH�f�83h�4��5̠)͠af�3hr3h3h��jCh2�A����`�f0�f0�0��4����B�`��`i�`�f�P3X�,�,�m�3����ћ�]���f1�#7��1����C��f��f� 3x�<�nOo3xJ3�kN��$Nߞĉ��8�A�c;�8�E�S�(qT�G�A���Az@qAAI!`��!�!#�OhPH($��JBHBJ	���hL�ӄ�pNI�	!���J�
��B���H
+
��BQ�B�D��H��H�H�H�"��T)N)F)�(R"Q�XQh�(4V�R%
��B�E���W�&����`Da�Ea�Da��0࿢Ɗ�P� Daࢰ@QX�(,@�*�����8QX�(,�(,�(,V+
����C���EဢpxQ8�(�UD�HE�q��QxzQx"Qx�(<V+
O)
[�	�6pq&�_���g�WY���.��q+4q�M�~�&N�H��B
�(���B
BQH�hQH��pQHA/
)�!
)|�t|^����">���M����!�l%g[�D�;��3��H:�5IBG��#5M�Hi��#4t^v��Й�Cg�vH:S"}�lE��ԥH�x����y�����iiE�/�HʓE�i�"РH%4(R����?=(��C⠘�R�ԁH/[AA1u)�ż5�T'����$A��E��D����XQh�(4�(J�C�0@Q�(@��DDPRQ�(�0����%�Ŋ�bEa������(Q�����Ea� Q�[A�HE�p����H�^�H+
��Ê�Q�£D1o;�
�ǋ�D1oMD�'�ǉb�<#IPxrQ(N#
š�P*
š�P�P��D��m����ǉBq�(����&��ۛ������     