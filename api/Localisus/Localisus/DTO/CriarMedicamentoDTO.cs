namespace Localisus.DTO
{
    public class CriarMedicamentoDTO
    {
        public string NomeMedicamento { get; set; } = string.Empty;

        public decimal Dosagem { get; set; }

        public int Quantidade { get; set; }
    }
}