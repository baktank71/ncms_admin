package ts.ncms.ad.mp.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description  : 홈페이지 관리자 [제작자제출자료 게시판관리] Service
 * System       : cpfms_ha
 * Program ID   : MpNttManageService 
 * Creater      : 이성훈
 * Create Date  : 2019. 08. 23.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */

public interface MpNttManageService {

	/**
	 * 제작자 제출자료 게시판
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 제작자 제출자료 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 게시글 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 게시글 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> insert(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 게시글 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 공유상태 변경
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException;
}