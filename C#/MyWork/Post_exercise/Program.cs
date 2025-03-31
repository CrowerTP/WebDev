using Post_exercise;

try
{
    while (true)
    {
        Console.WriteLine("Write the new post details!");
        string title = GetValidInput("Title: ");
        string description = GetValidInput("Description: ");
        Console.WriteLine("------------------------------------------");

        var post = new Post(title, description);
        Console.WriteLine("Post title: {0}", post.Title);
        Console.WriteLine("Post description: {0}", post.Description);
        Console.WriteLine("Posted time: {0}", post.Time);
        Console.WriteLine("------------------------------------------");

    }
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}


static string GetValidInput(string prompt)
{
    string userInput = string.Empty;

    // Loop until valid input is provided
    while (string.IsNullOrWhiteSpace(userInput))
    {
        Console.Write(prompt);
        userInput = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(userInput))
        {
            Console.WriteLine("Input cannot be empty. Please try again.");
        }
    }

    return userInput; // Return the valid input
}
