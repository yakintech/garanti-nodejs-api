//# generate a random password with 8 characters ( 4 letters, 2 numbers, 2 special characters)

using System;
using System.Text;

namespace copilotSample
{
    class Program
    {
        static void Main(string[] args)
        {
            string password = GeneratePassword();
        }
    }
}

public static string GeneratePassword()
{
    string password = "";
    Random random = new Random();
    for (int i = 0; i < 4; i++)
    {
        char letter = (char)random.Next(65, 90);
        password += letter;
    }
    for (int i = 0; i < 2; i++)
    {
        char number = (char)random.Next(48, 57);
        password += number;
    }
    for (int i = 0; i < 2; i++)
    {
        char special = (char)random.Next(33, 47);
        password += special;
    }
    return password;
}