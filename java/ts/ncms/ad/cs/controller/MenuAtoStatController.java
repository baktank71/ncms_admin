package ts.ncms.ad.cs.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
import ts.ncms.ad.cs.service.MenuAtoStatService;
import ts.ncms.ad.cs.service.PdAtoConectStatService;
import ts.ncms.ad.om.vo.LoginVO;

/**
 * Description	: 메뉴별 접속통계 Controller
 * System		: cpfms_ha
 * Program ID	: MenuAtoStatController
 * Creater		: 
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Controller
@RequestMapping("/cs/menuStat")
public class MenuAtoStatController {

	@Autowired
	private MenuAtoStatService menuAtoStatService;	

	@Autowired
	private PdAtoConectStatService pdAtoConectStatService;	
	
	/**
	 * 메뉴별 접속통계 목록
	 * @param request
	 * @param mav
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/listView")
	public ModelAndView siMenuStatListView(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
				, HttpServletRequest httpServletRequest) throws NCmsException {
		  
		String category = StringUtils.nullCheck(paramsMap.get("category"),"").toUpperCase();
  
		if(category.equals("SET")) {
			Map<String, Object> resultMap = menuAtoStatService.pvMenuList(paramsMap);

			mav.addObject("result", resultMap.get("result"));
			mav.addObject("paginationInfo", (PaginationInfo)resultMap.get("paginationInfo"));

			mav.addObject("params", paramsMap);
			mav.setViewName("HA.cr/crCntntsManageList");
		}else {

			Date today = new Date();
			SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
			String dt = ft.format(today);

			if(paramsMap.get("searchFromDate")=="" || paramsMap.get("searchFromDate")==null){
				paramsMap.put("searchFromDate", dt);
			}
			if(paramsMap.get("searchToDate")=="" || paramsMap.get("searchToDate")==null){
				paramsMap.put("searchToDate", dt);
			}
			  
			mav.addObject("params", paramsMap);
			
			if("".equals(paramsMap.get("searchType")) || paramsMap.get("searchType")==null){
				paramsMap.put("searchType", "3");
			}    
  
			//대상연도조회
			List<Map<String,Object>> yList = pdAtoConectStatService.selectYearList();
			mav.addObject("yList", yList);
			  
			List<Map<String, Object>> list = menuAtoStatService.pvList(paramsMap);
			  
			mav.addObject("result", list);
		}

		if(category.equals("SET")) {
			mav.setViewName("HA.cs/menuStatSetList");
		}else {
			mav.setViewName("HA.cs/menuStatList");			
		}

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
		if(!StringUtils.isEmpty(paramsMap.get("seq"))) {
			Map<String, Object> result = menuAtoStatService.pvMenuDetail(paramsMap);
			mav.addObject("result", result.get("result"));
		}
		
		mav.addObject("params", paramsMap);
		mav.setViewName("HA.cs/menuStatSetRegist");
		
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
		paramsMap.put("userId", lv.getUserId());
		
		System.out.println("################################");
		System.out.println("## paramsMap ##");
		System.out.println("## " + paramsMap.toString());
		System.out.println("################################");

		if(type.equals("insert")) {
			ret = menuAtoStatService.insert(paramsMap);
		} else if(type.equals("update")) {
			ret = menuAtoStatService.update(paramsMap);
		} else if(type.equals("delete")) {
			ret = menuAtoStatService.delete(paramsMap);
		}else if(type.equals("updateOpenYn")) {
			System.out.println("## " +paramsMap.get("contentsIdList").toString());
			ret = menuAtoStatService.updateUseYn(paramsMap);
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
