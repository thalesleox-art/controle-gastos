using ControleGastos.Api.Data;
using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as categorias cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var categorias = await _context.Categorias
        .OrderBy(c => c.Descricao)
        .Select(c => new
        {
            c.Id,
            c.Descricao,
            c.Finalidade
        })
        .ToListAsync();

    return Ok(categorias);
    }

    /// <summary>
    /// Cria uma nova categoria.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Criar(CriarCategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            categoria.Id,
            categoria.Descricao,
            categoria.Finalidade
        });
    }
}