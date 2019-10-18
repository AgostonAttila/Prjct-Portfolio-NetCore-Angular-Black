using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core
{
    public class Management
    {
        [Key]
        public string Name { get; set; }
        public string FundISINNumberString { get; set; }
        [NotMapped]
        public HashSet<string> FundISINNumberHashSet
        {
            get;// { return this.FundISINNumberString.Split(';').Distinct().ToHashSet(); }
            set;//{ }
        }
    }
}
