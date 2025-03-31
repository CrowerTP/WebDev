using Fields;

var Peter = new Customer(1);
Peter.Orders.Add(new Order());
Peter.Orders.Add(new Order());

Peter.Promote();

Console.WriteLine(Peter.Orders.Count);