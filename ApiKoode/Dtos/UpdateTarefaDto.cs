using ApiKoode.Models;
using System.ComponentModel.DataAnnotations;

public class UpdateTarefaDto
{
      public string? Title { get; set; }
      public string? Description { get; set; }
      public StatusTarefa? Status { get; set; }
}