public class MagicNumberGuessGameController {
    @AuraEnabled
    public static void initGame() {
        // This method can be used to initialize any game settings if needed.
    }

    @AuraEnabled
    public static Integer setGoalNumber() {
        Integer goalNumber = (Integer) Math.floor(Math.random() * 100) + 1;
        return goalNumber;
    }
}
