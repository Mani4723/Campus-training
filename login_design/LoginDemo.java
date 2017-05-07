public class LoginDemo {
	
   //use getLogin method to get object of type Login 
   public Login getLogin(String social_network_name){
      if(social_network_name == null){
         return null;
      }		
      if(social_network_name == "Facbook"){
         return new Facebook();
         
      } else if(social_network_name == "Twitter"){
         return new Twitter();
         
      } else if(social_network_name == "Google"){
         return new Google();
      } else if(social_network_name == "Linkedin") {
         return new Linkedin();
	  }
      return null;
   }
}