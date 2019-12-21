package app;

import java.util.Objects;
import java.util.Random;

public class Wallet {

    private final int identificator;
    private float balance ;
    //I'd prefer store here because i'll get more complex hash number
    private String name;
    private String lastName;
    private int hash;

    public Wallet (String name, String lastName, int id) {
        this.identificator = id;
        this.name = name;
        this.lastName = lastName;
        this.balance = 0.0f;
        this.hash = hashCode();
    }

    @Override
    public int hashCode() {

        Random rand = new Random();
        /*hash = 1;
        hash = hash * identificator;
        hash = hash * rand.nextInt();
        return hash;*/
        return Objects.hash(identificator,name, lastName, rand.nextInt());
    }

    public long getIdentificator() {
        return identificator;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float bal){
        this.balance = bal;
    }

    public int getHash() {
        return hash;
    }

    @Override
    public String toString(){
        return "Wallet{" +
                "id=" + identificator +
                ", hash='" + hash + '\'' +
                ", balance='" + balance + '\'' +
                '}';
    }
}