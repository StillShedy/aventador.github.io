using System;
using System.Security.Authentication;
using System.Threading;
using Aventador.Model;
using Microsoft.AspNetCore.Mvc;
using Telegram.Bot;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;

namespace Aventador.Controllers
{
	public class FormController : SurfaceController
    {
        public FormController(
            IUmbracoContextAccessor umbracoContextAccessor,
            IUmbracoDatabaseFactory databaseFactory,
            ServiceContext services,
            AppCaches appCaches,
            IProfilingLogger profilingLogger,
            IPublishedUrlProvider publishedUrlProvider)
            : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        { }


        [HttpPost]
        public async Task<IActionResult> Submit(FormModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.ClientName) || string.IsNullOrEmpty(model.Telephone))
            {
                return CurrentUmbracoPage();
            }

            var client = new TelegramBotClient("6102354649:AAGLsHxfJRaNXYfbvbKeNAYQQT20zthRdZg", GetHttpClient());
            try
            {
                await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: $"{model.ClientName} {model.Telephone}", cancellationToken: CancellationToken.None);
            }
            catch (Exception ex)
            {
                Response.Headers.Add("status", "BAD");
                try
                {
                    await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: ex.Message, cancellationToken: CancellationToken.None);
                    Response.Headers.Add("message", ex.Message);
                }
                catch (Exception e)
                {
                    Response.Headers.Add("message", e.Message);
                }
            }

            return RedirectToCurrentUmbracoPage();
        }

        private HttpClient GetHttpClient()
        {
            var httpHandler = new HttpClientHandler
            {
                SslProtocols = SslProtocols.Tls12
            };

            return new HttpClient(httpHandler);
        }
    }
}

