/**
 * Created by jiggy on 4/28/2016.
 */

export class Configuration {

     //@if ENV='DEV'
     public static ENVIRONMENT: string = "Development";
     //@endif

     /* @if ENV='QA' **
      public static ENVIRONMENT: string = "Qa";
      /* @endif */

     /* @if ENV='STG' **
      public static ENVIRONMENT: string = "Staging";
      /* @endif */

     /* @if ENV='PRD' **
      public static ENVIRONMENT: string = "Production";
      /* @endif */

}
