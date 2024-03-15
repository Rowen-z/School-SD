global using APlus.Business.Models;
global using APlus.Data.Tables;
global using APlus.Business.DTOs;
global using APlus.Data;
global using APlus.Exceptions;
using APlus.Business.UserService;
using APlus.Repository.UserRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using APlus.Repository.RubricRepository;
using APlus.Business.RubricService;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

/**
 * @author Rowen Zaal
 * Configuration used for SwaggerUI to use requests with an authentication option.
*/
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization Header using Bearear. Input: (\"bearer {token}\"",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

/**
 * @author Rowen Zaal
 * Configuration used for reading the Json Web Token.
*/
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        string tokenValue = builder.Configuration.GetSection("Appsettings:Token").Value!;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(tokenValue)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

/**
 * @author Rowen Zaal
 * Applies the connection string to the builder to use the correct SQL Server.
*/
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

/**
 * @author Rowen Zaal
 * Adds Cors Policy to http://localhost:4200.
*/
builder.Services.AddCors(options => options.AddPolicy(name: "APlus",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    }
));

/**
 * @author Rowen Zaal
 * Configure the repositories.
*/
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRubricRepository, RubricRepository>();

/**
 * @author Rowen Zaal
 * Configure the services.
*/
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRubricService, RubricService>();

/**
 * @author Rowen Zaal
 * App Middleware.
*/
WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("APlus");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
