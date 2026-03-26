using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Dtos;

public class CriarCategoriaDto
{
    [Required]
    [MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    public FinalidadeCategoria Finalidade { get; set; }
}