package ts.ncms.ad.mp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;
import ts.ncms.ad.mp.dao.MpQnAManageDao;
import ts.ncms.ad.mp.service.MpQnAManageService;

@Service
public class MpQnAManageServiceImpl extends CmmnAbstractServiceImpl implements  MpQnAManageService {

	@Autowired
	private MpQnAManageDao mpQnAManageDao;
	
	@Override
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return mpQnAManageDao.list(paramsMap);
	}

	@Override
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		Map<String, Object> detailMap = new HashMap<String, Object>();
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();			//파일목록 설정1
		List<Map<String, Object>> replyFileList = new ArrayList<Map<String, Object>>();		//파일목록 설정2
		
		Map<String, Object> detail = mpQnAManageDao.detail(paramsMap);

		paramsMap.put("replyType", 1);								//제작자 코드 부여
		fileList = mpQnAManageDao.detailFile(paramsMap);			//파일목록 쿼리로	
		paramsMap.put("replyType", 2);								//관리자 코드 부여	
		replyFileList = mpQnAManageDao.detailFile(paramsMap);		//파일목록 쿼리로		
		
		detailMap.put("result", detail);
		detailMap.put("fileList", fileList);
		detailMap.put("replyFileList", replyFileList);
		return detailMap;
	}

	@Override
	public int answer(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = mpQnAManageDao.answer(paramsMap);
		
		return result;
	}

	@Override
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = mpQnAManageDao.delete(paramsMap);
		
		return result;
	}
}