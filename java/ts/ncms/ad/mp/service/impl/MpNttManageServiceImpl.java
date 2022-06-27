package ts.ncms.ad.mp.service.impl;

import java.util.ArrayList;	
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;
import ts.ncms.ad.mp.dao.MpNttManageDao;
import ts.ncms.ad.mp.service.MpNttManageService;

@Service
public class MpNttManageServiceImpl extends CmmnAbstractServiceImpl implements  MpNttManageService {
	
	@Autowired
	private MpNttManageDao mpNttManageDao;

	@Override
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap = mpNttManageDao.list(paramsMap);
		return resultMap;
	}

	@Override
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();			//파일목록 설정
		Map<String, Object> detailMap = new HashMap<String, Object>();						//상세보기 설정
		
		Map<String, Object> detail = mpNttManageDao.detail(paramsMap);						//상세보기 쿼리로
		
		String contentsId = paramsMap.get("contentsId").toString();							//아이디 부여
		fileList = mpNttManageDao.detailFile(contentsId);									//파일목록 쿼리로			
		
		paramsMap.put("preNext", "pre");
		Map<String, Object> pre = mpNttManageDao.preNext(paramsMap);						//이전글 다음글에서 이전글
		detailMap.put("pre", pre);
		
		paramsMap.put("preNext", "next");
		Map<String, Object> next = mpNttManageDao.preNext(paramsMap);						//이전글 다음글에서 다음글
		detailMap.put("next", next);
		
		detailMap.put("result", detail);
		detailMap.put("fileList", fileList);
		
		return detailMap;
	}

	@Override
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = mpNttManageDao.update(paramsMap);
		
		return result;
	}

	@Override
	public Map<String, Object> insert(Map<String, Object> paramsMap) throws NCmsException {
		int ret = 0;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ret = mpNttManageDao.insert(paramsMap);
		
		int contentsIdIndex = Integer.parseInt(paramsMap.get("contentsIdIndex").toString());
		
		resultMap.put("contentsIdIndex", contentsIdIndex);
		resultMap.put("ret", ret);
	
		return resultMap;
	}

	@Override
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = mpNttManageDao.delete(paramsMap);
		return result;
	}

	@Override
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = mpNttManageDao.updateOpenYn(paramsMap);
		return result;
	}


}