package ts.ncms.ad.cs.service;

import java.util.List;
import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 메뉴별 접속통계 Service
 * System		: cpfms_ha
 * Program ID	: MenuAtoStatService
 * Creater		: 
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
public interface MenuAtoStatService {

	public List<Map<String, Object>> pvList(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 통계메뉴명 목록
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> pvMenuList(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 통계메뉴명 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> pvMenuDetail(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 통계메뉴명 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 통계메뉴명 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insert(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 통계메뉴명 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 통계메뉴명 사용상태 변경
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int updateUseYn(Map<String, Object> paramsMap) throws NCmsException;

}
