package ts.ncms.ad.cs.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cs.dao.PdAtoConectStatDao;
import ts.ncms.ad.cs.service.PdAtoConectStatService;
import ts.ncms.ad.si.dao.StatsInfoDao;

@Service
public class PdAtoConectStatServiceImpl implements PdAtoConectStatService {

	@Autowired
	private PdAtoConectStatDao pdAtoConectStatDao;

	@Override
	public List<Map<String, Object>> uYear(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.uYear(paramsMap);
	}
	@Override
	public List<Map<String, Object>> uMonth(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.uMonth(paramsMap);
	}
	@Override
	public List<Map<String, Object>> uDay(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.uDay(paramsMap);
	}
	@Override
	public List<Map<String, Object>> uTime(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.uTime(paramsMap);
	}

	@Override
	public List<Map<String, Object>> nuYear(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.nuYear(paramsMap);
	}
	@Override
	public List<Map<String, Object>> nuMonth(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.nuMonth(paramsMap);
	}
	@Override
	public List<Map<String, Object>> nuDay(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.nuDay(paramsMap);
	}
	@Override
	public List<Map<String, Object>> nuTime(Map<String, Object> paramsMap) throws NCmsException {
		return pdAtoConectStatDao.nuTime(paramsMap);
	}
	
	@Override
	public List<Map<String, Object>> selectYearList() throws NCmsException {
		return pdAtoConectStatDao.selectYearList();
	}	
	
}
