package ir.mjimani.basespringboot.tools;

import java.util.Random;

public class GenerateRandomChars {

    public static String generate(String candidateChars, int length) {
        StringBuilder sb;
        Random random;
        String result;
        sb = new StringBuilder();
        random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(candidateChars.charAt(random.nextInt(candidateChars.length())));
        }
        result = sb.toString();
        return result;
    }

    public static Integer generateRandomDigits(int length) {
        int m = (int) Math.pow(10, length - 1);
        return m + new Random().nextInt(9 * m);
    }
}
