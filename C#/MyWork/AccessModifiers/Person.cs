using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccessModifiers
{
    internal class Person
    {
        public DateTime Birthdate { get; private set; }

        public Person(DateTime birthdate)
        {
            this.Birthdate = birthdate;
        }     

        public int Age
        {
            get
            {
                var timeStamp = DateTime.Today - Birthdate;
                var years = timeStamp.Days / 365;
                return years;
            }
        }
    }
}
