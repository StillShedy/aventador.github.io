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

        var client = new TelegramBotClient("6102354649:AAGLsHxfJRaNXYfbvbKeNAYQQT20zthRdZg");

        try
        {
            await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: $"{LoginPageModel.Name} {LoginPageModel.Telephone}", cancellationToken: cancellationToken);
        }
        catch (Exception ex)
        {
            try
            {
                await client.SendTextMessageAsync(new Telegram.Bot.Types.ChatId(-1001848878432), text: ex.Message, cancellationToken: cancellationToken);
            }
            catch { }
        }

        return Page();
    }
}

public class FormModel
{
    public string Name { get; set; }
    public string Telephone { get; set; }
}

