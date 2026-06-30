using ApiKoode.Models;
using System.ComponentModel.DataAnnotations;

public class CreateTarefaDto
{
      [Required]
      public required string Title { get; set; }
      public string Description { get; set; } = string.Empty;
      public StatusTarefa Status { get; set; } = StatusTarefa.pending;
}