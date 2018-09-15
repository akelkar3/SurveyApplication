package inclass1.group3.group3_inclass01;

import android.content.Intent;
import android.media.Image;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;
import java.util.jar.Attributes;

public class WelcomeActivity extends AppCompatActivity {
    public String token,userID;
    TextView question;
    int QuestionIndex=0,AnswerIndex;
    String[] Questions = new String[10] ;
    int[] answers= new int[10];

    public static  apiCalls caller;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        caller.activity=WelcomeActivity.this;

        caller=new apiCalls();
        token =getIntent().getExtras().getString(MainActivity.KEY_TOKEN);
      //  userID =getIntent().getExtras().get(MainActivity.KEY_USERID).toString();
addQuestions();
        question = findViewById(R.id.questionText);
        Button finish= findViewById(R.id.btnSubmitResponse);

        finish.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                caller.saveResponse(answers,totalScore());
            }
        });

        //usign the token get the question data from server make an ajax call.

         final ImageButton next=   findViewById(R.id.btnNext);
         next.setOnClickListener(new View.OnClickListener() {
             @Override
             public void onClick(View view) {
                 validateAnswer();

                 TranslateAnimation animObj= new TranslateAnimation(0,question.getWidth(), 0, 0);
                 animObj.setDuration(1000);
                 question.startAnimation(animObj);
                 animObj.setAnimationListener(new Animation.AnimationListener(){
                     @Override
                     public void onAnimationStart(Animation arg0) {
                         next.setVisibility(View.INVISIBLE);
                     }
                     @Override
                     public void onAnimationRepeat(Animation arg0) {
                     }
                     @Override
                     public void onAnimationEnd(Animation arg0) {
                         String questionText="some Random text";
                         questionText=Questions[QuestionIndex];
                         question.setText(questionText);
                         QuestionIndex++;

                     }
                 });


             }


         });
    }

    private void addQuestions(){
      Questions[0]="How often do you have a drink containing alcohol?";
        Questions[1]="How many drinks containing alcohol do you have\n" +
                "on a typical day when you are drinking?";
        Questions[2]=" How often do you have six or more drinks on one\n" +
                "occasion?";
        Questions[3]=" How often during the last year have you found\n" +
                "that you were not able to stop drinking once you\n" +
                "had started?";
        Questions[4]="How often during the last year have you failed to\n" +
                "do what was normally expected from you\n" +
                "because of drinking?";
        Questions[5]="How often during the last year have you needed\n" +
                "a first drink in the morning to get yourself going\n" +
                "after a heavy drinking session?";
        Questions[6]=" How often during the last year have you had a\n" +
                "feeling of guilt or remorse after drinking?";
        Questions[7]=" How often during the last year have you been\n" +
                "unable to remember what happened the night\n" +
                "before because you had been drinking?";
        Questions[8]="Have you or someone else been injured as a\n" +
                "result of your drinking?";
        Questions[9]=" Has a relative or friend or a doctor or another\n" +
                "health worker been concerned about your drinking\n" +
                "or suggested you cut down?";
        question = findViewById(R.id.questionText);
        question.setText(Questions[QuestionIndex]);

    }
private int totalScore(){
        int ret=0;
        for ( int i = 0 ; i <10;i++){
            if (  answers[i]!=100  )
            ret=ret+answers[i];
        }
        return   ret ;
}
    private void validateAnswer() {
        int temp =QuestionIndex;
        switch ( temp){
            case 0:
                if ( AnswerIndex ==0){
                    QuestionIndex=8;
                    answers[1]=100;
                    answers[2]=100;
                    answers[3]=100;answers[4]=100;answers[5]=100;answers[6]=100;answers[7]=100;
                }
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                if (  answers[1]+answers[2]==0) {
                    QuestionIndex = 8;
                    answers[4]=100;answers[5]=100;answers[6]=100;answers[7]=100;
                }
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
        }
    }

    public void onRadioButtonClicked(View view) {
        // Is the button now checked?
        boolean checked = ((RadioButton) view).isChecked();
        ImageButton next = findViewById(R.id.btnNext);
        Button finsish = findViewById(R.id.btnSubmitResponse);
        if (QuestionIndex!=10) {
            next.setVisibility(View.VISIBLE);


        // Check which radio button was clicked
        switch(view.getId()) {
            case R.id.id_0:
                if (checked)
                    // Pirates are the best
                    answers[QuestionIndex]=0;
                    break;
            case R.id.id_1:
                if (checked)
                    // Ninjas rule
                    answers[QuestionIndex]=1;
                    break;
            case R.id.id_2:
                if (checked)
                    // Ninjas rule
                    answers[QuestionIndex]=2;
                    break;
            case R.id.id_3:
                if (checked)
                    // Ninjas rule
                    answers[QuestionIndex]=3;
                    break;
            case R.id.id_4:
                if (checked)
                    // Ninjas rule
                    answers[QuestionIndex]=4;
                    break;
        }
        }
        else{
            finsish.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_bar, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.logout_menu_item:
                Toast.makeText(getApplicationContext(),"You pressed logout",Toast.LENGTH_SHORT).show();
                MainActivity.caller.deleteToken();
                Intent registerIntent = new Intent(this,MainActivity.class);
                startActivity(registerIntent);
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
