using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Post_exercise
{
    internal class Post
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }

        public Post(string title, string description)
        {
            this.Title = title;
            this.Description = description;
            this.Time = DateTime.Now;
        }
    }
}
