package ts.ncms.ad.cr.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cr.dao.RecallNtcnManageDao;
import ts.ncms.ad.cr.service.RecallNtcnManageService;

@Service
public class RecallNtcnManageServiceImpl implements RecallNtcnManageService {
	
	@Autowired
	private RecallNtcnManageDao recallNtcnManageDao;

	@Override
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return recallNtcnManageDao.list(paramsMap);
	}

	@Override
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		Map<String, Object> detailMap = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		
		result = recallNtcnManageDao.detail(paramsMap);
		detailMap.put("result", result);	
		
		return detailMap;
	}

	@Override
	public int deleteUser(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		result = recallNtcnManageDao.deleteUser(paramsMap);
		
		return result;
	}

	@Override
	public int resetPassword(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		result = recallNtcnManageDao.resetPassword(paramsMap);
		
		return result;
	}
	
}