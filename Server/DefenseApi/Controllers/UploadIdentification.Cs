using System.Data.Common;
using Microsoft.AspNetCore.Mvc;


namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // api/TestLog
    public class UploadIdentification : ControllerBase
    {
        
        // Need to make a post request to db which uploads link to 
        // db where ID image will be stored.
      
      
        /*
        //https://localhost:5001/api/TestLog
        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok("TEST4");
        }

        // GET: api/TestLog/{name}
        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            
            return Ok(name);
        }
        */
    }
}