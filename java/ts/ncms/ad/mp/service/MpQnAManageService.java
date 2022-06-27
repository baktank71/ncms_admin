package ts.ncms.ad.mp.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description  : 홈페이지 관리자 [제작자 QnA 게시판관리] Service
 * System       : cpfms_ha
 * Program ID   : MpQnAManageService 
 * Creater      : 이성훈
 * Create Date  : 2019. 08. 23.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */

public interface MpQnAManageService {

	/**
	 * QnA 게시판 목록 [O]
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException;

	
	/**
	 * QnA 상세 보기 [O]
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException;
	
	
	/**
	 * QnA 답변 달기 [수정]
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int answer(Map<String, Object> paramsMap) throws NCmsException;
	
	
	/**
	 * QnA 삭제
	 * @param parmasMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException;
	
}