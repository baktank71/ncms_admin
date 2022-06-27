package ts.ncms.ad.cr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.cr.dao.CrCntntsManageDao;
import ts.ncms.ad.cr.service.CrCntntsManageService;

@Service
public class CrCntntsManageServiceImpl implements CrCntntsManageService {
	
	@Autowired
	private CrCntntsManageDao crCntntsManageServiceDao;

	@Override
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return crCntntsManageServiceDao.list(paramsMap);
	}

	@Override
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		
		Map<String, Object> detailMap = new HashMap<String, Object>();
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		
		detailMap = crCntntsManageServiceDao.detail(paramsMap);

		String fileCnt = StringUtils.nullCheck(paramsMap.get("contentsId"),"0");
		if(fileCnt != "0") {
			fileList = crCntntsManageServiceDao.detailFile(paramsMap);
		}
		
		detailMap.put("result", detailMap);
		detailMap.put("fileList", fileList);
		
		return detailMap;
	}

	@Override
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = crCntntsManageServiceDao.insert(paramsMap);
				
		return result;
	}

	@Override
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = crCntntsManageServiceDao.update(paramsMap);
		
		return result;
	}
	
	@Override
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = crCntntsManageServiceDao.delete(paramsMap);
		
		return result;
	}

	@Override
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;

		//List<String> contentsIdList = new ArrayList<String>();
		//String[] arr = (String[]) paramsMap.get("contentsIdGroup"); 
		
		//paramsMap.put("contentsIdList", contentsIdList);
		
		result = crCntntsManageServiceDao.updateOpenYn(paramsMap);
		
		return result;
	}
}