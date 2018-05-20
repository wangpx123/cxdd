package com.redm.actions.system;

import javax.sql.DataSource;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTransactionManager;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
 

public class DynamicTransactionManager extends HibernateTransactionManager {
 
    private static final long serialVersionUID = -4655721479296819154L;
    
    /** 
     * @see org.springframework.orm.hibernate4.HibernateTransactionManager#getDataSource()
     * <b>function:</b> 重写
     * @author hoojo
     */
    @Override
    public DataSource getDataSource() {
        return SessionFactoryUtils.getDataSource(getSessionFactory());
    }
 
    /** 
     * @see org.springframework.orm.hibernate4.HibernateTransactionManager#getSessionFactory()
     * <b>function:</b> 重写
     * @author hoojo
     */
    @Override
    public SessionFactory getSessionFactory() {
        DynamicSessionFactory dynamicSessionFactory = (DynamicSessionFactory) super.getSessionFactory();  
        SessionFactory hibernateSessionFactory = dynamicSessionFactory.getHibernateSessionFactory();  
        return hibernateSessionFactory;  
    }
}
