package ts.ncms.ad.mp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;	
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.mp.service.MpNttManageService;
import ts.ncms.ad.om.vo.LoginVO;

/**
 * Description	: 제작자 게시물관리 Controller
 * System		: cpfms_ha
 * Program ID	: MpNttManageController
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
@RequestMapping("/mp/ntt")
public class MpNttManageController {

	@Autowired
	private MpNttManageService mpNttManageService;
	
	/**
	 * 게시물 목록(조회) 화면
	 * @param paramsMap
	 * @param mav
	 * @param httpServletRequest
	 * @return
	 * @throws NCmsException
	 */
	
	@RequestMapping("/listView")
	public ModelAndView listView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
		
		String divisionCode = "0412";			// 제작자 공지사항은 0412
	
		if(StringUtils.isEmpty(paramsMap.get("divisionCode"))) {		// divisionCode의 값이 없을 시, 0412
			paramsMap.put("divisionCode", divisionCode);
		} else {										
			divisionCode = paramsMap.get("divisionCode").toString();
		}
		
		paramsMap.put("recordCount", 10);				//페이지당 보여줄 갯수
		
		Map<String, Object> resultMap = mpNttManageService.list(paramsMap);
		
		mav.setViewName("HA.mp/mpNttManageListView");
		
		mav.addObject("result", resultMap.get("result"));
		mav.addObject("params", paramsMap);
		mav.addObject("paginationInfo", (PaginationInfo) resultMap.get("paginationInfo"));
		
		return mav;
	}
	
	/**
	 * 게시판 상황에 따른 컨트롤러 [삭제, 수정, 체크박스 등등]
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/process/{type}")
	@ResponseBody
	public ModelAndView process(@PathVariable String type, @RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
		
		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;					
		String resultMsg = "";			//성공 실패 문구
		
		//12월 17일 추가본 로그인 정보
		LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String userId = lv.getUserId();
		paramsMap.put("userId", userId);
		
		if(type.equals("updateOpenYn")) {
			ret = mpNttManageService.updateOpenYn(paramsMap);
		} else if(type.equals("update")) {
			ret = mpNttManageService.update(paramsMap);
		} else if(type.equals("delete")) {
			ret = mpNttManageService.delete(paramsMap);
		} else if(type.equals("insert")) {
			Map<String, Object> resultMap = mpNttManageService.insert(paramsMap);
			mav.addObject("contentsIdIndex", resultMap.get("contentsIdIndex"));
			ret = (Integer) resultMap.get("ret");
		}
		
		if(ret > 0) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
	/**
	 * 게시판 상세보기 [상세, 파일 목록, 이전글 다음글]
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/detailView")
	public ModelAndView detailView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
		
		Map<String, Object> detailMap = new HashMap<String, Object>();
		detailMap = mpNttManageService.detail(paramsMap);
		
		mav.addObject("result", detailMap.get("result"));		//상세만 나오는지 확인
		mav.addObject("fileList", detailMap.get("fileList"));	//상세 파일리스트
		
		mav.addObject("pre", detailMap.get("pre"));				//이전글
		mav.addObject("next", detailMap.get("next"));			//다음글
		
		mav.addObject("params", paramsMap);
		mav.setViewName("HA.mp/mpNttManageDetailView");
		return mav; 
	}
	
	/**
	 * 게시판 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/regist")
	public ModelAndView registView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
		
		if(!StringUtils.isEmpty(paramsMap.get("contentsId"))) {
			Map<String, Object> result = mpNttManageService.detail(paramsMap);
			mav.addObject("result", result.get("result"));
			mav.addObject("fileList", result.get("fileList"));
		}
		
		mav.setViewName("HA.mp/mpNttManageRegist");
		mav.addObject("params", paramsMap);
		return mav;
	}
	 
	
	
} 