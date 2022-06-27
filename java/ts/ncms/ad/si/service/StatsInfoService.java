package ts.ncms.ad.si.service;

import java.util.List;
import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 통계정보 Service
 * System		: cpfms_ha
 * Program ID	: StatsInfoService
 * Creater		: 박소희
 * Create Date	: 2019. 11. 26.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
public interface StatsInfoService {

	/**
	 * 통계관리 목록 조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws ts.ncms.ad.
	 */
	public List<Map<String, Object>> statsManageList(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 공개상태 변경
	 * @param paramsMap
	 * @return
	 * @throws ts.ncms.ad.
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 리콜현황 통계 화면
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public Map<String, Object> rcList(Map<String, Object> paramsMap) throws NCmsException;

	/**
     * 리콜대상년도 목록 조회
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	//public List<Map<String, Object>> selectYearList() throws ts.ncms.ad.;

	/**
	 * 신고 통계 화면
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public Map<String, Object> scList(Map<String, Object> paramsMap) throws NCmsException;

	/**
     * 신고대상년도 목록 조회
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	//public List<Map<String, Object>> selectYearScList() throws ts.ncms.ad.;
	
	/**
     * 차트용 통계목록 조회 
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public Map<String, Object> getChartList(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 하자목록 조회
	 *
	 * @param paramsMap
	 * @return Object
	 * @throws ts.ncms.ad.
	 */
	public List<Map<String, Object>> psList(Map<String, Object> paramsMap) throws NCmsException;
}