
using System;
using System.Collections.Concurrent;
using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;
using CTFcolab.Entity;

namespace CTFcolab.Helpers
{
    public static class JwtAuthManager
    {
        public static string GenerateJSONWebToken(User user)
        {
            var _secret = Environment.GetEnvironmentVariable("JWTOKEN") is not null ? Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWTOKEN")) : Encoding.UTF8.GetBytes("SuperSecretKey12345678");
            var securityKey = new SymmetricSecurityKey(_secret);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken("CTFcolab",
              "CTFcolab",
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            token.Payload.Add(
                "id", user.Id
            );
            token.Payload.Add(
                "name", user.Name
            );
            token.Payload.Add(
                "email", user.Email
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static User ParseJSONWebToken(string jwt) {
            try {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(jwt);
                User user = new User();

                user.Id = Convert.ToInt32(token.Payload["id"].ToString());
                user.Name = token.Payload["name"].ToString();
                user.Email = token.Payload["email"].ToString();

                return user;
            } catch {}
            return null;
        }
    }
}