import java.util.Scanner;

public class FactoryPatternLoginDemo {

   public static void main(String[] args) {
      LoginDemo loginDemo = new LoginDemo();
	  
	   Scanner scan = new Scanner(System.in);
       String s = scan.next();

      //get an object from login interface and call its login method.
      Login login1 = loginDemo.getLogin(s);

      //call login method on input
      login1.login();

     
   }
}