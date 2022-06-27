package ts.ncms.ad.cs.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 기간별 접속통계 Dao
 * System		: cpfms_ha
 * Program ID	: PdAtoConectStatDao
 * Creater		: 
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Repository
public class PdAtoConectStatDao extends AbstractDAO {

	public List<Map<String, Object>> uYear(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.uYear", paramsMap);
	}
	public List<Map<String, Object>> uMonth(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.uMonth", paramsMap);
	}
	public List<Map<String, Object>> uDay(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.uDay", paramsMap);
	}
	public List<Map<String, Object>> uTime(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.uTime", paramsMap);
	}

	/**
	 * 기간별 접속통계 목록
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> nuYear(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.nuYear", paramsMap);
	}
	public List<Map<String, Object>> nuMonth(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.nuMonth", paramsMap);
	}
	public List<Map<String, Object>> nuDay(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.nuDay", paramsMap);
	}
	public List<Map<String, Object>> nuTime(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.pdStat.nuTime", paramsMap);
	}
	
	/**
	 * 대상연도조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> selectYearList() throws NCmsException {
		return selectList("cs.pdStat.selectYearList");
	}
}
