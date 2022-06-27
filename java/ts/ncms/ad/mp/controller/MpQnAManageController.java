package ts.ncms.ad.mp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import ts.ncms.ad.common.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.mp.service.MpQnAManageService;

/**
 * Description	: 제작자 QnA 게시물관리 Controller
 * System		: cpfms_ha
 * Program ID	: MpQnAManageController
 * Creater		: 박소희
 * Create Date	: 2019. 10. 30.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Controller
@RequestMapping("/mp/qna")
public class MpQnAManageController {

	@Autowired
	private MpQnAManageService mpQnAManageService;
	
	/**
	 * QnA 목록 조회 화면
	 * @param paramsMap
	 * @param mav
	 * @param httpServletRequest
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/listView")
	public ModelAndView qnaList(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {

		String divisionCode = "0413";			// QNA는 0413
	
		if(StringUtils.isEmpty(paramsMap.get("divisionCode"))) {		// divisionCode의 값이 없을 시, 0413
			paramsMap.put("divisionCode", divisionCode);
		} else {										
			divisionCode = paramsMap.get("divisionCode").toString();
		}
		
		Map<String, Object> resultMap = mpQnAManageService.list(paramsMap);

		mav.setViewName("HA.mp/mpQnAManageListView");
		
		mav.addObject("result", resultMap.get("result"));
		mav.addObject("params", paramsMap);
		mav.addObject("paginationInfo", (PaginationInfo) resultMap.get("paginationInfo"));
		
		return mav;
	}
	
	/**
	 * QnA 상세 조회 화면 
	 * @param paramsMap
	 * @param mav
	 * @param httpServletRequest
	 * @return
	 * @throws NCmsException
	 */
	
	@RequestMapping("/detailView")
	public ModelAndView qnaDetail(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
		
		Map<String, Object> detailMap = new HashMap<String, Object>();
		detailMap = mpQnAManageService.detail(paramsMap);
		
		mav.addObject("result", detailMap.get("result"));
		mav.addObject("fileList", detailMap.get("fileList"));	//제작자 파일리스트
		mav.addObject("replyFileList", detailMap.get("replyFileList"));	//관리자 파일리스트
		
		mav.addObject("params", paramsMap);
		
		mav.setViewName("HA.mp/mpQnAManageDetailView");

		return mav;
	}
	
	/**
	 * QnA 등록
	 * @param paramsMap
	 * @param mav
	 * @param httpServletRequest
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/regist")
	public ModelAndView qnaRegist(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
		
		
		if(!StringUtils.isEmpty(paramsMap.get("contentsId"))) {
			
			Map<String, Object> result = mpQnAManageService.detail(paramsMap);
			mav.addObject("result", result.get("result"));
			mav.addObject("fileList", result.get("fileList"));	//제작자 파일리스트
			mav.addObject("replyFileList", result.get("replyFileList"));	//관리자 파일리스트
		}
		
		mav.addObject("params", paramsMap);
		
		mav.setViewName("HA.mp/mpQnAManageRegist");

		return mav;
	}
	
	/**
	 * 프로세스 처리 [등록 및 삭제]
	 * @param type
	 * @param paramsMap
	 * @param httpServletRequest
	 * @return
	 * @throws NCmsException
	 */
	
	@RequestMapping("/process/{type}")
	@ResponseBody
	public ModelAndView process(@PathVariable String type, @RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
	
		ModelAndView mav = new ModelAndView("jsonView");
		
		int ret = 0;
		String resultMsg = "";
		
		if(type.equals("answer")) {
			ret = mpQnAManageService.answer(paramsMap);
		} else if(type.equals("delete")) {
			ret = mpQnAManageService.delete(paramsMap);
		}
		
		if(ret == 1) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
}