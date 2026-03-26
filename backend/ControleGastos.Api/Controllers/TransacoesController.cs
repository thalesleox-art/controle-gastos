using ControleGastos.Api.Data;
using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as transações
    /// </summary>
    [HttpGet]
public async Task<IActionResult> Listar()
{
    var transacoes = await _context.Transacoes
        .Include(t => t.Pessoa)
        .Include(t => t.Categoria)
        .OrderByDescending(t => t.Id)
        .Select(t => new
        {
            t.Id,
            t.Descricao,
            t.Valor,
            t.Tipo,
            t.PessoaId,
            PessoaNome = t.Pessoa != null ? t.Pessoa.Nome : string.Empty,
            t.CategoriaId,
            CategoriaDescricao = t.Categoria != null ? t.Categoria.Descricao : string.Empty
        })
        .ToListAsync();

    return Ok(transacoes);
}

    /// <summary>
    /// Cria uma transação validando regras de negócio
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Criar(CriarTransacaoDto dto)
    {
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
        if (pessoa == null)
            return BadRequest("Pessoa não encontrada");

        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
        if (categoria == null)
            return BadRequest("Categoria não encontrada");

        // REGRA 1
        // menor de idade só pode despesa
        if (pessoa.Idade < 18 && dto.Tipo != TipoTransacao.Despesa)
            return BadRequest("Menor de idade só pode ter despesas");

        // REGRA 2
        // categoria deve ser compatível com tipo

        bool categoriaValida =
            categoria.Finalidade == FinalidadeCategoria.Ambas
            || (dto.Tipo == TipoTransacao.Despesa && categoria.Finalidade == FinalidadeCategoria.Despesa)
            || (dto.Tipo == TipoTransacao.Receita && categoria.Finalidade == FinalidadeCategoria.Receita);

        if (!categoriaValida)
            return BadRequest("Categoria incompatível com tipo da transação");

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId,
            CategoriaId = dto.CategoriaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            transacao.Id,
            transacao.Descricao,
            transacao.Valor,
            transacao.Tipo,
            transacao.PessoaId,
            transacao.CategoriaId
        });
    }
}