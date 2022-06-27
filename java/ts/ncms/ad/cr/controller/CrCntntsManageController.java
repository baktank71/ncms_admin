package ts.ncms.ad.cr.controller;

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
import ts.ncms.ad.om.vo.LoginVO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.cr.service.CrCntntsManageService;

/**
 * Description	: 홈페이지 컨텐츠관리 Controller
 * System		: cpfms_ha
 * Program ID	: CrCntntsManageController
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
@RequestMapping("/cr/cntnts")
public class CrCntntsManageController {
	
	@Autowired
	private CrCntntsManageService cntntsManageService;
	
	/**
	 * 컨텐츠 목록(조회) 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/listView")
	public ModelAndView listView(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
					, HttpServletRequest httpServletRequest)  throws NCmsException {
		
		//홈페이지 컨텐츠관리번호 0612
		String divisionCode = "0612";
		
		if(StringUtils.isEmpty(paramsMap.get("divisionCode"))) {
			paramsMap.put("divisionCode", divisionCode);
		}
		
		paramsMap.put("recordCount", 10);
		
		Map<String, Object> resultMap = cntntsManageService.list(paramsMap);

		mav.addObject("result", resultMap.get("result"));
		mav.addObject("paginationInfo", (PaginationInfo)resultMap.get("paginationInfo"));

		mav.addObject("params", paramsMap);
		mav.setViewName("HA.cr/crCntntsManageList");
		 
		return mav;
	}

	/**
	 * 컨텐츠 상세보기 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/detailView")
	public ModelAndView detailView(@RequestParam Map<String,Object>	paramsMap,	ModelAndView mav
			, HttpServletRequest httpServletRequest)  throws NCmsException {
		
		Map<String, Object> detailMap = new HashMap<String, Object>();
		detailMap = cntntsManageService.detail(paramsMap);
		
		mav.addObject("result", detailMap.get("result"));
		mav.addObject("fileList", detailMap.get("fileList"));
		
		mav.addObject("params", paramsMap);
		mav.setViewName("HA.cr/crCntntsManageDetail");
	    
		return mav;
	}
	
	/**
	 * 컨텐츠 등록 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/regist")
	public ModelAndView write(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletReqest) throws NCmsException {

		//Map<String, Object> result = cntntsManageService.detail(paramsMap);
		if(!StringUtils.isEmpty(paramsMap.get("contentsId"))) {
			Map<String, Object> result = cntntsManageService.detail(paramsMap);
			mav.addObject("result", result.get("result"));
		}
		
		mav.addObject("params", paramsMap);
		mav.setViewName("HA.cr/crCntntsManageRegist");
		
		return mav;
	}
	
	/**
	 * 컨텐츠 미리보기 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/popView")
	public ModelAndView popView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletReqest) throws NCmsException {
	
		Map<String, Object> result = cntntsManageService.detail(paramsMap);
		
		//이미지 경로 hp조정
		String contents = result.get("contents").toString();
		contents = contents.replaceAll("/images/", "/images/hp/");
		result.put("contents", contents);
		
		System.out.println("###### contents >>>" + contents);
		
		mav.addObject("result", result.get("result"));
		mav.addObject("fileList", result.get("fileList"));

		mav.addObject("params", paramsMap);
		//HPOP.*/*
		mav.setViewName("HPOP.cr/crCntntsManagePop");
		
		return mav;
	}
	
	
	/**
	 * 컨텐츠 수정 등록 삭제에 따른 컨트롤러
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/process/{type}")
	@ResponseBody
	public ModelAndView process(@PathVariable String type, @RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
		
		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;
		String resultMsg ="";

		//접속한 사용자 정보
		LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		//paramsMap.put("updIp", lv.getConnIp());
		paramsMap.put("userId", lv.getMbId());
		
		System.out.println("################################");
		System.out.println("## paramsMap ##");
		System.out.println("## " + paramsMap.toString());
		System.out.println("################################");

		if(type.equals("insert")) {
			ret = cntntsManageService.insert(paramsMap);
		} else if(type.equals("update")) {
			ret = cntntsManageService.update(paramsMap);
		} else if(type.equals("delete")) {
			ret = cntntsManageService.delete(paramsMap);
		}else if(type.equals("updateOpenYn")) {
			System.out.println("## " +paramsMap.get("contentsIdList").toString());
			ret = cntntsManageService.updateOpenYn(paramsMap);
		}
		
		if(ret == 1 ) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
} 