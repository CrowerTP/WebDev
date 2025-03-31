using Methods;

static void UseParse()
{
    try
    {
        var num = int.Parse("asd");
    }
    catch (Exception)
    {
        Console.WriteLine("Conversion was unsuccesful");
    }

    int number;
    var result = int.TryParse("2115", out number);
    if (result)
        Console.WriteLine("Converted the number: {0}", number);
    else
        Console.WriteLine("Conversion was unsuccesful");
}




static void UseCalculator()
{
    var calculator = new Calculator();
    Console.WriteLine(calculator.Add(1, 2));
    Console.WriteLine(calculator.Add(1, 2, 3, 4));
    Console.WriteLine(calculator.Add(1, 6, 3));
    Console.WriteLine(calculator.Add(new int[] { 1, 2, 3, 4, 5, 6, 7 }));
}



static void UsePoints()
{
    try
    {
        var point = new Point(40, 50);
        point.Move(null);
        Console.WriteLine("Point is at ({0},{1}).", point.X, point.Y);

        point.Move(80, 10);
        Console.WriteLine("Point is at ({0},{1}).", point.X, point.Y);
    }
    catch (Exception)
    {
        Console.WriteLine("An unexpected error occured");
    }
}