using ApiKoode.Data;
using ApiKoode.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiKoode.Services;

public class TarefaService
{
      private readonly AppDbContext _db;

      public TarefaService(AppDbContext db)
      {
            _db = db;
      }

      public async Task<List<Tarefa>> GetAllTarefasAsync()
      {
            return await _db.Tarefas.ToListAsync();
      }

      public async Task<Tarefa?> GetTarefaByIdAsync(Guid id)
      {
            return await _db.Tarefas.FindAsync(id);
      }

      public async Task<Tarefa> CreateTarefa(CreateTarefaDto dto)
      {
            var tarefa = new Tarefa
            {
                  Title = dto.Title,
                  Description = dto.Description,
                  Status = dto.Status,
                  CreatedAt = DateTime.UtcNow,
                  UpdatedAt = null
            };

            _db.Tarefas.Add(tarefa);
            await _db.SaveChangesAsync();

            return tarefa;
      }

      public async Task<Tarefa?> UpdateTarefaAsync(Guid id, CreateTarefaDto dto)
      {
            var tarefa = await _db.Tarefas.FindAsync(id);
            if (tarefa == null)
            {
                  return null;
            }

            tarefa.Title = dto.Title;
            tarefa.Description = dto.Description;
            tarefa.Status = dto.Status;
            tarefa.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return tarefa;
      }

      public async Task<bool> DeleteTarefaAsync(Guid id)
      {
            var tarefa = await _db.Tarefas.FindAsync(id);
            if (tarefa == null)
            {
                  return false;
            }

            _db.Tarefas.Remove(tarefa);
            await _db.SaveChangesAsync();

            return true;
      }
}