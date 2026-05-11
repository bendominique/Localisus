using FluentAssertions;
using Moq;
using projetointegrador.API.DTO;
using projetointegrador.API.Enum;
using projetointegrador.API.Models;
using projetointegrador.API.Repository;
using projetointegrador.API.Services;

namespace TestesLocalisus
{
    public class TesteService
    {
        [Fact]
        public async Task FuncionarioSemHospitalId_RetornaErro()
        {
            //arrange
            var dadosMocados = new Mock<IUsuarioRepository>();
            var service = new UsuarioService(dadosMocados.Object);
            
            //act
            var dtoInvalido = new CriarUsuarioDTO
            {
                Nome = "Doutor Benja",
                Email = "benjamin@doutor.com",
                CPF = "400.289.222-11",
                HospitalId = null,
                TipoUsuario = TipoUsuario.Funcionario,
                Senha = "2131"
            };
            Func<Task> acao = async () => await service.CriarUsuarioAsync(dtoInvalido);


            //assert
            await acao.Should().ThrowAsync<ArgumentException>()
                .WithMessage("O Id do hospital não pode ser nulo");

            dadosMocados.Verify(repo => repo.AdicionarUsuarioAsync(It.IsAny<Usuario>()), Times.Never);
        }

        [Fact]
        public async Task FuncionarioComHospitalInvalido_RetornarErro()
        {
            var dadosMocados = new Mock<IUsuarioRepository>();
            var service = new UsuarioService(dadosMocados.Object);

            var dtoInvalido = new CriarUsuarioDTO
            {
                Nome = "Doutor Lucas",
                Email = "lucasno@grau.com",
                CPF = "400.289.231-11",
                HospitalId = 9021,
                TipoUsuario = TipoUsuario.Funcionario,
                Senha = "2113"
            };
            Func<Task> acao = async () => await service.CriarUsuarioAsync(dtoInvalido);


            //assert
            await acao.Should().ThrowAsync<ArgumentException>()
                .WithMessage("O usuário do tipo Funcionário deve ter um id válido");

            dadosMocados.Verify(repo => repo.AdicionarUsuarioAsync(It.IsAny<Usuario>()), Times.Never);

        }
    }
}
