namespace ApiKoode.Endpoints;

using ApiKoode.Data;
using Microsoft.EntityFrameworkCore;
using ApiKoode.Models;
using ApiKoode.Services;

public static class TarefasRoutes
{
      public static void MapTarefasRoutes(this WebApplication app)
      {
            app.MapGet("/tasks", GetAllTarefas);
            app.MapPost("/tasks", CreateTarefa);
            app.MapPut("/tasks/{id}", UpdateTarefa);
            app.MapDelete("/tasks/{id}", DeleteTarefa);
      }

      private static async Task<IResult> GetAllTarefas(TarefaService service)
      {
            var tarefas = await service.GetAllTarefasAsync();
            return Results.Ok(tarefas);
      }

      private static async Task<IResult> CreateTarefa(TarefaService service, CreateTarefaDto dto)
      {
            var tarefa = await service.CreateTarefa(dto);
            return Results.Created($"/tasks/{tarefa.Id}", tarefa);
      }

      private static async Task<IResult> UpdateTarefa(TarefaService service, Guid id, CreateTarefaDto dto)
      {
            var tarefa = await service.UpdateTarefaAsync(id, dto);
            if (tarefa == null)
            {
                  return Results.NotFound();
            }
            else
            {
                  return Results.Ok(tarefa);
            }
      }

      private static async Task<IResult> DeleteTarefa(TarefaService service, Guid id)
      {
            var deleted = await service.DeleteTarefaAsync(id);
            if (!deleted)
            {
                  return Results.NotFound();
            }
            else
            {
                  return Results.NoContent();
            }
      }
}