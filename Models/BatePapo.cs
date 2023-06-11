using Microsoft.AspNetCore.SignalR;
using System;

namespace ChatV2.Models
{
    public class BatePapo : Hub
    {
        public void sendMessage(string usuario, string mensagem)
        {
            Clients.All.SendAsync("sendMessage", usuario, mensagem);
            Console.WriteLine(usuario+" Disse "+mensagem);
            //Clients.Groups(grupo).SendAsync(usuario, mensagem);
        }
    }
}
