import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;


public class maxpath {

public static void main(String[ ] args)
                                          {
                                              String s= "triangle.txt";    // file containing numbers in saved in text file named triangle.

                                              int Triangle[ ][ ] = FileRead(s);
                                             //System.out.println(Triangle.length);   just checking
                                              int lines = Triangle.length;

                                            /* starting from bottom but one line */
                                            for (int i = lines - 2; i >= 0; i--)
                                                {
                                                  for (int j = 0; j <= i; j++)
                                                        {
                                                        Triangle[i][j] += Math.max(Triangle[i+1][j],Triangle[i+1][j+1]);
                                                        /* Finds the maximum of two numbers below it and adds to that number. This goes up until
                                                        we reach first row. And in the first row we will end up with maximum in first element of first
                                                        row of matrix*/
                                                }
                                            }

        System.out.println(Triangle[0][0]);

 }


 // Reading a text file and keeping the numbers in matrix form.  Here it is 100 X 100.
// While reading the triangle in the form of matrix, missing values in each row is filled with zero.
public static int[ ][ ] FileRead( String Filepath)

                                 {   int Triangle[][] = {{0},{0}};

                                     FileReader fr = new FileReader(Filepath);
                                     FileReader fr2 = new FileReader(Filepath);
                                     BufferedReader br = new BufferedReader(fr);
                                     BufferedReader br2 = new BufferedReader(fr2);

                                    String S ;
                                    String Sline[ ];
                                    int lines =0;

                                   while (( S=br.readLine( )) != null )
                                             {

                                                 lines++;

                                   }

                                 Triangle = new int[lines][lines];
                                 Sline = new String[lines];

                                 int j= 0;

                                while (( S=br2.readLine( )) != null )
                                          {

                                              Sline = S.split(" ");
                                           for(int i = 0; i< Sline.length; i++)
                                                 {
                                                   Triangle[j][i] = Integer.parseInt(Sline[i]);
                                           }
                                 j++;

                              }
 return Triangle;
 }

}




