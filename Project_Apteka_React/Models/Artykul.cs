using System;
using System.Collections.Generic;

namespace Project_Apteka_React.Models
{
    public partial class Artykul
    {
        public int IdArtykul { get; set; }
        public string Nazwa { get; set; }
        public string Kod { get; set; }
        public int Illosc { get; set; }
        public int IdKategoria { get; set; }
        public int IdProducent { get; set; }

        public Kategoria IdKategoriaNavigation { get; set; }
        public Producent IdProducentNavigation { get; set; }
    }
}
