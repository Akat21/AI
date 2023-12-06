create table guest
(
    id      integer not null
        constraint guest_pk
            primary key autoincrement,
    name    text not null,
    content text not null
);