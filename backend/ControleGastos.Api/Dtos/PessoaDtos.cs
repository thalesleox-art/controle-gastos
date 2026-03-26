using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Dtos;

public class CriarPessoaDto
{
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 150)]
    public int Idade { get; set; }
}

public class AtualizarPessoaDto
{
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 150)]
    public int Idade { get; set; }
}