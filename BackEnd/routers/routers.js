const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authControllers");
const prescriptionController = require("../controllers/prescriptionController");
const userController = require("../controllers/users");

// ------------------ Admin Rotes -------------//
router.post("/admin/login",authController.admin_login_post);
router.post("/admin/signup",authController.admin_signup_post);
router.get("/admin/display",userController.admin_details);

// ----------------- staff Routes -------------//
router.post("/staff/login",authController.staff_login_post);
router.post("/staff/signup",authController.staff_signup_post);
router.get("/staff/display",userController.staff_display);

// ----------- authentication routes ( token is valid or not ) -------- //
router.get("/staff/authentication/:token",authController.staff_authentication);
router.get("/admin/authentication/:token",authController.admin_authentication);

// ----------------- Prescriptions routes ----------//
router.post("/prescription",prescriptionController.add_prescription);
router.get("/prescription/:id",prescriptionController.get_prescription_by_id);
router.get("/prescription",prescriptionController.get_prescription_main_info);
router.put("/prescription/:id",prescriptionController.update_prescription_by_id);

module.exports = router;
