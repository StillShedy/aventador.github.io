using System.Security.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Telegram.Bot;

namespace AventadorWeb.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    [BindProperty]
    public FormModel LoginPageModel { get; set; } = new FormModel();

    public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        if (LoginPageModel == null || string.IsNullOrEmpty(LoginPageModel.Name) || string.IsNullOrEmpty(LoginPageModel.Telephone))
        {
            return Page();
        }

        var client = new TelegramBotClient("6102354649:AAGLsHxfJRaNXYfbvbKeNAYQQT20zthRdZg", GetHttpClient());
        try
        {
            await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: $"{LoginPageModel.Name} {LoginPageModel.Telephone}", cancellationToken: cancellationToken);
            Response.Headers.Add("status", "GOOD");
        }
        catch (Exception ex)
        {
            Response.Headers.Add("status", "BAD");
            try
            {
                await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: ex.Message, cancellationToken: cancellationToken);
                Response.Headers.Add("message", ex.Message);
            }
            catch (Exception e) {
                Response.Headers.Add("message", e.Message);
            }
        }

        return Page();
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

public class FormModel
{
    public string Name { get; set; }
    public string Telephone { get; set; }
}

