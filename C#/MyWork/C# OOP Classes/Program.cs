using System;
using C__OOP_Classes;

var peti = Person.Parse("Péter");
peti.Introduce("Kérdező");

var customer = new Customer (4, "Peter");
//var customer = new Customer { Id = 4, Name = "Peter"};   Object initializer használata, így a default constructor-t hívja meg és inicializálja a megadott mezőket.
Console.WriteLine(customer.Id);
Console.WriteLine(customer.Name);

var order = new Order();
customer.Orders.Add(order);