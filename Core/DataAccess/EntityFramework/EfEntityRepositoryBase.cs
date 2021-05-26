using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess.EntityFramework;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.DataAccess.EntityFramework
{
    public class EfEntityRepositoryBase<TEntity,TContext>:IEntityRepository<TEntity>
        where TEntity:class,IEntity,new()
        where TContext:DbContext,new()
    {
        public void Add(TEntity entity)
        {
            using (TContext dbContext=new TContext())
            {
                var addedentity = dbContext.Entry(entity);
                addedentity.State = EntityState.Added;
                dbContext.SaveChanges();
            }
        }
        public void Update(TEntity entity)
        {
            using (TContext dbContext=new TContext())
            {
                var deletedentity = dbContext.Remove(entity);
                deletedentity.State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }
        public void Delete(TEntity entity)
        {
            using (TContext dbContext=new TContext())
            {
                var updatedentity = dbContext.Update(entity);
                updatedentity.State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {
            using (TContext dbContext=new TContext())
            {
                return dbContext.Set<TEntity>().SingleOrDefault(filter);
            }
        }
        public List<TEntity> GetAll()
        {
            using (TContext dbContext=new TContext())
            {
                return dbContext.Set<TEntity>().ToList();
            }
        }
        public List<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null)
        {
            using (TContext dBContext = new TContext())
            {
                return filter == null ? dBContext.Set<TEntity>().ToList() : dBContext.Set<TEntity>().Where(filter).ToList();
            }
        }
    }
}
