using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using CTFcolab.Helpers;
using CTFcolab.DAL;

namespace CTFcolab.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private IUserRepository _userRepository;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
            _userRepository = new UserRepository(new CTFcolabDbContext());
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var user = JwtAuthManager.ParseJSONWebToken(token);
            if (user != null)
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = _userRepository.GetUserByID(user.Id);
            }

            await _next(context);
        }
    }
}