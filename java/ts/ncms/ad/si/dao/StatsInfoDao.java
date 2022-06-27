package ts.ncms.ad.si.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 통계정보 Dao
 * System		: cpfms_ha
 * Program ID	: StatsInfoDao
 * Creater		: 박소희
 * Create Date	: 2019. 11. 26.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Repository
public class StatsInfoDao extends AbstractDAO{

	/**
	 * 통계관리 목록 조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws ts.ncms.ad.
	 */
	public List<Map<String, Object>> statsManageList(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("si.statsInfo.statsManageList", paramsMap);
	}

	/**
	 * 공개상태 변경
	 * @param paramsMap
	 * @return
	 * @throws ts.ncms.ad.
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		return update("si.statsInfo.updateOpenYn", paramsMap);
	}

	/**
	 * 리콜현황 통계 화면
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public List<Map<String, Object>> rcList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.rcList", paramsMap);
	}
	public List<Map<String, Object>> pdList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.pdList", paramsMap);
	}
	public List<Map<String, Object>> mkList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.mkList", paramsMap);
	}
	public List<Map<String, Object>> cgList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.cgList", paramsMap);
	}

	/**
     * 리콜대상년도 목록 조회
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public List<Map<String, Object>> selectYearList() throws NCmsException {
		return selectList("si.statsInfo.yearList");
	}

	/**
	 * 신고 통계 화면
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public List<Map<String, Object>> rcScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.rcScList", paramsMap);
	}
	public List<Map<String, Object>> pdScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.pdScList", paramsMap);
	}
	public List<Map<String, Object>> mkScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.mkScList", paramsMap);
	}
	public List<Map<String, Object>> rpScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.rpScList", paramsMap);
	}
	public List<Map<String, Object>> cgScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.cgScList", paramsMap);
	}

	/**
     * 신고대상년도 목록 조회
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public List<Map<String, Object>> selectYearScList() throws NCmsException {
		return selectList("si.statsInfo.yearScList");
	}

	/**
     * 차트용 top5 조회
     * @param paramsMap
     * @return
     * @throws ts.ncms.ad.
     */
	public List<Map<String, Object>> pdChartList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.pdChartList", paramsMap);
	}
	public List<Map<String, Object>> pdChartScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.pdChartScList", paramsMap);
	}
	public List<Map<String, Object>> mkChartList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.mkChartList", paramsMap);
	}
	public List<Map<String, Object>> mkChartScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.mkChartScList", paramsMap);
	}
	public List<Map<String, Object>> rpChartScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.rpChartScList", paramsMap);
	}
	public List<Map<String, Object>> cgChartList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.cgChartList", paramsMap);
	}
	public List<Map<String, Object>> cgChartScList(Map<String, Object> paramsMap) {
		return selectList("si.statsInfo.cgChartScList", paramsMap);
	}

	/**
	 * 하자목록 조회
	 *
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws ts.ncms.ad.
	 */
	public List<Map<String, Object>> psList(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("si.statsInfo.psList", paramsMap);
	}
}
