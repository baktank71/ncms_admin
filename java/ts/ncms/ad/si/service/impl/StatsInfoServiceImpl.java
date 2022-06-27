package ts.ncms.ad.si.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.si.dao.StatsInfoDao;
import ts.ncms.ad.si.service.StatsInfoService;
import ts.ncms.ad.common.StringUtils;

@Service
public class StatsInfoServiceImpl implements StatsInfoService {
	
	@Autowired
	private StatsInfoDao statsInfoDao;

	@Override
	public List<Map<String, Object>> statsManageList(Map<String, Object> paramsMap) throws NCmsException {
		return statsInfoDao.statsManageList(paramsMap);
	}

	@Override
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = statsInfoDao.updateOpenYn(paramsMap);
		
		return result;
	}

	
	@Override
	public Map<String, Object> rcList(Map<String, Object> paramsMap) throws NCmsException {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> rcList = new ArrayList<Map<String, Object>>();

		//기관선택
		String organ = StringUtils.nullCheck(paramsMap.get("organ"),"1");
		paramsMap.put("organ", organ);

		//해당년도체크
		String thisyear = "";	
		List<Map<String,Object>> yList = statsInfoDao.selectYearList();
		if(yList != null && yList.size() > 0) {
			thisyear = yList.get(0).get("year").toString();
		}else {
			java.util.Date dd = new java.util.Date();
			java.text.DateFormat dateFormat = new java.text.SimpleDateFormat("yyyy");
			thisyear = dateFormat.format(dd);
		}
		paramsMap.put("thisYear", thisyear);
		resultMap.put("yList", yList);
		//해당년도체크 END

		String recallYear = StringUtils.nullCheck(paramsMap.get("recallYear"),""); //리콜대상년도
		String rcType = StringUtils.nullCheck(paramsMap.get("rcType"),"");	//월별, 연도별 구분		
		String statType = StringUtils.nullCheck(paramsMap.get("statType"),"");	//차량별, 장치별, 제작사별 구분	
		
		if(!rcType.equals("Y")) { //월별현황 or 연도별현황
			String recallMonth = StringUtils.nullCheck(paramsMap.get("recallMonth"),"");
			if(!"".equals(recallMonth) && !"0".equals(recallMonth)) {
				paramsMap.put("recallDateFrom",recallYear.concat("-").concat(recallMonth));
			}
		}
		
		if("".equals(recallYear)) {
			paramsMap.put("recallYear", thisyear);				
		}
		String recallToYear = "";
		if(paramsMap.get("recallToYear") != null) {
			recallToYear = StringUtils.nullCheck(paramsMap.get("recallToYear"),""); //리콜대상년도
		}
		if("".equals(recallToYear)) {
			paramsMap.put("recallToYear", thisyear);				
		}
		
		if(statType.equals("MK")) {
			//제작사별 리콜현황
			rcList = statsInfoDao.mkList(paramsMap);
		}else if(statType.equals("PD")) {
			//장치별 리콜현황
			rcList = statsInfoDao.pdList(paramsMap);
		}else if(statType.equals("CG")) {
			//차량별 리콜현황
			String makerCode = StringUtils.nullCheck(paramsMap.get("makerCode"),"");
			if(makerCode != "") {
				rcList = statsInfoDao.cgList(paramsMap);				
			}
		}else{
			//전체 리콜현황
			rcList = statsInfoDao.rcList(paramsMap);
		}

		resultMap.put("rcList", rcList);
		resultMap.put("paramsMap", paramsMap);
		
		return resultMap;
	}

	@Override
	public Map<String, Object> scList(Map<String, Object> paramsMap) throws NCmsException {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> rcList = new ArrayList<Map<String, Object>>();

		//해당년도체크
		String thisyear = "";	
		List<Map<String,Object>> yList = statsInfoDao.selectYearScList();
		if(yList != null && yList.size() > 0) {
			thisyear = yList.get(0).get("year").toString();
		}else {
			java.util.Date dd = new java.util.Date();
			java.text.DateFormat dateFormat = new java.text.SimpleDateFormat("yyyy");
			thisyear = dateFormat.format(dd);
		}
		paramsMap.put("thisYear", thisyear);
		resultMap.put("yList", yList);
		//해당년도체크 END

		String recallYear = StringUtils.nullCheck(paramsMap.get("recallYear"),""); //리콜대상년도
		String rcType = StringUtils.nullCheck(paramsMap.get("rcType"),"");	//월별, 연도별 구분		
		String statType = StringUtils.nullCheck(paramsMap.get("statType"),"");	//차량별, 장치별, 제작사별 구분	

		if(!rcType.equals("Y")) { //월별현황 or 연도별현황
			String recallMonth = StringUtils.nullCheck(paramsMap.get("recallMonth"),"");
			if(!"".equals(recallMonth) && !"0".equals(recallMonth)) {
				paramsMap.put("recallDateFrom",recallYear.concat("-").concat(recallMonth));
			}
		} 

		if("".equals(recallYear)) {
			paramsMap.put("recallYear", thisyear);				
		}
		String recallToYear = "";
		if(paramsMap.get("recallToYear") != null) {
			recallToYear = StringUtils.nullCheck(paramsMap.get("recallToYear"),""); //리콜대상년도
		}
		if("".equals(recallToYear)) {
			paramsMap.put("recallToYear", thisyear);				
		}
		
		if(statType.equals("MK")) {
			//신고현황(제작사별)
			rcList = statsInfoDao.mkScList(paramsMap);
		}else if(statType.equals("PD")) {
			//신고현황(장치별)
			rcList = statsInfoDao.pdScList(paramsMap);
		}else if(statType.equals("RP")) {
			//신고현황(접수경로별)
			rcList = statsInfoDao.rpScList(paramsMap);
		}else if(statType.equals("CG")) {
			//차량별 리콜현황
			String makerCode = StringUtils.nullCheck(paramsMap.get("makerCode"),"");
			if(makerCode != "") {
				rcList = statsInfoDao.cgScList(paramsMap);
			}
		}else{
			//전체 신고현황
			rcList = statsInfoDao.rcScList(paramsMap);
		}
		
		resultMap.put("rcList", rcList);
		resultMap.put("paramsMap", paramsMap);
		
		return resultMap;
	}
	
	/*
	 * @Override public List<Map<String, Object>> selectYearList() throws
	 * ts.ncms.ad. { return statsInfoDao.selectYearList(); }
	 */
	
	/*
	 * @Override public List<Map<String, Object>> selectYearScList() throws
	 * ts.ncms.ad. { return statsInfoDao.selectYearScList(); }
	 */

	@Override
	public Map<String, Object> getChartList(Map<String, Object> paramsMap) throws NCmsException {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> cList = new ArrayList<Map<String, Object>>();

		String recallYear = StringUtils.nullCheck(paramsMap.get("recallYear"),""); //리콜대상년도
		String rcType = StringUtils.nullCheck(paramsMap.get("rcType"),"");	//월별, 연도별 구분		
		String statType = StringUtils.nullCheck(paramsMap.get("statType"),"");	//리콜, 신고 구분
		String chartType = StringUtils.nullCheck(paramsMap.get("chartType"),"");	//차량별, 장치별, 제작사별 구분	

		String thisyear = "";	
		List<Map<String,Object>> yList = new ArrayList<Map<String,Object>>();
		
		if(statType.equals("RC")) {
			yList = statsInfoDao.selectYearList();
		}else if(statType.equals("SC")) {
			yList = statsInfoDao.selectYearScList();
		}		
		
		if(yList != null && yList.size() > 0) {
			thisyear = yList.get(0).get("year").toString();
		}
		paramsMap.put("thisYear", thisyear);
		resultMap.put("yList", yList);
		
		if(!rcType.equals("Y")) { //월별현황 or 연도별현황
			String recallMonth = StringUtils.nullCheck(paramsMap.get("recallMonth"),"");
			if(!"".equals(recallMonth) && !"0".equals(recallMonth)) {
				paramsMap.put("recallDateFrom",recallYear.concat("-").concat(recallMonth));
			}
		}

		if("".equals(recallYear)) {
			paramsMap.put("recallYear", thisyear);				
		}
		String recallToYear = "";
		if(paramsMap.get("recallToYear") != null) {
			recallToYear = StringUtils.nullCheck(paramsMap.get("recallToYear"),""); //리콜대상년도
		}
		if("".equals(recallToYear)) {
			paramsMap.put("recallToYear", thisyear);				
		}
		
		if("PD".equals(chartType)) {	//장치별
			
			if(statType.equals("RC")) {
				paramsMap.put("carType", "KOR"); //국내
				cList = statsInfoDao.pdChartList(paramsMap);
				resultMap.put("chartList1", cList);
				paramsMap.put("carType", "FOR"); //수입
				cList = statsInfoDao.pdChartList(paramsMap);
				resultMap.put("chartList2", cList);
			}else if(statType.equals("SC")) {
				paramsMap.put("carType", "KOR"); //국내
				cList = statsInfoDao.pdChartScList(paramsMap);
				resultMap.put("chartList1", cList);
				paramsMap.put("carType", "FOR"); //수입
				cList = statsInfoDao.pdChartScList(paramsMap);
				resultMap.put("chartList2", cList);
			}		
			
		}else if("MK".equals(chartType)) { //제조사별
			
			if(statType.equals("RC")) {
				paramsMap.put("carType", "KOR"); //국내
				cList = statsInfoDao.mkChartList(paramsMap);
				resultMap.put("chartList1", cList);
				paramsMap.put("carType", "FOR"); //수입
				cList = statsInfoDao.mkChartList(paramsMap);
				resultMap.put("chartList2", cList);
			}else if(statType.equals("SC")) {
				paramsMap.put("carType", "KOR"); //국내
				cList = statsInfoDao.mkChartScList(paramsMap);
				resultMap.put("chartList1", cList);
				paramsMap.put("carType", "FOR"); //수입
				cList = statsInfoDao.mkChartScList(paramsMap);
				resultMap.put("chartList2", cList);
			}	
		
		}else if("RP".equals(chartType)) { //접수경로별
			
			paramsMap.put("carType", "KOR"); //국내
			cList = statsInfoDao.rpChartScList(paramsMap);
			resultMap.put("chartList1", cList);
			paramsMap.put("carType", "FOR"); //수입
			cList = statsInfoDao.rpChartScList(paramsMap);
			resultMap.put("chartList2", cList);
			
		}else if("CG".equals(chartType)) { //차종별(대표차명) 
			
			if(statType.equals("RC")) {
				//paramsMap.put("carType", "KOR"); //국산
				cList = statsInfoDao.cgChartList(paramsMap);
				resultMap.put("chartList1", cList);
				//paramsMap.put("carType", "FOR"); //수입
				//cList = statsInfoDao.cgChartList(paramsMap);
				//resultMap.put("chartList2", cList);
				resultMap.put("chartList2", null);
			}else if(statType.equals("SC")) { 
				//paramsMap.put("carType", "KOR"); //국산
				cList = statsInfoDao.cgChartScList(paramsMap);
				resultMap.put("chartList1", cList);
				//paramsMap.put("carType", "FOR"); //수입
				//cList = statsInfoDao.cgChartScList(paramsMap);
				//resultMap.put("chartList2", cList);
				resultMap.put("chartList2", null);
			}	
		
		}
		
		return resultMap;
	}

	/**
	 * 하자목록 조회
	 *
	 * @param paramsMap
	 * @return Object
	 * @throws ts.ncms.ad.
	 */
	@Override
	public List<Map<String, Object>> psList(Map<String, Object> paramsMap) throws NCmsException {
		return  statsInfoDao.psList(paramsMap);
	}
}