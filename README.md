# addresstable
����������� ������� �� SimbirSoft

���������. 

1) ����������� ���� ����������� � ����� � ��������� Symfony. ��������: 
git clone git://github.com/faab-dev/addresstable.git 

2) �������� ���� ������ DEV_addresstable . ��������:
mysql -u root -p
mysql> CREATE DATABASE DEV_addresstable;

3) ������������ � ���� ������ DEV_addresstable ���� dev_addresstable.sql , ������� ��������� � ����� addresstable/db/ . ��������:
mysql -u root -p DEV_addresstable < addresstable/db/dev_addresstable.sql

4) �������� � ��������������, ���� �����, ��������� ���� ������ � ����� addresstable/app/config/parameters.yml 

5) ������� ����� ���������� ������ � �������� ����� addresstable � ��������� ��������� ��������:
php bin/console server:run





