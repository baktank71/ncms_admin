package ts.ncms.ad.cmmn.sys.exception;

public class NCmsException extends Exception{

  public NCmsException() {
  }

  public NCmsException(String message) {
    super(message);
  }

  public NCmsException(Exception e) {
    super(e);
  }

}
