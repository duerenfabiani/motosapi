create table marcas (
codigo serial not null primary key, 
nome varchar(50) not null);

create table motos (
codigo serial not null primary key,
nome varchar(50) not null, 
ano date not null, 
marca integer not null, 
foreign key (marca) references marcas (codigo));

-- inserir alguns registros
insert into marcas (nome) values ('Kawasaki') , 
('BMW'), ('Honda');

insert into motos (nome, ano, marca) values
('moto 1','16/05/2020',1),
('moto 2', '14/03/2019',3);