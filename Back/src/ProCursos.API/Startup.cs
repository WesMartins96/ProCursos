using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ProCursos.API.Interfaces;
using ProCursos.API.Repositorios;

namespace ProCursos.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<Contexto>(
                opcoes => opcoes.UseSqlite(Configuration.GetConnectionString("ConexaoBD")));

            //Registros de Repositorios e Interfaces    
            services.AddScoped<ICursoRepositorio, CursoRepositorio>();
            services.AddScoped<ICategoriaRepositorio, CategoriaRepositorio>();

            //Fazer a ligação front -> back da aplicação
            services.AddCors();


                                  //Usando a biblioteca de validações    //Ignorar valores nulos e Ignorar referencias circulares
            services.AddControllers().AddJsonOptions(opcoes => 
            { opcoes.JsonSerializerOptions.IgnoreNullValues = true;})
            .AddNewtonsoftJson(opcoes => {
                opcoes.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProCursos.API", Version = "v1" });
            });

             services.AddSpaStaticFiles(diretorio => {
                diretorio.RootPath = "Front/ProCursos-App";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProCursos.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

              //Configurar o CORS
            app.UseCors(opcoes => {
                opcoes.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Configurar a SPA
            app.UseSpa( spa => {
                spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "Front/ProCursos-App");


                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer($"http://localhost:4200/");
                }
            });
        }
    }
}
