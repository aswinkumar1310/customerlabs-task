const router = require("express").Router();
const { validate } = require("../../middleware/validation");
const { createAccount, getAccounts, updateAccount, createDestination, getDestinations, updateDestination, deleteDestintion, deleteAccount } = require("./account.controller");
const appSchema = require("./account.validation");

//accounts route
router.post("/createAccount", validate(appSchema.accountCreation), createAccount);
router.get("/getAccount", validate(appSchema.getAccounts), getAccounts);
router.put("/editAccount/:id", validate(appSchema.editAccount), updateAccount);
router.delete("/deleteAccount/:id", validate(appSchema.deleteSchema), deleteAccount);

//destinations route
router.post("/createDestination", validate(appSchema.destinationCreation), createDestination);
router.get("/getDestinations", validate(appSchema.getAccounts), getDestinations);
router.put("/editDestination/:id", validate(appSchema.destinationEdit), updateDestination);
router.delete("/deleteDestination/:id", validate(appSchema.deleteSchema), deleteDestintion);
module.exports = router;