using Indexers;

var cookie = new HttpCookie();
cookie["name"] = "Peter";
Console.WriteLine(cookie["name"]);
