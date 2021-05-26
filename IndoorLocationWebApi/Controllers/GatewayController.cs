using Bussiness.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Http;

namespace IndoorLocationWebApi.Controllers
{
    //[Microsoft.AspNetCore.Components.Route("api/[controller]")]
    //[ApiController]
    [System.Web.Http.Route("[controller]")]
    public class GatewayController : Controller
    {
        IBeaconService _beaconService;
        public GatewayController(IBeaconService beaconService)
        {
            _beaconService = beaconService;
        }
        [Microsoft.AspNetCore.Mvc.HttpGet("Index")]
        public IActionResult Index()
        {
            string gtr = "fff";
            ViewBag.gtrr = gtr;

            return View();
        }
        [Microsoft.AspNetCore.Mvc.HttpGet("gtr")]
      
        public IActionResult Gtr(Beacon beacon)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };
            string jsonString = JsonSerializer.Serialize(beacon.RSSI, options);
            return Ok(jsonString);
        }
        [Microsoft.AspNetCore.Mvc.HttpPost("datam")]
       
       // [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> GetGatewayDatas(Beacon beacon)
        {
            var options =new  JsonSerializerOptions
            {
                WriteIndented = true,
            };
            string jsonString = JsonSerializer.Serialize(beacon, options);
            return (IHttpActionResult)await Task.FromResult(Ok(jsonString));
     
        }
        IEnumerable<Beacon> _beacon;
        [Microsoft.AspNetCore.Mvc.HttpPost("data")]
        //Get action methods of the previous section
        public IActionResult PostData([Microsoft.AspNetCore.Mvc.FromBody]IEnumerable<Beacon> beacon)
        {
                  
            if (beacon!=null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(beacon.Select(b => b.RSSI), options);
                _beacon = beacon;
                GatewayDatas(jsonString);
                ViewBag.gtrrr = "Basarili";
                return Json(jsonString);
            }
            
            return View();
        }

        // [Microsoft.AspNetCore.Mvc.HttpGet("data")]

        public IActionResult GatewayDatas(string json)
        {
            if (json!=null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(json);
                return Json(jsonString);
            }

            return Json("err");
        }
    }

}
