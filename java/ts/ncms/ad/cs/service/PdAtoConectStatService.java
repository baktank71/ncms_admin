package ts.ncms.ad.cs.service;

import java.util.List;
import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 기간별 접속통계 Service
 * System		: cpfms_ha
 * Program ID	: PdAtoConectStatService
 * Creater		: 
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
public interface PdAtoConectStatService {

	public List<Map<String, Object>> uYear(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> uMonth(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> uDay(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> uTime(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 기간별 접속통계 목록
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> nuYear(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> nuMonth(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> nuDay(Map<String, Object> paramsMap) throws NCmsException;
	public List<Map<String, Object>> nuTime(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 대상연도조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> selectYearList() throws NCmsException;	
	
}
