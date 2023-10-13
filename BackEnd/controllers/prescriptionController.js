const Prescription = require("../Model/Prescriptions/Prescription");

module.exports.add_prescription = async (req, res) => {
    if (req.body) {
        const Prescriptions = req.body;
        try {
            const PrescriptionResult = await Prescription.create(Prescriptions);
            res.status(201).json({ result: PrescriptionResult._id });
        } catch (error) {
            console.log(error);
            res.status(404).json({ errors: error });
        }
    }
    else {
        res.status(400).json({ error: 'Invalid request. Request body is missing.' });
    }
}

module.exports.get_prescription_main_info = async (req,res) => {
    try{
        const response = await Prescription.find({},{"customerInfo.customerName":1,"customerInfo.phoneNo":1,"paitentInfo.paitentName":1,"paitentInfo.paitentPhoneNo":1,"prescriptionInfo.cosmeticOption":1,"prescriptionInfo.doctorName":1,"prescriptionInfo.prescriptionTime":1,"prescriptionInfo.LensType":1}).sort({ $natural: -1 });
        if(response){
            res.status(200).json({response});
        }
        else{
            res.status(404).json({message:"Empty Response"});
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({ errors: error });
    }
}

module.exports.get_prescription_by_id = async (req, res) => {
    try {
        const id = req.params.id;
        if(id){
            const prescriptions = await Prescription.find({_id:id});
            if(prescriptions){
                res.status(200).send(prescriptions);
            }
            else{
                res.status(404).json({message:"Prescription Not Found"});
            }
        }
        else{
            res.status(404).json({message:"Can not get Id"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.update_prescription_by_id = async (req,res) => {
    if(req.body){
        try{
            const id = req.params.id;
            if(id){
                const response = await Prescription.findByIdAndUpdate(id,req.body,{new:true});
                if(response){
                    res.status(200).json({response});
                }
                else{
                    res.status(400).json({message:"Something went wrong"});
                }
            }
            else{
                res.status(400).json({message:"Id does not found"});
            }
        }
        catch(error){
            res.status(500).json({message:"Something went wrong"});
            console.log(error);
        }
    }
}