var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Define endpoints
app.MapGet("/", () =>
{
    // Replace Console.WriteLine with appropriate logging if needed
    return "Hello World!";
})
.WithOpenApi();

app.MapGet("/Test", () =>
{
    // Replace Console.WriteLine with appropriate logging if needed
    return "Test Endpoint";
})
.WithOpenApi();

app.Run();
