using StopWatch_exercise;

var stopWatch = new Stopwatch();
Console.WriteLine("Press 's' to start stopWatch, 't' to stop stopWatch, or 'q' to quit.");

while (true)
{
    // Read a single key press from the user
    var keyInfo = Console.ReadKey(intercept: true); // intercept true to avoid printing the character

    // Switch based on the key pressed
    switch (keyInfo.Key)
    {
        case ConsoleKey.S:
            stopWatch.Start();
            break;
        case ConsoleKey.T:
            stopWatch.Stop();
            break;
        case ConsoleKey.Q:
            Console.WriteLine("Exiting program.");
            return; // Exit the loop and program
        default:
            Console.WriteLine("Invalid key. Press 's', 't', or 'q'.");
            break;
    }
}