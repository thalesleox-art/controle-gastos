using ControleGastos.Api.Data;
using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly AppDbContext _context;

    public RelatoriosController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista totais de receitas, despesas e saldo por pessoa,
    /// além do total geral ao final.
    /// </summary>
    [HttpGet("totais-por-pessoa")]
    public async Task<IActionResult> TotaisPorPessoa()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .OrderBy(p => p.Nome)
            .ToListAsync();

        var itens = pessoas.Select(p => new TotalPorPessoaDto
        {
            PessoaId = p.Id,
            NomePessoa = p.Nome,
            TotalReceitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),
            TotalDespesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor),
            Saldo =
                p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor)
                - p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
        }).ToList();

        var resultado = new ResumoTotaisDto<TotalPorPessoaDto>
        {
            Itens = itens,
            TotalReceitas = itens.Sum(i => i.TotalReceitas),
            TotalDespesas = itens.Sum(i => i.TotalDespesas),
            Saldo = itens.Sum(i => i.Saldo)
        };

        return Ok(resultado);
    }

    /// <summary>
    /// Lista totais de receitas, despesas e saldo por categoria,
    /// além do total geral ao final.
    /// </summary>
    [HttpGet("totais-por-categoria")]
    public async Task<IActionResult> TotaisPorCategoria()
    {
        var categorias = await _context.Categorias
            .Include(c => c.Transacoes)
            .OrderBy(c => c.Descricao)
            .ToListAsync();

        var itens = categorias.Select(c => new TotalPorCategoriaDto
        {
            CategoriaId = c.Id,
            DescricaoCategoria = c.Descricao,
            TotalReceitas = c.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),
            TotalDespesas = c.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor),
            Saldo =
                c.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor)
                - c.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
        }).ToList();

        var resultado = new ResumoTotaisDto<TotalPorCategoriaDto>
        {
            Itens = itens,
            TotalReceitas = itens.Sum(i => i.TotalReceitas),
            TotalDespesas = itens.Sum(i => i.TotalDespesas),
            Saldo = itens.Sum(i => i.Saldo)
        };

        return Ok(resultado);
    }
}