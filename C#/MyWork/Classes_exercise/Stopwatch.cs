using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StopWatch_exercise
{
    internal class Stopwatch
    {
        private DateTime _tempTime;
        private bool _started;
        private TimeSpan _stopWatchTime;

        public void Start()
        {
            Console.Clear();
            try
            {
                if (_started)
                {
                    throw new InvalidOperationException();
                }
                else
                {
                    _tempTime = DateTime.Now;
                    _started = true;
                    Console.WriteLine("Stopper has been started");
                }
            }
            catch (Exception)
            {
                Console.WriteLine("You cannot start the Stopwatch again because it has been started already.");
            }
            

        }

        public void Stop()
        {
            Console.Clear();
            try
            {
                if (!_started)
                {
                    throw new InvalidOperationException();
                }
                else
                {
                    _stopWatchTime = DateTime.Now - _tempTime;
                    Console.WriteLine("The stopWatch time is: {0}. You can start again the stopWatch now.", _stopWatchTime);
                    _started = false;
                }
            }
            catch (Exception)
            {
                Console.WriteLine("You cannot stop the Stopwatch because it hasn't been started yet.");
            }

        }
    }      
}
