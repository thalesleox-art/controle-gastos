namespace ControleGastos.Api.Dtos;

public class TotalPorPessoaDto
{
    public int PessoaId { get; set; }
    public string NomePessoa { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}

public class TotalPorCategoriaDto
{
    public int CategoriaId { get; set; }
    public string DescricaoCategoria { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}

public class ResumoTotaisDto<T>
{
    public List<T> Itens { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}