package ts.ncms.ad.cr.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description  : 리콜알리미 서비스
 * System       : cpfms_ha
 * Program ID   : RecallNtcnManageService 
 * Creater		: 박소희
 * Create Date	: 2019. 10. 30.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */

public interface RecallNtcnManageService {

	/**
	 * 리콜알리미 목록
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException;


	/**
	 * 리콜알리미 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException;
	
	
	/**
	 * 리콜알리미 해지신청 저장
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int deleteUser(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 리콜알리미 패스워드 초기화
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int resetPassword(Map<String, Object> paramsMap) throws NCmsException;
}