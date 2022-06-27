package ts.ncms.ad.cs.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cs.service.MenuAtoStatService;
import ts.ncms.ad.cs.service.PdAtoConectStatService;

/**
 * Description	: 기간별 접속통계 Controller
 * System		: cpfms_ha
 * Program ID	: PdAtoConectStatController
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
@RequestMapping("/cs/pdStat")
public class PdAtoConectStatController {

	@Autowired
	private PdAtoConectStatService pdAtoConectStatService;	
	
	/**
	 * 기간별 접속통계 목록
	 * @param request
	 * @param mav
	 * @return
	 * @throws NCmsException
	 */
	  @RequestMapping("/listView")
	  public ModelAndView siPdStatListView(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
				, HttpServletRequest httpServletRequest) throws NCmsException {
		  
	      Date today = new Date();
	      SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
	      String dt = ft.format(today);
	      
	      Calendar week = Calendar.getInstance();
	      week.add(Calendar.DATE, -7);
	      String bt = ft.format(week.getTime());

	      if("".equals(paramsMap.get("searchFromDate")) || paramsMap.get("searchFromDate")==null){
	    	  paramsMap.put("searchFromDate", bt);
	      }
	      if("".equals(paramsMap.get("searchToDate")) || paramsMap.get("searchToDate")==null){
	    	  paramsMap.put("searchToDate", dt);
	      }
	      
	      mav.addObject("params", paramsMap);
	      
    	  if("".equals(paramsMap.get("searchGb")) || paramsMap.get("searchGb")==null){
    		  paramsMap.put("searchGb", "1");
    	  }
    	  //첫화면조회는 일별조회로
    	  if("".equals(paramsMap.get("searchType")) || paramsMap.get("searchType")==null){
    		  paramsMap.put("searchType", "3");
    	  }    	  
    	  
  		  //대상연도조회
  		  List<Map<String,Object>> yList = pdAtoConectStatService.selectYearList();
  		  mav.addObject("yList", yList);
    	  
    	  List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    	  if("1".equals(paramsMap.get("searchGb"))){
    		  if("1".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.uYear(paramsMap);
    		  }else if("2".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.uMonth(paramsMap);
    		  }else if("3".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.uDay(paramsMap);
    		  }else if("4".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.uTime(paramsMap);
    		  }
    	  }else if("2".equals(paramsMap.get("searchGb"))){
    		  if("1".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.nuYear(paramsMap);
    		  }else if("2".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.nuMonth(paramsMap);
    		  }else if("3".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.nuDay(paramsMap);
    		  }else if("4".equals(paramsMap.get("searchType"))){
    			  list = pdAtoConectStatService.nuTime(paramsMap);
    		  }    		  
    	  }
	      
	      
	      
	      mav.addObject("result", list);	      

	    mav.setViewName("HA.cs/pdStatList");

	    return mav;
	  }
	  
}
