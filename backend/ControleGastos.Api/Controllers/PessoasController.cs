using ControleGastos.Api.Data;
using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as pessoas cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var pessoas = await _context.Pessoas
            .OrderBy(p => p.Nome)
            .Select(p => new
            {
                p.Id,
                p.Nome,
                p.Idade
            })
            .ToListAsync();

        return Ok(pessoas);
    }

    /// <summary>
    /// Busca uma pessoa pelo identificador.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObterPorId(int id)
    {
        var pessoa = await _context.Pessoas
            .Where(p => p.Id == id)
            .Select(p => new
            {
                p.Id,
                p.Nome,
                p.Idade
            })
            .FirstOrDefaultAsync();

        if (pessoa == null)
            return NotFound("Pessoa não encontrada.");

        return Ok(pessoa);
    }

    /// <summary>
    /// Cria uma nova pessoa.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Criar(CriarPessoaDto dto)
    {
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            pessoa.Id,
            pessoa.Nome,
            pessoa.Idade
        });
    }

    /// <summary>
    /// Atualiza os dados de uma pessoa existente.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(int id, AtualizarPessoaDto dto)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound("Pessoa não encontrada.");

        pessoa.Nome = dto.Nome;
        pessoa.Idade = dto.Idade;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            pessoa.Id,
            pessoa.Nome,
            pessoa.Idade
        });
    }

    /// <summary>
    /// Remove uma pessoa. As transações dela são apagadas em cascata.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound("Pessoa não encontrada.");

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}