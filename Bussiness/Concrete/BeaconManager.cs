using Bussiness.Abstract;
using Bussiness.Constans;
using Core.Result;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bussiness.Concrete
{
    public class BeaconManager : IBeaconService
    {
        IBeaconDal _beaconDal;
        public BeaconManager(IBeaconDal beaconDal)
        {
            _beaconDal = beaconDal;
        }
        public IResult Add(Beacon beacon)
        {
            _beaconDal.Add(beacon);
            return new SuccessResult(Message.BeaconAdded);
        }

        public IDataResult<List<Beacon>> GetAll()
        {
            return new SuccessDataResult<List<Beacon>>(_beaconDal.GetAll());
        }

        public IDataResult<Beacon> GetById(int beaconid)
        {
            return new SuccessDataResult<Beacon>(_beaconDal.Get(c=>c.BeaconId==beaconid));
        }
    }
}
