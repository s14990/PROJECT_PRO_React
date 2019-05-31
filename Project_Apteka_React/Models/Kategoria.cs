using System;
using System.Collections.Generic;

namespace Project_Apteka_React.Models
{
    public partial class Kategoria
    {
        public Kategoria()
        {
            Artykul = new HashSet<Artykul>();
        }

        public int IdKategoria { get; set; }
        public string Nazwa { get; set; }

        public ICollection<Artykul> Artykul { get; set; }
    }
}
