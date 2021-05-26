using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Gateway:IEntity
    {
        public int Id { get; set; }
        public string GatewayName { get; set; }
        public string GatewayMacAddr { get; set; }
        public string CordinateX { get; set; }
        public string CordinateY { get; set; }
    }
}
