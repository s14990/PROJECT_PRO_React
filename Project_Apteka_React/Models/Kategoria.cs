using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Apteka_React.Models
{
    public partial class Kategoria
    {
        public Kategoria()
        {
            Artykuls = new List<Artykul>();
        }

        public int IdKategoria { get; set; }
        public string Nazwa { get; set; }

        [InverseProperty("Kategoria")]
        public List<Artykul> Artykuls { get; set; }
    }
}
