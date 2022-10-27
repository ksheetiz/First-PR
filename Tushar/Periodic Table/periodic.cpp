#include<windows.h>
#include<mmsystem.h>
#include<stdio.h>
#include<dos.h>
#include<time.h>
#include<graphics.h>
#include<string>
#include<conio.h>
#include<iostream>
using namespace std;

int main()
{
    int n,m,i,a=1;
    initwindow(1528,850,"");
    do
    {
        readimagefile("Whole Table.jpg",0,0,1528,850);
        cout<<"Enter 1 for list of Metals"<<endl;
        cout<<"Enter 2 for detail list of Metals"<<endl;
        cin>>n;
        PlaySound(TEXT("mixkit-select-click-1109.wav"),NULL,SND_ASYNC);
        if(n==2)
        {
           do
            {

                cout<<"Enter 1 for Alkali Metals"<<endl;
                cout<<"Enter 2 for Alkaline Earth Metals"<<endl;
                cout<<"Enter 3 for Lanthanoids"<<endl;
                cout<<"Enter 4 for Aktinoids"<<endl;
                cout<<"Enter 5 for Transition Metals"<<endl;
                cout<<"Enter 6 for Post Transition Metals"<<endl;
                cout<<"Enter 7 for Metalloids"<<endl;
                cout<<"Enter 8 for Other Nonmetals"<<endl;
                cout<<"Enter 9 for Noble Gasses"<<endl;
                cout<<"Enter 0 TO GO BACK"<<endl;
                cin>>m;
                PlaySound(TEXT("mixkit-quick-win-video-game-notification-269.wav"),NULL,SND_ASYNC);
                if(m==0)
                {
                    a==-1;
                    break;
                }
                //cout<<"Enter 0 TO GO BACK:-   "<<;
                else if(m==1)
                {
                    readimagefile("1.jpg",0,0,1528,850);
                    //cin>>i;
                }
                else if(m==2)
                {
                    readimagefile("2.jpg",0,0,1528,850);

                }
                else if(m==3)
                {
                    readimagefile("3.jpg",0,0,1528,850);

                }
                else if(m==4)
                {
                    readimagefile("4.jpg",0,0,1528,850);

                }
                else if(m==5)
                {
                    readimagefile("5.jpg",0,0,1528,850);

                }
                else if(m==6)
                {
                    readimagefile("6.jpg",0,0,1528,850);

                }
                else if(m==7)
                {
                    readimagefile("7.jpg",0,0,1528,850);

                }
                else if(m==8)
                {
                    readimagefile("8.jpg",0,0,1528,850);

                }
                else if(m==9)
                {
                    readimagefile("9.jpg",0,0,1528,850);

                }
            }while(a);
        }
        if(n==1)
        {
            do
            {

                cout<<"Enter 1 for Alkali Metals"<<endl;
                cout<<"Enter 2 for Alkaline Earth Metals"<<endl;
                cout<<"Enter 3 for Lanthanoids"<<endl;
                cout<<"Enter 4 for Aktinoids"<<endl;
                cout<<"Enter 5 for Transition Metals"<<endl;
                cout<<"Enter 6 for Post Transition Metals"<<endl;
                cout<<"Enter 7 for Metalloids"<<endl;
                cout<<"Enter 8 for Other Nonmetals"<<endl;
                cout<<"Enter 9 for Noble Gasses"<<endl;
                cout<<"Enter 10 for Unknown"<<endl;
                cout<<"Enter 0 TO GO BACK"<<endl;
                cin>>m;
                PlaySound(TEXT("mixkit-quick-win-video-game-notification-269.wav"),NULL,SND_ASYNC);
                if(m==0)
                {
                    a==-1;
                    break;
                }
                //cout<<"Enter 0 TO GO BACK:-   "<<;
                else if(m==1)
                {
                    readimagefile("Alkali.jpg",0,0,1528,850);
                    //cin>>i;
                }
                else if(m==2)
                {
                    readimagefile("Alkaline Earth.jpg",0,0,1528,850);

                }
                else if(m==3)
                {
                    readimagefile("Lanthanoid.jpg",0,0,1528,850);

                }
                else if(m==4)
                {
                    readimagefile("Aktinoids.jpg",0,0,1528,850);

                }
                else if(m==5)
                {
                    readimagefile("Transition Metals.jpg",0,0,1528,850);

                }
                else if(m==6)
                {
                    readimagefile("Post Transition Metals.jpg",0,0,1528,850);

                }
                else if(m==7)
                {
                    readimagefile("Metalloids.jpg",0,0,1528,850);

                }
                else if(m==8)
                {
                    readimagefile("Other Nonmetals.jpg",0,0,1528,850);

                }
                else if(m==9)
                {
                    readimagefile("Noble Gasses.jpg",0,0,1528,850);

                }
                else if(m==10)
                {
                    readimagefile("Unknown.jpg",0,0,1528,850);

                }
            }while(a);

        }
    }while(1);

    getch();
}
