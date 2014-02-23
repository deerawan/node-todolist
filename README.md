node-todolist
=============

Simple node todolist 

How to Use it
=============
Just use curl to test add, update and delete items

** Add item **
curl -d "buy snacks" http://localhost:3000

** List items **
curl http://locahost:3000 

** Update item **
curl -X PUT http://localhost:3000/1 --data "buy groceries" 

** Delete item **
curl -X DELETE http://localhost:3000/1
