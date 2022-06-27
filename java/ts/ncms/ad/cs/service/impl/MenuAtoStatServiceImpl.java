package ts.ncms.ad.cs.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cs.dao.MenuAtoStatDao;
import ts.ncms.ad.cs.service.MenuAtoStatService;

@Service
public class MenuAtoStatServiceImpl implements MenuAtoStatService {

	@Autowired
	private MenuAtoStatDao menuAtoStatDao;

	@Override
	public List<Map<String, Object>> pvList(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.pvList(paramsMap);
	}

	@Override
	public Map<String, Object> pvMenuList(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.pvMenuList(paramsMap);
	}

	@Override
	public Map<String, Object> pvMenuDetail(Map<String, Object> paramsMap) throws NCmsException {
		
		Map<String, Object> detailMap = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		
		result= menuAtoStatDao.pvMenuDetail(paramsMap);
		
		detailMap.put("result", result);	
		
		return detailMap;
	}

	@Override
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.update(paramsMap);
	}

	@Override
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.insert(paramsMap);
	}

	@Override
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.delete(paramsMap);
	}

	@Override
	public int updateUseYn(Map<String, Object> paramsMap) throws NCmsException {
		return menuAtoStatDao.updateUseYn(paramsMap);
	}
}
