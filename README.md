# addresstable
Техничкское задание от SimbirSoft

Установка. 

1) Склонируйте этот репозиторий в папку с проектами Symfony. Например: 
git clone git://github.com/faab-dev/addresstable.git 

2) Создайте базу данных DEV_addresstable . Например:
mysql -u root -p
mysql> CREATE DATABASE DEV_addresstable;

3) Импортируйте в базу данных DEV_addresstable файл dev_addresstable.sql , который находится в папке addresstable/db/ . Например:
mysql -u root -p DEV_addresstable < addresstable/db/dev_addresstable.sql

4) Откройте и отредактируйте, если нужно, настройки базы данных в файле addresstable/app/config/parameters.yml 

5) Зайдите через коммандную строку в корневую папку addresstable и запустите слудующую комманду:
php bin/console server:run





