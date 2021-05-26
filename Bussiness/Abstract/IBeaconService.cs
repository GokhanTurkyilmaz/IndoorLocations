using Core.Result;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bussiness.Abstract
{
    public interface IBeaconService
    {
        IDataResult<List<Beacon>> GetAll();
        IDataResult<Beacon> GetById(int beaconid);
        IResult Add(Beacon beacon);
    }
}
