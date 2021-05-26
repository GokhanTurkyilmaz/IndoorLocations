using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Beacon:IEntity
    {
        public int ID { get; set; }
        public int BeaconId { get; set; }
        public string TimeStamp { get; set; }
        public string Type { get; set; }
        public string Map { get; set; }
        public string BleName { get; set; }
        public string IbeaconUuid { get; set; }
        public string IbeaconMajor { get; set; }
        public string IbeaconMinor { get; set; }
        public int IbeaconTxPower { get; set; }
        public int RSSI { get; set; }
        public int Battery { get; set; }
    }
}
