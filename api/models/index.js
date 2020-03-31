const {Schema} = mongoose;
model = mongoose.model.bind(mongoose);
ObjectId = mongoose.Schema.Types.ObjectId;

const slotSchema = new Schema ({
    slotTime: String,
    slotDate: String,
    createdAt: Date
});

const Slot = model('Slot', slotSchema);

const appointmentSchema = new Schema ({
    id: ObjectId,
    name: String,
    email: String,
    phone: Number,
    slots: {
        type: ObjectId,
        ref: 'Slot'
    },
    createdAt: Date
});

const Appointment = model ('Appointment', appointmentSchema);