namespace ApiKoode.Models
{

      public enum StatusTarefa
      {
            pending,
            in_progress,
            done
      }

      public class Tarefa
      {
            public Guid Id { get; set; } = Guid.NewGuid();
            public required string Title { get; set; }
            public StatusTarefa Status { get; set; } = StatusTarefa.pending;
            public string Description { get; set; } = string.Empty;
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
      }
}