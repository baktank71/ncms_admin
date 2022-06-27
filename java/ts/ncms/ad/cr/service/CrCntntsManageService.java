package ts.ncms.ad.cr.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description  : 홈페이지 컨텐츠관리 Service
 * System       : cpfms_ha
 * Program ID   : CrCntntsManageService 
 * Creater		: 박소희
 * Create Date	: 2019. 10. 30.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */

public interface CrCntntsManageService {

	/**
	 * 컨텐츠 목록
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException;


	/**
	 * 컨텐츠 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 컨텐츠 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insert(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 컨텐츠 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 컨텐츠 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 공유상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException;
	
}