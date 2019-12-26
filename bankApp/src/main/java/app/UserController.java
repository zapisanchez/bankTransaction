package app;

import java.util.concurrent.atomic.AtomicLong;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicReference;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    //private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private final ArrayList <User> userList = new ArrayList <User>();

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    private void fillDummyUsers () {

        User rick = new User(counter.incrementAndGet(), "Rick", "Sanchez");
        User morty = new User(counter.incrementAndGet(), "Bird", "Person");
        User abra = new User(counter.incrementAndGet(), "Abradolf", "Lincler");
        User pen = new User(counter.incrementAndGet(), "Pencil", "Vester" );
        User poopy = new User(counter.incrementAndGet(), "Poopy", "Butthole" );

        abra.getWalletList().get(0).setBalance(50.0f);
        poopy.getWalletList().get(0).setBalance(288.0f);

        rick.addWallet(2);
        rick.getWalletList().get(0).setBalance(2000.3f);

        pen.addWallet(3);
        pen.getWalletList().get(0).setBalance(20.3f);
        pen.getWalletList().get(1).setBalance(288.0f);
        pen.getWalletList().get(2).setBalance(1000.0f);

        userList.add(rick);
        userList.add(morty);
        userList.add(abra);
        userList.add(pen);
        userList.add(poopy);

        logger.info ("Users initializated succesfully");
    }

    private static UserController theInstance = null;

    private UserController() {
        fillDummyUsers();
    }

    public static UserController getInstance (){
        if (theInstance == null) {
            theInstance = new UserController();
        }
        return theInstance;
    }

    //To get full user list
    @RequestMapping("/users")
    public ArrayList <User> users() {

        //fillDummyUsers();
        logger.info("Users size: " + userList.size());

        if (userList.isEmpty())
        {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "We don't have any Users!");
        }

        return userList;
    }



    //to get a concrete user
    @RequestMapping("/user")
    public User user(@RequestParam(value="name", defaultValue="") String name) {

        User result = null;
        for (User theUser : userList) {
            if (name.equals(theUser.getName())) {
                result = theUser;
                break;
            }

        }
        if (result == null)
        {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User "+ name + " not exist");
        }

        logger.error("Getting user name: " + result.getName());
        return result;

        //return new User(counter.incrementAndGet(), name);

    }

    private Wallet getWalletByHash(int hash){


        for (User user : userList) {
            ArrayList<Wallet> walList = user.getWalletList();
            for (Wallet wallet : walList){
                if (wallet.getHash() == hash)
                {
                    return wallet;
                }
            }
        }
        return null;

        /*Wallet resultW = null;
            userList.forEach((p)->{
            //for each wallet
            ArrayList<Wallet> walList = p.getWalletList();
            logger.error("value: " + p.getName());


            //Error with lambda expressions... anonym functions you know
            walList.forEach((wallet) -> {
                logger.error("hash: " + wallet.getHash());
                if (wallet.getHash() == hash)
                {
                    logger.error("ENTRA");
                    resultW = wallet;
                }
            });
        });

        return resultW;*/
    }

     //to move money between wallets
    @RequestMapping(value = "/move", method=RequestMethod.POST)
    public String transaction (@RequestParam(value="from", defaultValue="") int from,
                               @RequestParam(value="to", defaultValue="") int to,
                               @RequestParam(value="amount", defaultValue="")float amount) {

        Wallet fromWallet = getWalletByHash(from);
        Wallet toWallet = getWalletByHash(to);


        // both wallet must exist and from must have enough money
        if ((fromWallet != null)
                && (toWallet != null)
                && (fromWallet.getBalance() > 0.0f)
                && (fromWallet.getBalance() >= amount))
        {
            //I Love references :P
            fromWallet.setBalance(fromWallet.getBalance() - amount);
            toWallet.setBalance(toWallet.getBalance() + amount);
        }
        else
        {
            logger.error("Not a valid transaction.");
            logger.error("FROM: " + from + " TO: " + to + " AMOUNT: " + amount);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This is not a valid transaction");
        }

        logger.error("FROM: " + from + " TO: " + to + " AMOUNT: " + amount);

        return ("zapi");
    }

    //Lets add a new User from UI
    @RequestMapping(value = "/new", method=RequestMethod.POST)
    public String newUser (@RequestParam(value="name", defaultValue="") String name,
                               @RequestParam(value="lastName", defaultValue="") String lastName,
                               @RequestParam(value="amount", defaultValue="")float amount) {


        User newUser = new User(counter.incrementAndGet(), name, lastName );
        newUser.getWalletList().get(0).setBalance(amount);

        userList.add(new User(counter.incrementAndGet(), name, lastName ));

        return "Added new User";
    }

    //Deleting user
    @RequestMapping(value = "/del", method=RequestMethod.POST)
    public String delUser (@RequestParam(value="id", defaultValue="") long id,
                           @RequestParam(value="name", defaultValue="") String name,
                           @RequestParam(value="lastName", defaultValue="") String lastName) {

        for (User user : userList) {
            if (user.getId() == id
                && user.getName() == name
                && user.getLastName() == lastName){
                userList.remove(user);
                break;
            }
        }


        return "Deleted User";
    }
}
