using ApiKoode.Data;
using ApiKoode.Endpoints;
using ApiKoode.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddScoped<TarefaService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


TarefasRoutes.MapTarefasRoutes(app);
app.Run();

