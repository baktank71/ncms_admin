package ts.ncms.ad.cmmn.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.dao.CmmnDao;
import ts.ncms.ad.cmmn.service.CmmnService;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class CmmnServiceImpl extends CmmnAbstractServiceImpl implements CmmnService{

	private static final Logger logger = LoggerFactory.getLogger(CmmnServiceImpl.class);
	
	@Autowired
	private CmmnDao cmmnDao;

	@Override
	public Map<String, Object> selectPrdctList(Map<String, Object> paramsMap) throws NCmsException {
		return cmmnDao.selectPrdctList(paramsMap);
	}
	
}
