using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

AddServices();
AddDbContext();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();


void AddServices()
{
    builder.Services.AddScoped<IPerformanceRepository, PerformanceRepository>();
    builder.Services.AddScoped<IContactRepository, ContactRepository>();
}
void AddDbContext()
{
    builder.Services.AddDbContext<BalloonAirContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("BalloonAirConnection")));
}