create table if not exists artisans (
  id bigserial primary key,
  name text not null,
  specialty text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id bigserial primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  category text,
  image_url text,
  artisan_id bigint references artisans(id) on delete set null,
  created_at timestamptz not null default now()
);