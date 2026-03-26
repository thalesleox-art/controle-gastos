using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Dtos;

public class CriarTransacaoDto
{
    public string Descricao { get; set; } = "";

    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public int CategoriaId { get; set; }

    public int PessoaId { get; set; }
}