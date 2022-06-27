package ts.ncms.ad.cmmn.sys.service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ts.ncms.ad.cmmn.sys.util.CommonUtil.getFileXSS;
import static ts.ncms.ad.cmmn.sys.util.CommonUtil.getXSS;



@Service("myBatisSupport")
public class CmmnAbstractServiceImpl extends EgovAbstractServiceImpl {

    static final Logger logger = LoggerFactory.getLogger(CmmnAbstractServiceImpl.class);

    @Autowired(required = false)
    @Qualifier("sqlSessionTemplate")
    protected SqlSessionTemplate sqlSession;


    @Autowired(required = false)
    @Qualifier("sqlSessionTemplateMsSql")
    protected SqlSessionTemplate sqlSessionMsSql;

    @Autowired
    ApplicationContext applicationContext;

    public MyBatisTransactionManager getTransactionManager() {
        return applicationContext.getBean(MyBatisTransactionManager.class);
    }

    /**
     * 사용자 접속 IP 가져오기
     *
     * @return
     */
    protected String getClientIP() {

        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String ip = httpServletRequest.getHeader("X-FORWARDED-FOR");

        if (ip == null || ip.length() == 0) {
            ip = httpServletRequest.getHeader("Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0) {
            ip = httpServletRequest.getHeader("WL-Proxy-Client-IP");  // 웹로직
        }

        if (ip == null || ip.length() == 0) {
            ip = httpServletRequest.getRemoteAddr();
        }
        
        ip = getXSS((ip));

        return ip;
    }

    /**
     * 하이라키 메뉴 구조 생성
     *
     * @param menuList
     * @return
     * @throws NCmsException
     */
    @SuppressWarnings("all")
    protected List<Map<String, Object>> getMenuHire(List<Map<String, Object>> menuList) throws NCmsException {
        List<Map<String, Object>> mainMenuList = null;
        if (menuList == null || menuList.isEmpty()) {
            return mainMenuList;
        }

        String upperMenuId = null;
        Map<String, Object> mainMenuMap = null;
        List<Map<String, Object>> subMenuList = null;
        mainMenuList = new ArrayList();

        for (Map<String, Object> menuMap : menuList) {
            // 상위 메뉴
            if (menuMap.get("upperMenuId") == null || "".equals(menuMap.get("upperMenuId"))) {
                if (mainMenuMap != null && !mainMenuMap.isEmpty()) {
                    mainMenuMap.put("subMenuList", subMenuList);
                    mainMenuMap.put("spriteCssClass", "rootfolder");
                    mainMenuList.add(mainMenuMap);
                    subMenuList = null;
                }

                mainMenuMap = new HashMap<String, Object>(menuMap);
                upperMenuId = (String) menuMap.get("menuId");
            } else {
                if (subMenuList == null) {
                    subMenuList = new ArrayList<Map<String, Object>>();
                }

                if (upperMenuId.equals(menuMap.get("upperMenuId"))) {
                    menuMap.put("spriteCssClass", "folder");
                    subMenuList.add(menuMap);
                }
            }
        }

        if (mainMenuMap != null && !mainMenuMap.isEmpty()) {
            mainMenuMap.put("subMenuList", subMenuList);
            mainMenuMap.put("spriteCssClass", "rootfolder");
            mainMenuList.add(mainMenuMap);
        }

        return mainMenuList;
    }
}
