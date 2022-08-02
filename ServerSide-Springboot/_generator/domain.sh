link=src/main/java/ir/mjimani/basespringboot/domain/
TodayDate=date '+%Y-%m-%d %H:%M:%S'
if [ $1 ]; then
  echo "$1"
  cd ..
  mkdir $link$1
  link= $link$1

  echo "package ir.mjimani.basespringboot.domain.$1;" >$link/$1.java
  echo "" >>$link/$1.java
  echo "/**" >>$link$1/$1.java
  echo "* @author Parvin at $TodayDate" >>$link/$1.java
  echo "* email: " >>$link/$1.java
  echo "* " >>$link/$1.java
  echo "*/" >>$link/$1.java
  echo "@Setter" >>$link/$1.java
  echo "@Getter" >>$link/$1.java
  echo "@AllArgsConstructor" >>$link/$1.java
  echo "@NoArgsConstructor" >>$link/$1.java
  echo "public class $1 extends GeneralDomain {" >>$link/$1.java
  echo "" >>$link/$1.java
  echo "    @Transient" >>$link/$1.java
  echo "    public final static String END_POINT = "questions";" >>$link/$1.java

fi
