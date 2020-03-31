const {Appointment, Slot} = Model;
const Nexmo = require ('nexmo');

const appointmentController = {
    all(req, res) {
        Appointment.find({}).exec((err, appointments)=> res.json(appointments));
    },
    create(req, res) {
        var requestBody = req.body;

        var newSlot = new Slot({
            slotTime: requestBody.slotTime,
            slotDate: requestBody.slotDate,
            createdAt: Date.now()
        });
        newSlot.save();

        var newAppointment = new Appointment({
            name: requestBody.name,
            email: requestBody.email,
            phone: requestBody.phone,
            slots: newSlot._id
        });

        const nexmo = new Nexmo({
            apiKey: "af85bb1b",
            apiSecret: "12kpjLr30fYCdHQ93DG"
        });

        let msg = 
            requestBody.name + " " + "this message is to confirm your appointment at" + " " + requestBody.appointment;
        
        newappointment.save((err, saved)=>{
            Appointment.find({_id: saved._id})
                .populate("slots")
                .exec((err, appointment)=>res.json(appointment));

        const from = VIRTUAL_NUMBER;
        const to = RECIPIENT_NUMBER;

        nexmo.message.sendSms(from, to, msg, (err, responseData)=>{
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        });
        });
    }
};