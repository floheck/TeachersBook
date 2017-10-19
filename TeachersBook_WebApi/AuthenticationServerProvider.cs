using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;

namespace TeachersBook_WebApi
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            using (var ctx = new TeachersBookEntities2())
            {
                var userQuery =
                    from u in ctx.UserData
                    where u.username == context.UserName
                    select u;

                var user = userQuery.FirstOrDefault();

                if (user != null)
                {
                    byte[] data = System.Text.Encoding.ASCII.GetBytes(context.Password);
                    data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
                    String passwordHash = System.Text.Encoding.ASCII.GetString(data);

                    if (passwordHash == System.Text.RegularExpressions.Regex.Unescape(user.password.Trim()))
                    {
                        var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                        switch (user.role)
                        {
                            case "admin":
                                identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                                break;

                            default:
                                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                                break;
                        }
                        identity.AddClaim(new Claim("username", user.username));
                        identity.AddClaim(new Claim(ClaimTypes.Name, string.Format("{0} {1}", user.firstname, user.lastname)));
                        identity.AddClaim(new Claim("id", user.id.ToString()))  ;
                        context.Validated(identity);
                    }
                    else
                    {
                        context.SetError("invalid grant", "Provided username and passwort is not correct!");
                        return;
                    }
                }
                else
                {
                    context.SetError("invalid user", "Provided username is not correct!");
                    return;
                }
            }
        }
    }
}