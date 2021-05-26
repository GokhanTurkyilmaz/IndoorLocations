using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace TestWebApi.Controllers
{
    [System.Web.Http.Route("[controller]")]
    public class TestController : ApiController
    {
        public TestController()
        {
        }
        [Microsoft.AspNetCore.Mvc.HttpGet("data")]
        //Get action methods of the previous section
        public IHttpActionResult PostNewStudent(StudentViewModel student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            return Ok();
        }

        [Microsoft.AspNetCore.Mvc.HttpPost("data")]
        //Get action methods of the previous section
        public IHttpActionResult PostNewStudentt(StudentViewModel student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            return Ok();
        }

        public class StudentViewModel
        {
            public int StudentID { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
    }
}
