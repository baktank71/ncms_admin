package ts.ncms.ad.common;

import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;


@Component
public class NcmsProperties {

    public static Properties config;
    
    @Resource(name="ncms")
    public void setConfig(Properties _config){
    	config = _config;
    }

    public static String getString(String key) {
        return config.getProperty(getSysMode("prj.mode") + "." + key).trim();
    }

    public static int getInt(String key) {
        return Integer.parseInt(config.getProperty(getSysMode("prj.mode") + "." + key).trim());
    }
    
    public static String getSysMode(String key) {
        return config.getProperty(key).trim();
    }    
    
    public static String getFullString(String key) {
    	return config.getProperty(key).trim();
    }
    
}
