var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://example.com",
                              "https://localhost:44339/Ws/Catalogos/wsUsuarios.asmx",
                                              "http://www.contoso.com");
                      });
});



builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
//app.MapGet("/", () => "Hello World!");

app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

app.UseDefaultFiles();
app.UseStaticFiles();
//app.UseMvc();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();
app.Run();
