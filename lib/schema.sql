create table if not exists artisans (
  id serial primary key,
  name varchar(100) not null,
  bio text,
  contact_email varchar(150),
  created_at timestamp default now()
);

create table if not exists users (
  id serial primary key,
  name varchar(100) not null,
  email varchar(150) unique not null,
  password_hash text not null,
  created_at timestamp default now()
);

create table if not exists products (
  id serial primary key,
  artisan_id integer not null,
  title varchar(150) not null,
  description text,
  price numeric(10,2) not null,
  stock integer default 0,
  created_at timestamp default now(),
  constraint products_artisan_id_fkey
    foreign key (artisan_id)
    references artisans(id)
    on delete cascade
);

create table if not exists ratings (
  id serial primary key,
  user_id integer not null,
  product_id integer not null,
  rating integer not null,
  comment text,
  created_at timestamp default now(),
  constraint ratings_rating_check
    check (rating >= 1 and rating <= 5),
  constraint ratings_product_id_fkey
    foreign key (product_id)
    references products(id)
    on delete cascade,
  constraint ratings_user_id_fkey
    foreign key (user_id)
    references users(id)
    on delete cascade,
  constraint ratings_user_id_product_id_key
    unique (user_id, product_id)
);

create table if not exists wishlists (
  id serial primary key,
  user_id integer unique not null,
  created_at timestamp default now(),
  constraint wishlists_user_id_fkey
    foreign key (user_id)
    references users(id)
    on delete cascade,
  constraint wishlists_user_id_key
    unique (user_id)
);

create table if not exists wishlist_items (
  id serial primary key,
  wishlist_id integer not null,
  product_id integer not null,
  added_at timestamp default now(),
  constraint wishlist_items_product_id_fkey
    foreign key (product_id)
    references products(id)
    on delete cascade,
  constraint wishlist_items_wishlist_id_fkey
    foreign key (wishlist_id)
    references wishlists(id)
    on delete cascade,
  constraint wishlist_items_wishlist_id_product_id_key
    unique (wishlist_id, product_id)
);