using Bussiness.Abstract;
using Core.Aspects.AutoFac.Caching;
using Core.CrossCuttingConcerns.Caching;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Http;

namespace IndoorLocationWebApi.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/[controller]")]
    [System.Web.Http.Route("[controller]")]
    public class GatewayController : Controller
    {
        IBeaconService _beaconService;


        private readonly IMemoryCache _memoryCache;
        public Beacon _beacon = new Beacon();
        public GatewayController(IBeaconService beaconService, IMemoryCache memoryCache)
        {
            this._memoryCache = memoryCache;
            _beaconService = beaconService;
        }
        [Microsoft.AspNetCore.Mvc.HttpGet("Index")]
        public async Task<IActionResult> Index()
        {
            return await Task.FromResult(View());
        }


        [Microsoft.AspNetCore.Mvc.HttpPost("/gateway/GetGatewayDatas")]
        public async Task<IHttpActionResult> GetGatewayDatas(Beacon beacon)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };
            string jsonString = JsonSerializer.Serialize(beacon, options);
            return (IHttpActionResult)await Task.FromResult(Ok(jsonString));

        }

        [Microsoft.AspNetCore.Mvc.HttpPost("/gateway/postdata")]
        //Get action methods of the previous section
        public async Task<IHttpActionResult> PostData([Microsoft.AspNetCore.Mvc.FromBody] IEnumerable<Beacon> beacon)
        {
            const string key = "gateway1";
            _memoryCache.Remove(key);
            if (beacon != null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(beacon.LastOrDefault(), options);
                _memoryCache.Set(key, jsonString, new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(20),
                    Priority = CacheItemPriority.Normal
                });
                return (IHttpActionResult)await Task.FromResult(Json(jsonString));

            }
            return (IHttpActionResult)await Task.FromResult(View());

        }

        [Microsoft.AspNetCore.Mvc.HttpPost("/gateway/postdata11")]
        //Get action methods of the previous section
        public async Task<IHttpActionResult> PostData11([Microsoft.AspNetCore.Mvc.FromBody] IEnumerable<Beacon> beacon)
        {
            const string key = "gateway1";
            _memoryCache.Remove(key);
            if (beacon != null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(beacon.LastOrDefault(), options);
                _memoryCache.Set(key, jsonString, new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(20),
                    Priority = CacheItemPriority.Normal
                });
                return (IHttpActionResult)await Task.FromResult(Json(jsonString));

            }
            return (IHttpActionResult)await Task.FromResult(View());

        }

        [Microsoft.AspNetCore.Mvc.HttpPost("/gateway/Gateway2Data")]
        //Get action methods of the previous section
        public async Task<IHttpActionResult> Gateway2Data([Microsoft.AspNetCore.Mvc.FromBody] IEnumerable<Beacon> beacon)
        {
            const string key = "gateway2";
            _memoryCache.Remove(key);
            if (beacon != null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(beacon.LastOrDefault(), options);
                _memoryCache.Set(key, jsonString, new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(20),
                    Priority = CacheItemPriority.Normal
                });
                return (IHttpActionResult)await Task.FromResult(Json(jsonString));

            }
            return (IHttpActionResult)await Task.FromResult(View());

        }

        [Microsoft.AspNetCore.Mvc.HttpPost("/gateway/Gateway3Data")]
        //Get action methods of the previous section
        public async Task<IHttpActionResult> Gateway3Data([Microsoft.AspNetCore.Mvc.FromBody] IEnumerable<Beacon> beacon)
        {
            const string key = "gateway3";
            _memoryCache.Remove(key);
            if (beacon != null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(beacon.LastOrDefault(), options);
                _memoryCache.Set(key, jsonString, new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(20),
                    Priority = CacheItemPriority.Normal
                });
                return (IHttpActionResult)await Task.FromResult(Json(jsonString));

            }
            return (IHttpActionResult)await Task.FromResult(View());

        }
        public async Task<IActionResult> GetBeaconData(string beaconName)
        {
            
            _memoryCache.TryGetValue(beaconName, out object value);
            if (value != null)
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                };
                string jsonString = JsonSerializer.Serialize(value);
                return await Task.FromResult(Json(value));
            }

            return Json("err");
        }

        public async Task<IActionResult> Gateway1()
        {
            return await GetBeaconData("gateway1");
        }

        public async Task<IActionResult> Gateway2()
        {
            return await GetBeaconData("gateway2");
        }

        public async Task<IActionResult> Gateway3()
        {
            return await GetBeaconData("gateway3");
        }

        public async Task<IActionResult> Gateway4()
        {
            return await GetBeaconData("gateway1");
        }
    }

}
