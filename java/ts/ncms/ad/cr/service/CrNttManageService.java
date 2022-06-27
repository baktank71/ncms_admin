package ts.ncms.ad.cr.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description  : 홈페이지 관리자 [자동차리콜센터 게시물관리] Service
 * System       : cpfms_ha
 * Program ID   : CrCntntsManageService 
 * Creater      : 이성훈
 * Create Date  : 2019. 08. 23.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */

public interface CrNttManageService {

	/**
	 * 게시글 목록
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 게시글 상세보기
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

	/**
	 * SNS공유상태 변경
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int updateSnsYn(Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 팝업존 Max 변경
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int updateMaxPopCount(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 대표 이미지 등록
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int uploadRepImg(MultipartHttpServletRequest multi, HttpServletRequest request) throws NCmsException;

	/**
	 * 팝업존 이미지 등록
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public int uploadPopImg(MultipartHttpServletRequest multi, HttpServletRequest request) throws NCmsException;

	/**
	 * 팝업존 대상 목록 조회
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 * 
	 */
	public Map<String, Object> selectPopupTargetList(Map<String, Object> paramsMap) throws NCmsException;
	
}