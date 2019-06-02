using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Apteka_React.Models
{
    public partial class Producent
    {
        public Producent()
        {
            Artykuls = new List<Artykul>();
        }

        public int IdProducent { get; set; }
        public string Nazwa { get; set; }
        public string Kraj { get; set; }

        [InverseProperty("Producent")]
        public List<Artykul> Artykuls { get; set; }
    }
}
