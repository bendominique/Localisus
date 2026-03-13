namespace apiUsuariosLocalisus.Models
{
    public class CreateUserDTO
    {
        //DTO é utilizado para receber dados de um aplicação/sistemas para que possa compartilhar 
        //esses dados de forma segura, ou seja, sem expor a estrutura interna do modelo de dados da aplicação.
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty; 
        public string Senha { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
    }
}
