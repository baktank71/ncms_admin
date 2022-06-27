package ts.ncms.ad.cmmn.service;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 첨부파일 Service 
 * System       : cpfms_hp
 * Program ID   : FileMngService 
 * Creater      :  
 * Create Date  : 2019. 10. 02. 
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
public interface FileMngService {

	/**
	 * 파일 다운로드
	 *
	 * @param request
	 * @param response
	 * @param paramsMap
	 * @return void
	 * @throws NCmsException
	 * @throws IOException 
	 */
	void dnldFile(HttpServletRequest request, HttpServletResponse response, Map<String, Object> paramsMap) throws NCmsException, IOException;

	/**
	 * 파일 일괄다운로드 (파일id 목록으로 압축 다운)
	 *
	 * @param request
	 * @param response
	 * @param paramsMap
	 * @return void
	 * @throws NCmsException
	 */
	void dnldBndeFile(HttpServletRequest request, HttpServletResponse response, Map<String, Object> paramsMap) throws NCmsException;

	/**
	 * 파일업로드 ajax
	 *
	 * @param multi
	 * @param request
	 * @return Map<String, Object>
	 * @throws NCmsException, IllegalStateException, IOException
	 */
	Map<String, Object> uploadFile(MultipartHttpServletRequest multi, HttpServletRequest request) 
					throws NCmsException, IllegalStateException, IOException;

	/**
	 * 파일 삭제 ajax
	 * @param request
	 * @param response
	 * @param fileVo
	 * @param mv
	 * @return
	 * @throws TmsdgException
	 */
	int deleteFile(Map<String, Object> paramsMap, HttpServletRequest request) throws NCmsException;
	
}
