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
    public class GatewayManager : IGatewayService
    {
        IGatewayDal _gatewayDal;
        public GatewayManager(IGatewayDal gatewayDal)
        {
            _gatewayDal = gatewayDal;
        }
        public IResult Add(Gateway gateway)
        {
            _gatewayDal.Add(gateway);
            return new SuccessResult(Message.GatewayAdded);
        }

        public IDataResult<List<Gateway>> GetAll()
        {
            return new SuccessDataResult<List<Gateway>>(_gatewayDal.GetAll());
        }

        public IDataResult<Gateway> GetById(int gatewayId)
        {
            return new SuccessDataResult<Gateway>(_gatewayDal.Get(c => c.Id == gatewayId));
        }
    }
}
