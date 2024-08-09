using Microsoft.AspNetCore.Mvc;


namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // api/Log
    public class LogController : ControllerBase
    {
        
        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok("Logged a simple message.");
        }
    }
}